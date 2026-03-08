"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type DashboardView = "operations" | "quality" | "executive";

// Vendor scorecard data
const vendorScores = [
  {
    vendor: "BearingCo International",
    code: "BC-001",
    quality: 72,
    delivery: 85,
    responsiveness: 65,
    compliance: 80,
    overall: 74.6,
    trend: "down",
    issues: 4,
    cars: 2,
    avgDays: 18,
  },
  {
    vendor: "AdhesiveTech Ltd",
    code: "AT-002",
    quality: 68,
    delivery: 90,
    responsiveness: 88,
    compliance: 85,
    overall: 79.1,
    trend: "up",
    issues: 3,
    cars: 1,
    avgDays: 12,
  },
  {
    vendor: "PackMat Supplies",
    code: "PM-001",
    quality: 82,
    delivery: 78,
    responsiveness: 75,
    compliance: 90,
    overall: 81.0,
    trend: "stable",
    issues: 2,
    cars: 1,
    avgDays: 8,
  },
  {
    vendor: "LabelPro Asia",
    code: "LP-001",
    quality: 60,
    delivery: 92,
    responsiveness: 70,
    compliance: 75,
    overall: 72.3,
    trend: "down",
    issues: 5,
    cars: 2,
    avgDays: 22,
  },
  {
    vendor: "ConveyorParts Inc",
    code: "CP-003",
    quality: 88,
    delivery: 82,
    responsiveness: 90,
    compliance: 95,
    overall: 88.0,
    trend: "up",
    issues: 1,
    cars: 1,
    avgDays: 6,
  },
];

// Standard reports
const reports = [
  { id: "RPT-01", name: "Inspection Summary", description: "Daily/weekly/monthly inspection completion and scores", frequency: "Weekly" },
  { id: "RPT-02", name: "Issue Aging Report", description: "Open issues by age and severity with SLA compliance", frequency: "Daily" },
  { id: "RPT-03", name: "CAR Status Report", description: "Active CARs by stage with vendor response tracking", frequency: "Weekly" },
  { id: "RPT-04", name: "Vendor Scorecard", description: "Weighted vendor performance across 4 dimensions", frequency: "Monthly" },
  { id: "RPT-05", name: "Asset Health Report", description: "Issue frequency and inspection scores by asset", frequency: "Monthly" },
  { id: "RPT-06", name: "SLA Compliance Report", description: "Response and resolution times vs. SLA targets", frequency: "Weekly" },
  { id: "RPT-07", name: "Taiwan Weekly Report", description: "TW-01 factory weekly summary for leadership review", frequency: "Weekly" },
];

// Operations KPIs
const operationsKPIs = [
  { label: "Inspections This Week", value: "34", subtext: "vs. 28 last week", trend: "up" },
  { label: "Avg Inspection Score", value: "89%", subtext: "+2% from last week", trend: "up" },
  { label: "Findings Auto-Detected", value: "67%", subtext: "by Smart Finding Engine", trend: "stable" },
  { label: "Avg Completion Time", value: "28 min", subtext: "-4 min from last week", trend: "up" },
];

const qualityKPIs = [
  { label: "Open P1/P2 Issues", value: "5", subtext: "2 P1, 3 P2", trend: "down" },
  { label: "SLA Compliance", value: "82%", subtext: "Target: 95%", trend: "down" },
  { label: "Active CARs", value: "4", subtext: "2 awaiting vendor", trend: "stable" },
  { label: "Avg Issue Resolution", value: "3.2 days", subtext: "Target: 2 days", trend: "down" },
];

const executiveKPIs = [
  { label: "Overall Quality Score", value: "87", subtext: "/100 composite", trend: "up" },
  { label: "Vendor Performance", value: "79", subtext: "Avg across all vendors", trend: "stable" },
  { label: "Compliance Rate", value: "94%", subtext: "Inspection completion", trend: "up" },
  { label: "Cost of Quality", value: "$12.4K", subtext: "This month (est.)", trend: "down" },
];

const kpiSets: Record<DashboardView, typeof operationsKPIs> = {
  operations: operationsKPIs,
  quality: qualityKPIs,
  executive: executiveKPIs,
};

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-28 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className={`${color} rounded-full h-2 transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">
        {score}
      </span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [view, setView] = useState<DashboardView>("operations");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const kpis = kpiSets[view];

  return (
    <div>
      <Header
        title="Analytics"
        description="Three dashboard views with vendor scorecards and 7 standard reports"
      />

      {lastAction && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {lastAction}
        </div>
      )}

      {/* Dashboard View Switcher */}
      <div className="flex gap-2 mb-8">
        {(["operations", "quality", "executive"] as DashboardView[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
              view === v
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="py-5">
              <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                <span
                  className={`text-xs font-medium pb-1 ${
                    kpi.trend === "up"
                      ? "text-green-600"
                      : kpi.trend === "down"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {kpi.trend === "up" ? "↑" : kpi.trend === "down" ? "↓" : "→"}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{kpi.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vendor Scorecard */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Vendor Scorecard
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Weighted: Quality 40% · Delivery 25% · Responsiveness 20% · Compliance 15%
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setLastAction("Vendor scorecard export queued (CSV + PDF).")}>
              Export
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overall</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dimensions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issues</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CARs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Resolution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendorScores.map((v) => (
                <tr key={v.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{v.vendor}</p>
                    <p className="text-xs text-gray-400">{v.code}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-lg font-bold ${
                        v.overall >= 80
                          ? "text-green-600"
                          : v.overall >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {v.overall}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-64">
                    <div className="space-y-1.5">
                      <ScoreBar score={v.quality} label="Quality (40%)" />
                      <ScoreBar score={v.delivery} label="Delivery (25%)" />
                      <ScoreBar score={v.responsiveness} label="Response (20%)" />
                      <ScoreBar score={v.compliance} label="Compliance (15%)" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.issues}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.cars}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{v.avgDays} days</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        v.trend === "up"
                          ? "success"
                          : v.trend === "down"
                          ? "danger"
                          : "default"
                      }
                    >
                      {v.trend === "up" ? "↑ Up" : v.trend === "down" ? "↓ Down" : "→ Stable"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Standard Reports */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            Standard Reports
          </h2>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {report.name}
                  </p>
                  {report.name === "Taiwan Weekly Report" && (
                    <Badge variant="info">TW-01</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {report.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">{report.frequency}</Badge>
                <Button variant="secondary" size="sm" onClick={() => setLastAction(`Generated ${report.name} (${report.frequency}).`)}>
                  Generate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
