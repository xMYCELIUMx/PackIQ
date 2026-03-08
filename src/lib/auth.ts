import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { ROLE_PERMISSIONS } from "@/lib/constants";

type Role = keyof typeof ROLE_PERMISSIONS;

type InternalAuthContext = {
  kind: "internal";
  userId: string;
  role: Role;
  organizationId: string;
};

type VendorAuthContext = {
  kind: "vendor";
  vendorToken: string;
  carId: string;
  vendorId: string | null;
};

export type AuthContext = InternalAuthContext | VendorAuthContext;

type Permission =
  | "readInspections"
  | "writeInspections"
  | "readIssues"
  | "writeIssues"
  | "readCars"
  | "writeCars"
  | "readActions"
  | "writeActions"
  | "readTemplates"
  | "writeTemplates"
  | "readAnalytics"
  | "writeAnalytics"
  | "readVendors"
  | "writeVendors";

type AuthSuccess<TContext> = {
  ok: true;
  context: TContext;
};

type AuthFailure = {
  ok: false;
  response: NextResponse<{ error: string }>;
};

type AuthorizationSuccess = {
  ok: true;
};

type AuthorizationFailure = {
  ok: false;
  response: NextResponse<{ error: string }>;
};

const ROLE_POLICY: Record<Role, Record<Permission, boolean>> = {
  FIELD_TECH: {
    readInspections: true,
    writeInspections: ROLE_PERMISSIONS.FIELD_TECH.canCreateInspection,
    readIssues: true,
    writeIssues: ROLE_PERMISSIONS.FIELD_TECH.canCreateIssue,
    readCars: true,
    writeCars: ROLE_PERMISSIONS.FIELD_TECH.canCreateCAR,
    readActions: true,
    writeActions: ROLE_PERMISSIONS.FIELD_TECH.canCreateAction,
    readTemplates: true,
    writeTemplates: ROLE_PERMISSIONS.FIELD_TECH.canManageTemplates,
    readAnalytics: ROLE_PERMISSIONS.FIELD_TECH.canViewAnalytics,
    writeAnalytics: false,
    readVendors: true,
    writeVendors: false,
  },
  ENGINEER: {
    readInspections: true,
    writeInspections: ROLE_PERMISSIONS.ENGINEER.canCreateInspection,
    readIssues: true,
    writeIssues: ROLE_PERMISSIONS.ENGINEER.canCreateIssue,
    readCars: true,
    writeCars: ROLE_PERMISSIONS.ENGINEER.canCreateCAR,
    readActions: true,
    writeActions: ROLE_PERMISSIONS.ENGINEER.canCreateAction,
    readTemplates: true,
    writeTemplates: ROLE_PERMISSIONS.ENGINEER.canManageTemplates,
    readAnalytics: ROLE_PERMISSIONS.ENGINEER.canViewAnalytics,
    writeAnalytics: true,
    readVendors: true,
    writeVendors: true,
  },
  QUALITY_MANAGER: {
    readInspections: true,
    writeInspections: ROLE_PERMISSIONS.QUALITY_MANAGER.canCreateInspection,
    readIssues: true,
    writeIssues: ROLE_PERMISSIONS.QUALITY_MANAGER.canCreateIssue,
    readCars: true,
    writeCars: ROLE_PERMISSIONS.QUALITY_MANAGER.canCreateCAR,
    readActions: true,
    writeActions: ROLE_PERMISSIONS.QUALITY_MANAGER.canCreateAction,
    readTemplates: true,
    writeTemplates: ROLE_PERMISSIONS.QUALITY_MANAGER.canManageTemplates,
    readAnalytics: ROLE_PERMISSIONS.QUALITY_MANAGER.canViewAnalytics,
    writeAnalytics: true,
    readVendors: true,
    writeVendors: true,
  },
  PRODUCTION_SUPERVISOR: {
    readInspections: true,
    writeInspections: ROLE_PERMISSIONS.PRODUCTION_SUPERVISOR.canCreateInspection,
    readIssues: true,
    writeIssues: ROLE_PERMISSIONS.PRODUCTION_SUPERVISOR.canCreateIssue,
    readCars: true,
    writeCars: ROLE_PERMISSIONS.PRODUCTION_SUPERVISOR.canCreateCAR,
    readActions: true,
    writeActions: ROLE_PERMISSIONS.PRODUCTION_SUPERVISOR.canCreateAction,
    readTemplates: true,
    writeTemplates: ROLE_PERMISSIONS.PRODUCTION_SUPERVISOR.canManageTemplates,
    readAnalytics: ROLE_PERMISSIONS.PRODUCTION_SUPERVISOR.canViewAnalytics,
    writeAnalytics: false,
    readVendors: true,
    writeVendors: false,
  },
  ADMIN: {
    readInspections: true,
    writeInspections: ROLE_PERMISSIONS.ADMIN.canCreateInspection,
    readIssues: true,
    writeIssues: ROLE_PERMISSIONS.ADMIN.canCreateIssue,
    readCars: true,
    writeCars: ROLE_PERMISSIONS.ADMIN.canCreateCAR,
    readActions: true,
    writeActions: ROLE_PERMISSIONS.ADMIN.canCreateAction,
    readTemplates: true,
    writeTemplates: ROLE_PERMISSIONS.ADMIN.canManageTemplates,
    readAnalytics: ROLE_PERMISSIONS.ADMIN.canViewAnalytics,
    writeAnalytics: true,
    readVendors: true,
    writeVendors: true,
  },
};

