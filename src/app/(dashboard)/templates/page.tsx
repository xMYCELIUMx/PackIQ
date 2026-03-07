"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ASSET_CATEGORY_LABELS } from "@/lib/constants";

const templates = [
  {
    id: "TPL-001",
    name: "Daily Strapping Machine Inspection",
    description: "Pre-shift check for all strapping machine models",
    category: "STRAPPING_MACHINE",
    status: "PUBLISHED",
    version: 3,
    itemCount: 24,
    usageCount: 156,
    lastUsed: "2026-03-07",
  },
  {
    id: "TPL-002",
    name: "Weekly Stretch Wrapper PM",
    description: "Preventive maintenance checklist for stretch wrappers",
    category: "STRETCH_WRAPPER",
    status: "PUBLISHED",
    version: 2,
    itemCount: 38,
    usageCount: 52,
    lastUsed: "2026-03-05",
  },
  {
    id: "TPL-003",
    name: "Case Erector Pre-Shift",
    description: "Quick startup verification for case erectors",
    category: "CASE_ERECTOR",
    status: "PUBLISHED",
    version: 4,
    itemCount: 18,
    usageCount: 210,
    lastUsed: "2026-03-07",
  },
  {
    id: "TPL-004",
    name: "Monthly Safety Audit",
    description: "Comprehensive safety audit for all packaging equipment",
    category: null,
    status: "PUBLISHED",
    version: 1,
    itemCount: 52,
    usageCount: 12,
    lastUsed: "2026-02-28",
  },
  {
    id: "TPL-005",
    name: "Palletizer Calibration Check",
    description: "Position and force calibration verification",
    category: "PALLETIZER",
    status: "DRAFT",
    version: 1,
    itemCount: 15,
    usageCount: 0,
    lastUsed: null,
  },
  {
    id: "TPL-006",
    name: "Vendor Equipment Acceptance",
    description: "New equipment installation acceptance criteria",
    category: null,
    status: "PUBLISHED",
    version: 2,
    itemCount: 45,
    usageCount: 8,
    lastUsed: "2026-01-15",
  },
];

const machineLibrary = [
  { category: "STRAPPING_MACHINE", count: 3, icon: "📦" },
  { category: "STRETCH_WRAPPER", count: 2, icon: "🔄" },
  { category: "CASE_ERECTOR", count: 4, icon: "📐" },
  { category: "CASE_SEALER", count: 2, icon: "📋" },
  { category: "PALLETIZER", count: 1, icon: "🏗️" },
  { category: "LABELER", count: 2, icon: "🏷️" },
];

export default function TemplatesPage() {
  return (
    <div>
      <Header
        title="Templates"
        description="Drag-and-drop template builder with conditional logic and version control"
        action={{ label: "+ New Template" }}
      />

      {/* Machine Library */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Pre-Built Machine Library
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {machineLibrary.map((m) => (
            <Card key={m.category}>
              <CardContent className="py-4 text-center">
                <div className="text-2xl mb-1">{m.icon}</div>
                <p className="text-xs font-medium text-gray-700">
                  {ASSET_CATEGORY_LABELS[m.category]}
                </p>
                <p className="text-xs text-gray-400">{m.count} templates</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <Card key={tpl.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-5">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={tpl.status === "PUBLISHED" ? "success" : "default"}>
                  {tpl.status}
                </Badge>
                <span className="text-xs text-gray-400">v{tpl.version}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {tpl.name}
              </h3>
              <p className="text-xs text-gray-500 mb-4">{tpl.description}</p>
              {tpl.category && (
                <Badge variant="info" className="mb-3">
                  {ASSET_CATEGORY_LABELS[tpl.category]}
                </Badge>
              )}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>{tpl.itemCount} items</span>
                <span>{tpl.usageCount} uses</span>
                {tpl.lastUsed && <span>Last: {tpl.lastUsed}</span>}
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="secondary" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
