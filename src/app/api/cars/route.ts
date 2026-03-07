import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const vendorId = searchParams.get("vendorId");

  const where: Record<string, unknown> = {};
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
  const body = await request.json();

  // Generate unique vendor portal token
  const vendorToken = randomBytes(32).toString("hex");
  const vendorTokenExp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const car = await prisma.cAR.create({
    data: {
      title: body.title,
      description: body.description,
      issueId: body.issueId,
      vendorId: body.vendorId,
      creatorId: body.creatorId,
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
