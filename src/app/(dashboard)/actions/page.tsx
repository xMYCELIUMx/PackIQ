"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

const actions = [
  {
    id: "ACT-088",
    number: 88,
    title: "Replace strapping head alignment pins",
    description: "Order and install new alignment pins for STRAP-001 strapping head",
    status: "IN_PROGRESS",
    priority: "URGENT",
    creator: "John Doe",
    creatorRole: "QUALITY_MANAGER",
    assignee: "Wei Zhang",
    assigneeRole: "ENGINEER",
    linkedIssue: "ISS-041",
    linkedCAR: null,
    dueDate: "2026-03-08",
    createdAt: "2026-03-07",
  },
  {
    id: "ACT-087",
    number: 87,
    title: "Source replacement turntable bearing",
    description: "Contact BearingCo for warranty replacement of turntable bearing for WRAP-003",
    status: "PENDING",
    priority: "HIGH",
    creator: "John Doe",
    creatorRole: "QUALITY_MANAGER",
    assignee: "Sarah Lin",
    assigneeRole: "ENGINEER",
    linkedIssue: "ISS-039",
    linkedCAR: "CAR-015",
    dueDate: "2026-03-10",
    createdAt: "2026-03-07",
  },
  {
    id: "ACT-086",
    number: 86,
    title: "Test new adhesive formulation samples",
    description: "Run 500-case trial with reformulated adhesive from AdhesiveTech",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    creator: "Sarah Lin",
    creatorRole: "ENGINEER",
    assignee: "Mike Chen",
    assigneeRole: "FIELD_TECH",
    linkedIssue: null,
    linkedCAR: "CAR-014",
    dueDate: "2026-03-12",
    createdAt: "2026-03-05",
  },
  {
    id: "ACT-085",
    number: 85,
    title: "Update strapping tension spec in template",
    description: "Add new tension range (45-55 lbs) to daily strapping inspection template TPL-001",
    status: "COMPLETED",
    priority: "MEDIUM",
    creator: "John Doe",
    creatorRole: "QUALITY_MANAGER",
    assignee: "John Doe",
    assigneeRole: "QUALITY_MANAGER",
    linkedIssue: null,
    linkedCAR: "CAR-013",
    dueDate: "2026-03-05",
    createdAt: "2026-03-01",
  },
  {
    id: "ACT-083",
    number: 83,
    title: "Verify humidity-rated labels in warehouse",
    description: "Pull 20 sample cartons from warehouse and verify new label adhesion after 72 hours",
    status: "OVERDUE",
    priority: "HIGH",
    creator: "Sarah Lin",
    creatorRole: "ENGINEER",
    assignee: "Mike Chen",
    assigneeRole: "FIELD_TECH",
    linkedIssue: null,
    linkedCAR: "CAR-012",
    dueDate: "2026-03-03",
    createdAt: "2026-02-25",
  },
];

const priorityVariants: Record<string, "danger" | "warning" | "info" | "default"> = {
  URGENT: "danger",
  HIGH: "warning",
  MEDIUM: "info",
  LOW: "default",
};

export default function ActionsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered =
    statusFilter === "All"
      ? actions
      : actions.filter((a) => a.status === statusFilter);

  return (
    <div>
      <Header
        title="Actions"
        description="Role-restricted action management — technicians log issues, managers create actions"
        action={{ label: "+ New Action" }}
      />

      {/* Role restriction notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Role Restrictions:</strong> Only Quality Managers, Engineers, Production Supervisors, and Admins
          can create actions. Field Technicians can report issues which managers then convert to assigned actions.
        </p>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-6">
        {["All", "PENDING", "IN_PROGRESS", "COMPLETED", "OVERDUE", "CANCELLED"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              statusFilter === s
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s === "All" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Actions List */}
      <div className="space-y-3">
        {filtered.map((action) => (
          <Card key={action.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusBadge type="action" value={action.status} />
                    <Badge variant={priorityVariants[action.priority]}>
                      {action.priority}
                    </Badge>
                    {action.linkedIssue && (
                      <Badge variant="default">{action.linkedIssue}</Badge>
                    )}
                    {action.linkedCAR && (
                      <Badge variant="info">{action.linkedCAR}</Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {action.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>{action.id}</span>
                    <span>Created by {action.creator} ({action.creatorRole.replace("_", " ")})</span>
                    <span>Assigned to {action.assignee}</span>
                    <span
                      className={
                        action.status === "OVERDUE" ? "text-red-500 font-medium" : ""
                      }
                    >
                      Due: {action.dueDate}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
