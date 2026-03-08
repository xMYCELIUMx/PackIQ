import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SLA_HOURS } from "@/lib/constants";
import { authorize, requireInternalAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (!auth.ok) return auth.response;

  const access = authorize(auth.context, "readIssues");
  if (!access.ok) return access.response;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const severity = searchParams.get("severity");
  const siteId = searchParams.get("siteId");

  const where: Record<string, unknown> = {
    site: { organizationId: auth.context.organizationId },
  };
  if (status) where.status = status;
  if (severity) where.severity = severity;
  if (siteId) where.siteId = siteId;

  const issues = await prisma.issue.findMany({
    where,
    include: {
      reporter: { select: { name: true, role: true } },
      assignee: { select: { name: true, role: true } },
      site: { select: { name: true, code: true } },
      asset: { select: { name: true, assetTag: true } },
      car: { select: { id: true, number: true, status: true } },
      _count: { select: { actions: true, comments: true } },
    },
    orderBy: [{ severity: "asc" }, { createdAt: "desc" }],
    take: 50,
  });

  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (!auth.ok) return auth.response;

  const access = authorize(auth.context, "writeIssues");
  if (!access.ok) return access.response;

  const body = await request.json();

  const slaHours = SLA_HOURS[body.severity] || 24;
  const slaDeadline = new Date(Date.now() + slaHours * 60 * 60 * 1000);

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      severity: body.severity,
      siteId: body.siteId,
      assetId: body.assetId,
      reporterId: auth.context.userId,
      assigneeId: body.assigneeId,
      findingId: body.findingId,
      photos: body.photos || [],
      slaDeadline,
      status: "OPEN",
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
