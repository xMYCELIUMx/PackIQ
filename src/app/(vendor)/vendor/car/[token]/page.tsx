"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// This page is accessed by vendors via a unique token link — no login required
// e.g., /vendor/car/abc123-unique-token

export default function VendorCARPortal() {
  const [step, setStep] = useState<"review" | "acknowledge" | "root-cause" | "action-plan" | "submitted">("review");

  // Mock CAR data (would be fetched via token)
  const car = {
    number: 15,
    title: "Stretch wrapper turntable bearing premature failure",
    description:
      "Bearing failure at 60% of expected lifecycle on WRAP-003. Turntable bearing exhibiting audible grinding at speeds above 12 RPM, installed January 2026.",
    issuedBy: "PackIQ Quality Team",
    issuedDate: "March 7, 2026",
    targetDate: "March 21, 2026",
    severity: "P2 — High",
    asset: "Stretch Wrapper WRAP-003",
    site: "Taiwan Factory (TW-01)",
  };

  const [formData, setFormData] = useState({
    why1: "",
    why2: "",
    why3: "",
    why4: "",
    why5: "",
    rootCause: "",
    correctiveAction: "",
    preventiveAction: "",
    targetDate: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-sm text-white">
              PQ
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                PackIQ Vendor Portal
              </h1>
              <p className="text-xs text-gray-500">
                Corrective Action Request — No login required
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* CAR Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                CAR-{String(car.number).padStart(3, "0")}
              </h2>
              <Badge variant="warning">{car.severity}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-gray-900 mb-2">{car.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{car.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Issued By</p>
                <p className="font-medium">{car.issuedBy}</p>
              </div>
              <div>
                <p className="text-gray-500">Issue Date</p>
                <p className="font-medium">{car.issuedDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Asset</p>
                <p className="font-medium">{car.asset}</p>
              </div>
              <div>
                <p className="text-gray-500">Target Resolution</p>
                <p className="font-medium text-red-600">{car.targetDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {["review", "acknowledge", "root-cause", "action-plan"].map(
            (s, i) => {
              const labels = [
                "Review",
                "Acknowledge",
                "5-Why Analysis",
                "Action Plan",
              ];
              const isCompleted =
                ["review", "acknowledge", "root-cause", "action-plan"].indexOf(
                  step
                ) > i || step === "submitted";
              const isCurrent = step === s;
              return (
                <div key={s} className="flex items-center">
                  <div className="text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✓" : i + 1}
                    </div>
                    <p className="text-xs mt-1 text-gray-600">{labels[i]}</p>
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* Step Content */}
        {step === "review" && (
          <Card>
            <CardContent className="py-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Review CAR Details
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please review the corrective action request above. Click
                &quot;Acknowledge &amp; Continue&quot; to confirm receipt and
                begin your response.
              </p>
              <Button onClick={() => setStep("acknowledge")}>
                Acknowledge &amp; Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "acknowledge" && (
          <Card>
            <CardContent className="py-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Acknowledgment
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                By proceeding, you acknowledge receipt of this CAR and commit to
                providing a root cause analysis and corrective action plan by{" "}
                <strong>{car.targetDate}</strong>.
              </p>
              <Button onClick={() => setStep("root-cause")}>
                Proceed to 5-Why Analysis
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "root-cause" && (
          <Card>
            <CardContent className="py-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                5-Why Root Cause Analysis
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Answer each &quot;Why?&quot; to drill down to the root cause.
                Minimum 2 levels required.
              </p>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Why #{n}?{" "}
                      {n <= 2 && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData[`why${n}` as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`why${n}`]: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={
                        n === 1
                          ? "Why did the bearing fail prematurely?"
                          : `Why? (follow up from Why #${n - 1})`
                      }
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Root Cause Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.rootCause}
                    onChange={(e) =>
                      setFormData({ ...formData, rootCause: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Summarize the identified root cause..."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setStep("acknowledge")}
                >
                  Back
                </Button>
                <Button onClick={() => setStep("action-plan")}>
                  Continue to Action Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "action-plan" && (
          <Card>
            <CardContent className="py-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Corrective &amp; Preventive Action Plan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Corrective Action <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.correctiveAction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        correctiveAction: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="What immediate corrective action will be taken?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preventive Action <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.preventiveAction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preventiveAction: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="What preventive measures will ensure this doesn't recur?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Completion Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetDate: e.target.value })
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setStep("root-cause")}
                >
                  Back
                </Button>
                <Button onClick={() => setStep("submitted")}>
                  Submit Response
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "submitted" && (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-green-600">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Response Submitted
              </h3>
              <p className="text-sm text-gray-500">
                Thank you for your response to CAR-{String(car.number).padStart(3, "0")}.
                The PackIQ quality team will review your submission and follow up
                if additional information is needed.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
