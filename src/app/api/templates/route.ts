import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const orgId = searchParams.get("organizationId");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (category) where.assetCategory = category;
  if (orgId) where.organizationId = orgId;

  const templates = await prisma.template.findMany({
    where,
    include: {
      _count: { select: { inspections: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(templates);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const template = await prisma.template.create({
    data: {
      name: body.name,
      description: body.description,
      organizationId: body.organizationId,
      assetCategory: body.assetCategory,
      sections: body.sections || [],
      scoringEnabled: body.scoringEnabled || false,
      maxScore: body.maxScore,
      status: "DRAFT",
    },
  });

  return NextResponse.json(template, { status: 201 });
}
