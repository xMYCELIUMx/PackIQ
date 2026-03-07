import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orgId = searchParams.get("organizationId");

  const where: Record<string, unknown> = {};
  if (orgId) where.organizationId = orgId;

  const vendors = await prisma.vendor.findMany({
    where,
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
  const body = await request.json();

  const vendor = await prisma.vendor.create({
    data: {
      name: body.name,
      code: body.code,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      organizationId: body.organizationId,
    },
  });

  return NextResponse.json(vendor, { status: 201 });
}
