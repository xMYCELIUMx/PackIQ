"use client";

import { Badge } from "./Badge";
import {
  SEVERITY_LABELS,
  INSPECTION_STATUS_LABELS,
  ISSUE_STATUS_LABELS,
  CAR_STATUS_LABELS,
  ACTION_STATUS_LABELS,
} from "@/lib/constants";

type StatusType = "severity" | "inspection" | "issue" | "car" | "action";

const statusConfig: Record<StatusType, { labels: Record<string, string>; variantMap: Record<string, "default" | "success" | "warning" | "danger" | "info"> }> = {
  severity: {
    labels: SEVERITY_LABELS,
    variantMap: {
      P1_CRITICAL: "danger",
      P2_HIGH: "warning",
      P3_MEDIUM: "info",
      P4_LOW: "default",
    },
  },
  inspection: {
    labels: INSPECTION_STATUS_LABELS,
    variantMap: {
      DRAFT: "default",
      IN_PROGRESS: "info",
      PAUSED: "warning",
      SUBMITTED: "success",
      REVIEWED: "success",
      CLOSED: "default",
    },
  },
  issue: {
    labels: ISSUE_STATUS_LABELS,
    variantMap: {
      OPEN: "danger",
      ACKNOWLEDGED: "warning",
      IN_PROGRESS: "info",
      ON_HOLD: "warning",
      RESOLVED: "success",
      VERIFIED: "success",
      CLOSED: "default",
    },
  },
  car: {
    labels: CAR_STATUS_LABELS,
    variantMap: {
      DRAFT: "default",
      ISSUED: "info",
      VENDOR_ACKNOWLEDGED: "info",
      ROOT_CAUSE_SUBMITTED: "warning",
      CORRECTIVE_ACTION_PLAN: "warning",
      VERIFICATION: "info",
      CLOSED: "success",
    },
  },
  action: {
    labels: ACTION_STATUS_LABELS,
    variantMap: {
      PENDING: "default",
      IN_PROGRESS: "info",
      COMPLETED: "success",
      OVERDUE: "danger",
      CANCELLED: "default",
    },
  },
};

export function StatusBadge({
  type,
  value,
}: {
  type: StatusType;
  value: string;
}) {
  const config = statusConfig[type];
  const label = config.labels[value] || value;
  const variant = config.variantMap[value] || "default";

  return <Badge variant={variant}>{label}</Badge>;
}
