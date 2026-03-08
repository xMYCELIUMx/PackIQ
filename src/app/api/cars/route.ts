import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { authorize, requireInternalAuth, requireVendorTokenAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const hasVendorToken = Boolean(
    request.headers.get("x-vendor-token") || request.nextUrl.searchParams.get("vendorToken")
  );

  if (hasVendorToken) {
    const vendorAuth = await requireVendorTokenAuth(request);
    if (vendorAuth.response) return vendorAuth.response;

    const vendorCar = await prisma.cAR.findFirst({
      where: { id: vendorAuth.context.carId },
      select: {
        id: true,
        number: true,
        title: true,
        description: true,
        status: true,
        why1: true,
        why2: true,
        why3: true,
        why4: true,
        why5: true,
        rootCause: true,
        correctiveAction: true,
        preventiveAction: true,
        targetDate: true,
        vendorRespondedAt: true,
      },
    });

    return NextResponse.json(vendorCar);
  }

  const auth = await requireInternalAuth(request);
  if (auth.response) return auth.response;

  const access = authorize(auth.context, "readCars");
  if (!access.ok) return access.response;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const vendorId = searchParams.get("vendorId");

  const where: Record<string, unknown> = {
    vendor: { organizationId: auth.context.organizationId },
  };
  if (status) where.status = status;
  if (vendorId) where.vendorId = vendorId;

  const cars = await prisma.cAR.findMany({
    where,
    include: {
      issue: { select: { id: true, number: true, title: true, severity: true } },
      vendor: { select: { name: true, code: true } },
      creator: { select: { name: true } },
      assignee: { select: { name: true } },
      _count: { select: { actions: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(cars);
}

export async function POST(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (auth.response) return auth.response;

  const access = authorize(auth.context, "writeCars");
  if (!access.ok) return access.response;

  const body = await request.json();

  const vendorToken = randomBytes(32).toString("hex");
  const vendorTokenExp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const car = await prisma.cAR.create({
    data: {
      title: body.title,
      description: body.description,
      issueId: body.issueId,
      vendorId: body.vendorId,
      creatorId: auth.context.userId,
      assigneeId: body.assigneeId,
      targetDate: body.targetDate ? new Date(body.targetDate) : null,
      vendorToken,
      vendorTokenExp,
      status: "DRAFT",
    },
  });

  return NextResponse.json(
    {
      ...car,
      vendorPortalUrl: `/vendor/car/${vendorToken}`,
    },
    { status: 201 }
  );
}
