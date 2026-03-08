"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NewIssuePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <Header title="Report Issue" description="Log a quality/safety issue from the packaging line" />
      <Card className="max-w-3xl">
        <CardContent className="space-y-4">
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Issue title" />
          <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={4} placeholder="Observed condition, impact, and immediate containment" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option>P1 Critical</option><option>P2 High</option><option>P3 Medium</option><option>P4 Low</option></select>
            <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Asset tag (e.g., WRAP-003)" />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setSubmitted(true)}>Submit Issue</Button>
            <Link href="/issues"><Button variant="secondary">Cancel</Button></Link>
          </div>
          {submitted && <p className="text-sm text-green-700">Issue submitted (demo flow).</p>}
        </CardContent>
      </Card>
    </div>
  );
}
