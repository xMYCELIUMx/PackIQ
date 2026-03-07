"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Mock data for dashboard
const stats = [
  { label: "Open Inspections", value: 12, change: "+3 today", variant: "info" as const },
  { label: "Active Issues", value: 8, change: "2 P1 Critical", variant: "danger" as const },
  { label: "Pending CARs", value: 5, change: "3 awaiting vendor", variant: "warning" as const },
  { label: "Overdue Actions", value: 3, change: "Due this week", variant: "danger" as const },
];

const recentInspections = [
  { id: "INS-001", title: "Strapping Machine Daily Check", site: "TW-01", status: "SUBMITTED", score: 92 },
  { id: "INS-002", title: "Stretch Wrapper Weekly PM", site: "TW-01", status: "IN_PROGRESS", score: null },
  { id: "INS-003", title: "Case Erector Pre-Shift", site: "US-02", status: "SUBMITTED", score: 88 },
  { id: "INS-004", title: "Palletizer Safety Audit", site: "TW-01", status: "DRAFT", score: null },
];

const criticalIssues = [
  { id: "ISS-041", title: "Strapping head misalignment causing double feeds", severity: "P1_CRITICAL", age: "2h" },
  { id: "ISS-039", title: "Stretch wrapper turntable bearing noise", severity: "P2_HIGH", age: "6h" },
  { id: "ISS-037", title: "Case erector glue gun intermittent failure", severity: "P2_HIGH", age: "1d" },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Operations overview — Taiwan Factory (TW-01)
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-5">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-1">
                <Badge variant={stat.variant}>{stat.change}</Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Inspections */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Inspections
            </h2>
          </CardHeader>
          <div className="divide-y divide-gray-100">
            {recentInspections.map((insp) => (
              <div
                key={insp.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {insp.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {insp.id} · {insp.site}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {insp.score !== null && (
                    <span className="text-sm font-semibold text-gray-700">
                      {insp.score}%
                    </span>
                  )}
                  <Badge
                    variant={
                      insp.status === "SUBMITTED"
                        ? "success"
                        : insp.status === "IN_PROGRESS"
                        ? "info"
                        : "default"
                    }
                  >
                    {insp.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Critical Issues */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Critical Issues
            </h2>
          </CardHeader>
          <div className="divide-y divide-gray-100">
            {criticalIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {issue.title}
                  </p>
                  <p className="text-xs text-gray-500">{issue.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{issue.age}</span>
                  <Badge
                    variant={
                      issue.severity === "P1_CRITICAL" ? "danger" : "warning"
                    }
                  >
                    {issue.severity === "P1_CRITICAL" ? "P1" : "P2"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
