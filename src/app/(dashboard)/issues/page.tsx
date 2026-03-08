"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";

export default function IssuesPage() {
  return (
    <div>
      <Header
        title="Issues"
        description="Track findings and incidents once inspections start running."
        action={{ label: "+ New Issue", href: "/issues/new" }}
      />

      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm font-medium text-gray-900">No issues found</p>
          <p className="mt-2 text-sm text-gray-600">
            This list is empty for new organizations until issues are created from inspections or manually.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
