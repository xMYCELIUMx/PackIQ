"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";

export default function TemplatesPage() {
  return (
    <div>
      <Header
        title="Templates"
        description="Create your first inspection template to begin capturing checks and findings."
        action={{ label: "+ New Template", href: "/templates/new" }}
      />

      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm font-medium text-gray-900">No templates found</p>
          <p className="mt-2 text-sm text-gray-600">
            No fake templates are preloaded. Use the New Template action to build your first checklist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
