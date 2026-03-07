import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VENDOR_SCORE_WEIGHTS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "overview";

  if (type === "overview") {
    const [inspectionCount, openIssues, activeCARs, overdueActions] =
      await Promise.all([
        prisma.inspection.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }),
        prisma.issue.count({
          where: { status: { in: ["OPEN", "ACKNOWLEDGED", "IN_PROGRESS"] } },
        }),
        prisma.cAR.count({
          where: { status: { notIn: ["CLOSED", "DRAFT"] } },
        }),
        prisma.action.count({ where: { status: "OVERDUE" } }),
      ]);

    return NextResponse.json({
      inspectionsThisWeek: inspectionCount,
      openIssues,
      activeCARs,
      overdueActions,
    });
  }

  if (type === "vendor-scorecard") {
    const vendorId = searchParams.get("vendorId");
    const period = searchParams.get("period");

    const where: Record<string, unknown> = {};
    if (vendorId) where.vendorId = vendorId;
    if (period) where.period = period;

    const scores = await prisma.vendorScore.findMany({
      where,
      include: { vendor: { select: { name: true, code: true } } },
      orderBy: { overallScore: "desc" },
    });

    return NextResponse.json(scores);
  }

  return NextResponse.json({ error: "Unknown analytics type" }, { status: 400 });
}

// Recalculate vendor scores
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { vendorId, period } = body;

  // Calculate weighted overall score
  const overallScore =
    body.qualityScore * VENDOR_SCORE_WEIGHTS.quality +
    body.deliveryScore * VENDOR_SCORE_WEIGHTS.delivery +
    body.responsivenessScore * VENDOR_SCORE_WEIGHTS.responsiveness +
    body.complianceScore * VENDOR_SCORE_WEIGHTS.compliance;

  const score = await prisma.vendorScore.upsert({
    where: { vendorId_period: { vendorId, period } },
    update: {
      qualityScore: body.qualityScore,
      deliveryScore: body.deliveryScore,
      responsivenessScore: body.responsivenessScore,
      complianceScore: body.complianceScore,
      overallScore,
      issueCount: body.issueCount,
      carCount: body.carCount,
      avgResolutionDays: body.avgResolutionDays,
    },
    create: {
      vendorId,
      period,
      qualityScore: body.qualityScore,
      deliveryScore: body.deliveryScore,
      responsivenessScore: body.responsivenessScore,
      complianceScore: body.complianceScore,
      overallScore,
      issueCount: body.issueCount || 0,
      carCount: body.carCount || 0,
      avgResolutionDays: body.avgResolutionDays,
    },
  });

  return NextResponse.json(score, { status: 201 });
}
