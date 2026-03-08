"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const setupSteps = [
  { label: "Create site(s)", href: null },
  { label: "Create asset categories/assets", href: null },
  { label: "Create inspection template(s)", href: "/templates/new" },
  { label: "Create vendors", href: null },
  { label: "Run first inspection", href: "/inspections/new" },
];

export default function DashboardPage() {
  const [sampleMsg, setSampleMsg] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to PackIQ</h1>
        <p className="mt-1 text-sm text-gray-600">
          New organizations start empty by default. Set up your workspace using the guided steps below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">First-time setup</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          {setupSteps.map((step, idx) => (
            <div key={step.label} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
              <div className="text-sm text-gray-800">
                <span className="font-semibold mr-2">{idx + 1}.</span>
                {step.label}
              </div>
              {step.href ? (
                <Link href={step.href} className="text-sm text-blue-600 hover:text-blue-700">
                  Open
                </Link>
              ) : (
                <span className="text-xs text-gray-500">Configure in admin setup</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Optional sample data</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Sample data is never loaded by default. Use this action only if you want a demo environment.
          </p>
          <Button
            variant="secondary"
            onClick={() => setSampleMsg("Sample data loading is optional and can be implemented as a separate admin action.")}
          >
            Load sample data
          </Button>
          {sampleMsg && <p className="text-xs text-gray-500">{sampleMsg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
