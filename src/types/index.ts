// Core types for PackIQ platform
// These extend/complement the Prisma-generated types

export type TemplateSection = {
  id: string;
  title: string;
  order: number;
  items: TemplateItem[];
};

export type TemplateItem = {
  id: string;
  label: string;
  type: TemplateItemType;
  required: boolean;
  order: number;
  config: TemplateItemConfig;
  conditionalLogic?: ConditionalLogic;
};

export type TemplateItemType =
  | "TEXT"
  | "NUMBER"
  | "CHECKBOX"
  | "RADIO"
  | "DROPDOWN"
  | "PHOTO"
  | "SIGNATURE"
  | "DATE_TIME"
  | "SLIDER"
  | "PASS_FAIL"
  | "READING"
  | "BARCODE_SCAN"
  | "ANNOTATION"
  | "INFORMATION";

export type TemplateItemConfig = {
  placeholder?: string;
  options?: string[];         // for RADIO, DROPDOWN, CHECKBOX
  min?: number;               // for NUMBER, SLIDER, READING
  max?: number;
  unit?: string;              // for READING (e.g., "PSI", "°C")
  failThreshold?: number;     // for READING — auto-flag if outside range
  passValue?: string;         // for PASS_FAIL
  failValue?: string;
  instructionText?: string;   // for INFORMATION blocks
  maxPhotos?: number;         // for PHOTO
  allowMarkup?: boolean;      // for ANNOTATION
};

export type ConditionalLogic = {
  dependsOn: string;          // item id
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains";
  value: string | number | boolean;
  action: "show" | "hide" | "require";
};

// Inspection response data
export type InspectionResponse = {
  [itemId: string]: {
    value: string | number | boolean | string[];
    notes?: string;
    photos?: string[];
    timestamp: string;
  };
};

// Smart Finding Engine result
export type FindingTrigger = {
  itemId: string;
  itemLabel: string;
  value: unknown;
  reason: string;             // why it was flagged
  suggestedSeverity: "P1_CRITICAL" | "P2_HIGH" | "P3_MEDIUM" | "P4_LOW";
};

// Vendor CAR portal response
export type VendorCARResponse = {
  acknowledgedAt: string;
  rootCauseAnalysis: {
    why1: string;
    why2: string;
    why3?: string;
    why4?: string;
    why5?: string;
    rootCause: string;
  };
  correctiveAction: string;
  preventiveAction: string;
  targetDate: string;
  attachments: string[];
};

// Analytics types
export type DashboardView = "operations" | "quality" | "executive";

export type DateRange = {
  start: Date;
  end: Date;
};

export type ReportType =
  | "inspection_summary"
  | "issue_aging"
  | "car_status"
  | "vendor_scorecard"
  | "asset_health"
  | "sla_compliance"
  | "taiwan_weekly"; // Taiwan factory weekly report

export type VendorScorecardData = {
  vendorId: string;
  vendorName: string;
  period: string;
  qualityScore: number;
  deliveryScore: number;
  responsivenessScore: number;
  complianceScore: number;
  overallScore: number;
  trend: "up" | "down" | "stable";
  issueCount: number;
  carCount: number;
  avgResolutionDays: number;
};

// Navigation
export type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  requiredPermission?: string;
};
