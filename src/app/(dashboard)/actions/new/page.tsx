"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NewActionPage() {
  const [created, setCreated] = useState(false);

  return (
    <div>
      <Header title="New Action" description="Assign corrective actions with owner and due date" />
      <Card className="max-w-3xl">
        <CardContent className="space-y-4">
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Action title" />
          <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={3} placeholder="What needs to be done?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Assignee" />
            <input type="date" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setCreated(true)}>Create Action</Button>
            <Link href="/actions"><Button variant="secondary">Cancel</Button></Link>
          </div>
          {created && <p className="text-sm text-green-700">Action created (demo flow).</p>}
        </CardContent>
      </Card>
    </div>
  );
}
