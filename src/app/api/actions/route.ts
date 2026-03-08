import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorize, requireInternalAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (!auth.ok) return auth.response;

  const access = authorize(auth.context, "readActions");
  if (!access.ok) return access.response;

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const assigneeId = searchParams.get("assigneeId");

  const where: Record<string, unknown> = {
    OR: [
      { issue: { site: { organizationId: auth.context.organizationId } } },
      { car: { vendor: { organizationId: auth.context.organizationId } } },
    ],
  };
  if (status) where.status = status;
  if (assigneeId) where.assigneeId = assigneeId;

  const actions = await prisma.action.findMany({
    where,
    include: {
      creator: { select: { name: true, role: true } },
      assignee: { select: { name: true, role: true } },
      issue: { select: { id: true, number: true, title: true } },
      car: { select: { id: true, number: true, title: true } },
    },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
    take: 50,
  });

  return NextResponse.json(actions);
}

export async function POST(request: NextRequest) {
  const auth = await requireInternalAuth(request);
  if (!auth.ok) return auth.response;

  const access = authorize(auth.context, "writeActions");
  if (!access.ok) return access.response;

  const body = await request.json();

  const action = await prisma.action.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority || "MEDIUM",
      creatorId: auth.context.userId,
      assigneeId: body.assigneeId,
      issueId: body.issueId,
      carId: body.carId,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      status: "PENDING",
    },
  });

  return NextResponse.json(action, { status: 201 });
}
