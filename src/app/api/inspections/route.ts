import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorize, requireInternalAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (!auth.ok) return auth.response;

  const access = authorize(auth.context, "readInspections");
  if (!access.ok) return access.response;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const siteId = searchParams.get("siteId");
  const inspectorId = searchParams.get("inspectorId");

  const where: Record<string, unknown> = {
    site: { organizationId: auth.context.organizationId },
  };
  if (status) where.status = status;
  if (siteId) where.siteId = siteId;
  if (inspectorId) where.inspectorId = inspectorId;

  const inspections = await prisma.inspection.findMany({
    where,
    include: {
      template: { select: { name: true } },
      inspector: { select: { name: true } },
      site: { select: { name: true, code: true } },
      asset: { select: { name: true, assetTag: true } },
      _count: { select: { findings: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(inspections);
}

export async function POST(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (!auth.ok) return auth.response;

  const access = authorize(auth.context, "writeInspections");
  if (!access.ok) return access.response;

  const body = await request.json();

  const inspection = await prisma.inspection.create({
    data: {
      title: body.title,
      templateId: body.templateId,
      templateVersion: body.templateVersion,
      inspectorId: auth.context.userId,
      siteId: body.siteId,
      productionLineId: body.productionLineId,
      assetId: body.assetId,
      responses: body.responses || {},
      status: "DRAFT",
    },
  });

  return NextResponse.json(inspection, { status: 201 });
}
