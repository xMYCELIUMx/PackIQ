"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

// Mock data
const inspections = [
  {
    id: "INS-001",
    title: "Strapping Machine Daily Check",
    template: "Daily Strapping Inspection",
    inspector: "Mike Chen",
    site: "TW-01",
    line: "Line A",
    asset: "STRAP-001",
    status: "SUBMITTED" as const,
    score: 92,
    startedAt: "2026-03-07T08:00:00Z",
    completedAt: "2026-03-07T08:32:00Z",
    findingsCount: 2,
  },
  {
    id: "INS-002",
    title: "Stretch Wrapper Weekly PM",
    template: "Weekly Stretch Wrapper PM",
    inspector: "Sarah Lin",
    site: "TW-01",
    line: "Line B",
    asset: "WRAP-003",
    status: "IN_PROGRESS" as const,
    score: null,
    startedAt: "2026-03-07T09:15:00Z",
    completedAt: null,
    findingsCount: 0,
  },
  {
    id: "INS-003",
    title: "Case Erector Pre-Shift",
    template: "Pre-Shift Case Erector",
    inspector: "Mike Chen",
    site: "US-02",
    line: "Line C",
    asset: "CASE-007",
    status: "SUBMITTED" as const,
    score: 88,
    startedAt: "2026-03-06T06:00:00Z",
    completedAt: "2026-03-06T06:25:00Z",
    findingsCount: 3,
  },
  {
    id: "INS-004",
    title: "Palletizer Safety Audit",
    template: "Monthly Safety Audit",
    inspector: "John Doe",
    site: "TW-01",
    line: "Line A",
    asset: "PAL-002",
    status: "DRAFT" as const,
    score: null,
    startedAt: null,
    completedAt: null,
    findingsCount: 0,
  },
  {
    id: "INS-005",
    title: "Labeler Calibration Check",
    template: "Labeler Calibration",
    inspector: "Wei Zhang",
    site: "TW-01",
    line: "Line D",
    asset: "LBL-001",
    status: "REVIEWED" as const,
    score: 95,
    startedAt: "2026-03-05T14:00:00Z",
    completedAt: "2026-03-05T14:45:00Z",
    findingsCount: 1,
  },
];

const statusFilters = ["All", "DRAFT", "IN_PROGRESS", "SUBMITTED", "REVIEWED", "CLOSED"];

export default function InspectionsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? inspections : inspections.filter((i) => i.status === filter);

  return (
    <div>
      <Header
        title="Inspections"
        description="Mobile-first inspection management with Smart Finding Engine"
        action={{ label: "+ New Inspection" }}
      />

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              filter === s
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s === "All" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Inspections Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Findings
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((insp) => (
                <tr key={insp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{insp.title}</p>
                    <p className="text-xs text-gray-500">{insp.id} · {insp.template}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{insp.inspector}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{insp.site}</p>
                    <p className="text-xs text-gray-400">{insp.line} · {insp.asset}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge type="inspection" value={insp.status} />
                  </td>
                  <td className="px-6 py-4">
                    {insp.score !== null ? (
                      <span
                        className={`text-sm font-semibold ${
                          insp.score >= 90 ? "text-green-600" : insp.score >= 70 ? "text-yellow-600" : "text-red-600"
                        }`}
                      >
                        {insp.score}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {insp.findingsCount > 0 ? (
                      <Badge variant={insp.findingsCount >= 3 ? "warning" : "info"}>
                        {insp.findingsCount}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
