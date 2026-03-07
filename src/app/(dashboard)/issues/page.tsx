"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SEVERITY_LABELS, SLA_HOURS } from "@/lib/constants";

const issues = [
  {
    id: "ISS-041",
    number: 41,
    title: "Strapping head misalignment causing double feeds",
    description: "Machine STRAP-001 strapping head drifting 3mm left, causing double-feed jams every ~50 cycles",
    severity: "P1_CRITICAL",
    status: "OPEN",
    site: "TW-01",
    asset: "STRAP-001",
    reporter: "Mike Chen",
    assignee: "Wei Zhang",
    slaDeadline: "2026-03-07T10:00:00Z",
    createdAt: "2026-03-07T08:45:00Z",
    linkedCAR: null,
  },
  {
    id: "ISS-039",
    number: 39,
    title: "Stretch wrapper turntable bearing noise",
    description: "Audible grinding from turntable bearing at speeds above 12 RPM",
    severity: "P2_HIGH",
    status: "IN_PROGRESS",
    site: "TW-01",
    asset: "WRAP-003",
    reporter: "Sarah Lin",
    assignee: "Wei Zhang",
    slaDeadline: "2026-03-07T16:00:00Z",
    createdAt: "2026-03-07T06:30:00Z",
    linkedCAR: "CAR-015",
  },
  {
    id: "ISS-037",
    number: 37,
    title: "Case erector glue gun intermittent failure",
    description: "Glue gun on CASE-007 failing to fire on bottom flap approximately 1 in 20 cases",
    severity: "P2_HIGH",
    status: "ACKNOWLEDGED",
    site: "US-02",
    asset: "CASE-007",
    reporter: "Mike Chen",
    assignee: null,
    slaDeadline: "2026-03-07T12:00:00Z",
    createdAt: "2026-03-06T08:00:00Z",
    linkedCAR: null,
  },
  {
    id: "ISS-035",
    number: 35,
    title: "Labeler print head streak on barcode area",
    description: "Vertical streak appearing on thermal transfer labels in barcode zone",
    severity: "P3_MEDIUM",
    status: "RESOLVED",
    site: "TW-01",
    asset: "LBL-001",
    reporter: "John Doe",
    assignee: "Sarah Lin",
    slaDeadline: "2026-03-08T14:00:00Z",
    createdAt: "2026-03-05T14:00:00Z",
    linkedCAR: null,
  },
  {
    id: "ISS-033",
    number: 33,
    title: "Conveyor belt tracking drifting right",
    description: "Belt on conveyor CNV-012 tracking 15mm right, minor product positioning issue",
    severity: "P4_LOW",
    status: "OPEN",
    site: "TW-01",
    asset: "CNV-012",
    reporter: "Wei Zhang",
    assignee: null,
    slaDeadline: "2026-03-12T00:00:00Z",
    createdAt: "2026-03-05T10:00:00Z",
    linkedCAR: null,
  },
];

// SLA severity table data
const slaTable = [
  { severity: "P1_CRITICAL", response: "1 hour", resolution: "4 hours", escalation: "Immediate to Engineering Manager" },
  { severity: "P2_HIGH", response: "4 hours", resolution: "24 hours", escalation: "After 8 hours to Quality Manager" },
  { severity: "P3_MEDIUM", response: "24 hours", resolution: "1 week", escalation: "After 48 hours to Supervisor" },
  { severity: "P4_LOW", response: "1 week", resolution: "1 month", escalation: "Monthly review" },
];

export default function IssuesPage() {
  const [severityFilter, setSeverityFilter] = useState("All");

  const filtered =
    severityFilter === "All"
      ? issues
      : issues.filter((i) => i.severity === severityFilter);

  return (
    <div>
      <Header
        title="Issues"
        description="Track and manage quality issues with SLA-driven severity levels"
        action={{ label: "+ Report Issue" }}
      />

      {/* SLA Reference */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-sm font-semibold text-gray-700">
            SLA Definitions by Severity
          </h2>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Severity</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Response Time</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Target Resolution</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500">Escalation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {slaTable.map((row) => (
                <tr key={row.severity}>
                  <td className="px-6 py-2">
                    <StatusBadge type="severity" value={row.severity} />
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-600">{row.response}</td>
                  <td className="px-6 py-2 text-sm text-gray-600">{row.resolution}</td>
                  <td className="px-6 py-2 text-sm text-gray-500">{row.escalation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Severity Filters */}
      <div className="flex gap-2 mb-6">
        {["All", "P1_CRITICAL", "P2_HIGH", "P3_MEDIUM", "P4_LOW"].map((s) => (
          <button
            key={s}
            onClick={() => setSeverityFilter(s)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              severityFilter === s
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s === "All" ? "All" : SEVERITY_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filtered.map((issue) => (
          <Card key={issue.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <StatusBadge type="severity" value={issue.severity} />
                    <StatusBadge type="issue" value={issue.status} />
                    {issue.linkedCAR && (
                      <Badge variant="info">{issue.linkedCAR}</Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mt-2">
                    {issue.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {issue.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>{issue.id}</span>
                    <span>{issue.site} · {issue.asset}</span>
                    <span>Reported by {issue.reporter}</span>
                    {issue.assignee && <span>Assigned to {issue.assignee}</span>}
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
