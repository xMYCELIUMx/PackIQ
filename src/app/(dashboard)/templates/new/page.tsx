"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NewTemplatePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <Header title="New Template" description="Create a standards-based packaging inspection template" />
      <Card className="max-w-3xl">
        <CardContent className="space-y-4">
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Template name" />
          <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="Purpose and scope" />
          <div className="flex gap-3">
            <Button onClick={() => setSaved(true)}>Save Draft</Button>
            <Link href="/templates"><Button variant="secondary">Cancel</Button></Link>
          </div>
          {saved && <p className="text-sm text-green-700">Template draft saved (demo flow).</p>}
        </CardContent>
      </Card>
    </div>
  );
}
