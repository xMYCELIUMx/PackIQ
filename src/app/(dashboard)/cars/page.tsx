"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

const cars = [
  { id: "CAR-015", number: 15, title: "Stretch wrapper turntable bearing premature failure", description: "Bearing failure at 60% of expected lifecycle on WRAP-003", status: "ISSUED", vendor: "BearingCo International", vendorCode: "BC-001", linkedIssue: "ISS-039", creator: "John Doe", assignee: "Wei Zhang", why1: null, rootCause: null, targetDate: "2026-03-21", createdAt: "2026-03-07", vendorResponded: false },
  { id: "CAR-014", number: 14, title: "Glue gun nozzle clogging on case erectors", description: "Recurring nozzle clogging across multiple case erector units using vendor-supplied adhesive", status: "ROOT_CAUSE_SUBMITTED", vendor: "AdhesiveTech Ltd", vendorCode: "AT-002", linkedIssue: "ISS-037", creator: "John Doe", assignee: "Sarah Lin", why1: "Glue gun nozzle clogging", rootCause: "Adhesive viscosity out of spec at operating temperature", targetDate: "2026-03-14", createdAt: "2026-03-04", vendorResponded: true },
  { id: "CAR-013", number: 13, title: "Strapping coil tension inconsistency", description: "Batch variation in strapping coil tension exceeding ±10% tolerance", status: "CORRECTIVE_ACTION_PLAN", vendor: "PackMat Supplies", vendorCode: "PM-001", linkedIssue: "ISS-030", creator: "John Doe", assignee: "Mike Chen", why1: "Tension varies between coils", rootCause: "Winding machine calibration drift at vendor facility", targetDate: "2026-03-10", createdAt: "2026-02-25", vendorResponded: true },
  { id: "CAR-012", number: 12, title: "Label adhesive failure in high-humidity environment", description: "Labels peeling off cartons in TW-01 warehouse (>80% RH)", status: "VERIFICATION", vendor: "LabelPro Asia", vendorCode: "LP-001", linkedIssue: "ISS-028", creator: "Sarah Lin", assignee: "John Doe", why1: "Labels peel in warehouse", rootCause: "Adhesive formulation not rated for tropical humidity", targetDate: "2026-02-28", createdAt: "2026-02-10", vendorResponded: true },
  { id: "CAR-011", number: 11, title: "Conveyor roller bearing squeal", description: "New conveyor rollers from vendor exhibit bearing noise within 30 days", status: "CLOSED", vendor: "ConveyorParts Inc", vendorCode: "CP-003", linkedIssue: "ISS-025", creator: "John Doe", assignee: "Wei Zhang", why1: "Rollers squealing after 30 days", rootCause: "Insufficient grease packing at factory", targetDate: "2026-02-15", createdAt: "2026-01-20", vendorResponded: true },
];

const lifecycle = [
  { stage: "DRAFT", label: "Draft", description: "CAR being prepared internally" },
  { stage: "ISSUED", label: "Issued", description: "Sent to vendor via portal link" },
  { stage: "VENDOR_ACKNOWLEDGED", label: "Acknowledged", description: "Vendor confirms receipt" },
  { stage: "ROOT_CAUSE_SUBMITTED", label: "Root Cause", description: "Vendor submits 5-Why analysis" },
  { stage: "CORRECTIVE_ACTION_PLAN", label: "Action Plan", description: "Corrective & preventive actions defined" },
  { stage: "VERIFICATION", label: "Verification", description: "Internal team verifies effectiveness" },
  { stage: "CLOSED", label: "Closed", description: "CAR resolved and documented" },
];

export default function CARsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeCarId, setActiveCarId] = useState<string | null>(null);
  const [linkSentFor, setLinkSentFor] = useState<string | null>(null);

  const filtered = statusFilter === "All" ? cars : cars.filter((c) => c.status === statusFilter);
  const activeCar = cars.find((c) => c.id === activeCarId);

  return (
    <div>
      <Header
        title="Corrective Action Requests"
        description="5-Why root cause analysis with vendor portal (no login required)"
        action={{ label: "+ New CAR", href: "/cars/new" }}
      />

      {activeCar && (
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">CAR details</p>
              <p className="text-sm font-semibold text-gray-900">{activeCar.id} · {activeCar.title}</p>
              <p className="text-xs text-gray-600 mt-1">Vendor: {activeCar.vendor} · Target: {activeCar.targetDate}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setActiveCarId(null)}>Close</Button>
          </CardContent>
        </Card>
      )}

      {linkSentFor && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Vendor portal link sent for {linkSentFor}. Reminder notification scheduled for 24h.
        </div>
      )}

      <Card className="mb-6">
        <CardHeader><h2 className="text-sm font-semibold text-gray-700">CAR Lifecycle (7 Stages)</h2></CardHeader>
        <CardContent><div className="flex items-center justify-between">
          {lifecycle.map((stage, i) => (
            <div key={stage.stage} className="flex items-center"><div className="text-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mb-1">{i + 1}</div>
              <p className="text-[10px] font-medium text-gray-700">{stage.label}</p>
            </div>{i < lifecycle.length - 1 && <div className="w-12 h-0.5 bg-gray-200 mx-1" />}</div>
          ))}
        </div></CardContent>
      </Card>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", ...lifecycle.map((l) => l.stage)].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${statusFilter === s ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
            {s === "All" ? "All" : lifecycle.find((l) => l.stage === s)?.label || s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((car) => (
          <Card key={car.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusBadge type="car" value={car.status} />
                    <Badge variant="default">{car.linkedIssue}</Badge>
                    {car.vendorResponded ? <Badge variant="success">Vendor Responded</Badge> : <Badge variant="warning">Awaiting Vendor</Badge>}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{car.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{car.description}</p>
                  {car.rootCause && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-xs font-medium text-amber-800">Root Cause (5-Why):</p>
                      <p className="text-xs text-amber-700 mt-1">{car.rootCause}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span>{car.id}</span><span>Vendor: {car.vendor}</span><span>Target: {car.targetDate}</span><span>Created: {car.createdAt}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setActiveCarId(car.id)}>View</Button>
                  {!car.vendorResponded && <Button variant="secondary" size="sm" onClick={() => setLinkSentFor(car.id)}>Send Link</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
