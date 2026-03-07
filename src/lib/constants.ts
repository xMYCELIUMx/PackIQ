// SLA definitions by severity (in hours)
export const SLA_HOURS: Record<string, number> = {
  P1_CRITICAL: 1,
  P2_HIGH: 4,
  P3_MEDIUM: 24,
  P4_LOW: 168, // 1 week
};

export const SEVERITY_LABELS: Record<string, string> = {
  P1_CRITICAL: "P1 — Critical",
  P2_HIGH: "P2 — High",
  P3_MEDIUM: "P3 — Medium",
  P4_LOW: "P4 — Low",
};

export const SEVERITY_COLORS: Record<string, string> = {
  P1_CRITICAL: "bg-red-600 text-white",
  P2_HIGH: "bg-orange-500 text-white",
  P3_MEDIUM: "bg-yellow-400 text-black",
  P4_LOW: "bg-blue-400 text-white",
};

export const INSPECTION_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  IN_PROGRESS: "In Progress",
  PAUSED: "Paused",
  SUBMITTED: "Submitted",
  REVIEWED: "Reviewed",
  CLOSED: "Closed",
};

export const ISSUE_STATUS_LABELS: Record<string, string> = {
  OPEN: "Open",
  ACKNOWLEDGED: "Acknowledged",
  IN_PROGRESS: "In Progress",
  ON_HOLD: "On Hold",
  RESOLVED: "Resolved",
  VERIFIED: "Verified",
  CLOSED: "Closed",
};

export const CAR_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  ISSUED: "Issued",
  VENDOR_ACKNOWLEDGED: "Vendor Acknowledged",
  ROOT_CAUSE_SUBMITTED: "Root Cause Submitted",
  CORRECTIVE_ACTION_PLAN: "Corrective Action Plan",
  VERIFICATION: "Verification",
  CLOSED: "Closed",
};

export const ACTION_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
};

export const ASSET_CATEGORY_LABELS: Record<string, string> = {
  STRAPPING_MACHINE: "Strapping Machine",
  STRETCH_WRAPPER: "Stretch Wrapper",
  CASE_ERECTOR: "Case Erector",
  CASE_SEALER: "Case Sealer",
  PALLETIZER: "Palletizer",
  LABELER: "Labeler",
  SHRINK_WRAPPER: "Shrink Wrapper",
  CONVEYOR: "Conveyor",
  OTHER: "Other",
};

export const ROLE_LABELS: Record<string, string> = {
  FIELD_TECH: "Field Technician",
  ENGINEER: "Engineer",
  QUALITY_MANAGER: "Quality Manager",
  PRODUCTION_SUPERVISOR: "Production Supervisor",
  ADMIN: "Administrator",
};

// Role-based permissions
export const ROLE_PERMISSIONS = {
  FIELD_TECH: {
    canCreateInspection: true,
    canCreateIssue: true,
    canCreateAction: false,  // technicians log issues, managers create actions
    canCreateCAR: false,
    canViewAnalytics: false,
    canManageTemplates: false,
  },
  ENGINEER: {
    canCreateInspection: true,
    canCreateIssue: true,
    canCreateAction: true,
    canCreateCAR: true,
    canViewAnalytics: true,
    canManageTemplates: true,
  },
  QUALITY_MANAGER: {
    canCreateInspection: true,
    canCreateIssue: true,
    canCreateAction: true,
    canCreateCAR: true,
    canViewAnalytics: true,
    canManageTemplates: true,
  },
  PRODUCTION_SUPERVISOR: {
    canCreateInspection: true,
    canCreateIssue: true,
    canCreateAction: true,
    canCreateCAR: false,
    canViewAnalytics: true,
    canManageTemplates: false,
  },
  ADMIN: {
    canCreateInspection: true,
    canCreateIssue: true,
    canCreateAction: true,
    canCreateCAR: true,
    canViewAnalytics: true,
    canManageTemplates: true,
  },
} as const;

// Vendor scorecard weights
export const VENDOR_SCORE_WEIGHTS = {
  quality: 0.4,
  delivery: 0.25,
  responsiveness: 0.2,
  compliance: 0.15,
} as const;
