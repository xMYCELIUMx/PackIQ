import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorize, requireInternalAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (auth.response) return auth.response;

  const access = authorize(auth.context, "readTemplates");
  if (!access.ok) return access.response;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const where: Record<string, unknown> = {
    organizationId: auth.context.organizationId,
  };
  if (status) where.status = status;
  if (category) where.assetCategory = category;

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
  const auth = await requireInternalAuth(request);
  if (auth.response) return auth.response;

  const access = authorize(auth.context, "writeTemplates");
  if (!access.ok) return access.response;

  const body = await request.json();

  const template = await prisma.template.create({
    data: {
      name: body.name,
      description: body.description,
      organizationId: auth.context.organizationId,
      assetCategory: body.assetCategory,
      sections: body.sections || [],
      scoringEnabled: body.scoringEnabled || false,
      maxScore: body.maxScore,
      status: "DRAFT",
    },
  });

  return NextResponse.json(template, { status: 201 });
}
