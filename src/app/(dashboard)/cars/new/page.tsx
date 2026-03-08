"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NewCarPage() {
  const [issued, setIssued] = useState(false);

  return (
    <div>
      <Header title="New CAR" description="Issue a corrective action request to vendor" />
      <Card className="max-w-3xl">
        <CardContent className="space-y-4">
          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="CAR title" />
          <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={4} placeholder="Problem statement and impact to production/quality" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Vendor" />
            <input type="date" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setIssued(true)}>Issue CAR</Button>
            <Link href="/cars"><Button variant="secondary">Cancel</Button></Link>
          </div>
          {issued && <p className="text-sm text-green-700">CAR issued (demo flow). Vendor token link generated.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
