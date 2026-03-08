"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NewInspectionPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <Header
        title="New Inspection"
        description="Create a new inspection draft"
      />

      <Card className="max-w-3xl">
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. Daily Strapping Inspection"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>Daily Strapping Inspection</option>
                <option>Weekly Stretch Wrapper PM</option>
                <option>Pre-Shift Case Erector</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>TW-01</option>
                <option>US-02</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={() => setSaved(true)}>Save Draft</Button>
            <Link href="/inspections">
              <Button variant="secondary">Cancel</Button>
            </Link>
          </div>

          {saved && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              Draft saved (UI demo). Backend submit wiring can be added next.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
