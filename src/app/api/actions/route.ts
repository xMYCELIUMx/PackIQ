import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ROLE_PERMISSIONS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const assigneeId = searchParams.get("assigneeId");

  const where: Record<string, unknown> = {};
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
  const body = await request.json();

  // Verify creator has permission to create actions
  const creator = await prisma.user.findUnique({
    where: { id: body.creatorId },
    select: { role: true },
  });

  if (!creator) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  const permissions = ROLE_PERMISSIONS[creator.role as keyof typeof ROLE_PERMISSIONS];
  if (!permissions?.canCreateAction) {
    return NextResponse.json(
      {
        error: "Insufficient permissions. Only managers, engineers, supervisors, and admins can create actions.",
      },
      { status: 403 }
    );
  }

  const action = await prisma.action.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority || "MEDIUM",
      creatorId: body.creatorId,
      assigneeId: body.assigneeId,
      issueId: body.issueId,
      carId: body.carId,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      status: "PENDING",
    },
  });

  return NextResponse.json(action, { status: 201 });
}
