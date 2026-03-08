import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorize, requireInternalAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (auth.response) return auth.response;

  const access = authorize(auth.context, "readVendors");
  if (!access.ok) return access.response;

  const vendors = await prisma.vendor.findMany({
    where: { organizationId: auth.context.organizationId },
    include: {
      _count: { select: { assets: true, cars: true } },
      scores: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(vendors);
}

export async function POST(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (auth.response) return auth.response;

  const access = authorize(auth.context, "writeVendors");
  if (!access.ok) return access.response;

  const body = await request.json();

  const vendor = await prisma.vendor.create({
    data: {
      name: body.name,
      code: body.code,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      organizationId: auth.context.organizationId,
    },
  });

  return NextResponse.json(vendor, { status: 201 });
}
