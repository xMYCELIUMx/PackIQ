"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";

export default function InspectionsPage() {
  return (
    <div>
      <Header
        title="Inspections"
        description="No inspections yet. Start by creating your first inspection after setup."
        action={{ label: "+ New Inspection", href: "/inspections/new" }}
      />

      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm font-medium text-gray-900">No inspections found</p>
          <p className="mt-2 text-sm text-gray-600">
            New organizations start empty; inspections appear here after you run your first inspection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