function unauthorized(message = "Authentication required") {
  return NextResponse.json({ error: message }, { status: 401 });
}

function forbidden(permission: Permission) {
  return NextResponse.json({ error: `Missing permission: ${permission}` }, { status: 403 });
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4;
  return Buffer.from(normalized + (pad ? "=".repeat(4 - pad) : ""), "base64").toString("utf-8");
}

function verifyJwt(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) return null;

  const expected = createHmac("sha256", secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest("base64url");

  if (signatureEncoded.length !== expected.length) return null;
  const isValid = timingSafeEqual(Buffer.from(signatureEncoded), Buffer.from(expected));
  if (!isValid) return null;

  const payload = JSON.parse(base64UrlDecode(payloadEncoded));
  if (payload.exp && Date.now() >= payload.exp * 1000) return null;
  return payload;
}

function getBearerToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }
  return request.cookies.get("auth_token")?.value || request.cookies.get("session_token")?.value || null;
}

export async function requireInternalAuth(request: NextRequest) {
  let userId = request.headers.get("x-user-id");

  if (!userId) {
    const token = getBearerToken(request);
    if (token) {
      const payload = verifyJwt(token);
      userId = payload?.sub || payload?.userId || payload?.id;
    }
  }

  if (!userId) {
    return { ok: false, response: unauthorized() } satisfies AuthFailure;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, organizationId: true, isActive: true },
  });

  if (!user || !user.isActive) {
    return { ok: false, response: unauthorized("Invalid user session") } satisfies AuthFailure;
  }

  return {
    ok: true,
    context: {
      kind: "internal" as const,
      userId: user.id,
      role: user.role as Role,
      organizationId: user.organizationId,
    },
  } satisfies AuthSuccess<InternalAuthContext>;
}

export async function requireVendorTokenAuth(request: NextRequest) {
  const tokenFromHeader = request.headers.get("x-vendor-token");
  const tokenFromQuery = request.nextUrl.searchParams.get("vendorToken");
  const vendorToken = tokenFromHeader || tokenFromQuery;

  if (!vendorToken) {
    return { ok: false, response: unauthorized("Vendor token required") } satisfies AuthFailure;
  }

  const car = await prisma.cAR.findFirst({
    where: {
      vendorToken,
      OR: [{ vendorTokenExp: null }, { vendorTokenExp: { gt: new Date() } }],
    },
    select: { id: true, vendorId: true },
  });

  if (!car) {
    return { ok: false, response: unauthorized("Invalid or expired vendor token") } satisfies AuthFailure;
  }

  return {
    ok: true,
    context: {
      kind: "vendor" as const,
      vendorToken,
      carId: car.id,
      vendorId: car.vendorId,
    },
  } satisfies AuthSuccess<VendorAuthContext>;
}

export function authorize(context: InternalAuthContext, permission: Permission) {
  if (!ROLE_POLICY[context.role]?.[permission]) {
    return { ok: false, response: forbidden(permission) } satisfies AuthorizationFailure;
  }

  return { ok: true } satisfies AuthorizationSuccess;
}
