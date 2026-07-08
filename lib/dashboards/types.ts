export interface DashboardMeta {
  company: string;
  disclaimer: string;
  lastRefreshed: string;
}

export type BrandId = "brand-a" | "brand-b" | "brand-c" | "brand-d";

export type CampaignType =
  | "event"
  | "sponsorship"
  | "activation"
  | "digital"
  | "retail";

export interface CampaignRow {
  id: string;
  name: string;
  month: string;
  city: string;
  brand: BrandId;
  campaignType: CampaignType;
  events: number;
  impressions: number;
  interactions: number;
  engagements: number;
  impressionGoal: number;
  engagementGoal: number;
}

export interface CityMeta {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface MarketingPerformanceData {
  meta: DashboardMeta;
  cities: CityMeta[];
  campaigns: CampaignRow[];
}

export interface ModelOperationsDimension {
  id: string;
  label: string;
  description: string;
}

/** Flagship model-operations framework — business decision-support, not ML monitoring. */
export interface ModelOperationsKpi {
  id: string;
  label: string;
  value: number;
  format: "count" | "percent" | "currency";
  delta: number;
  comparisonPeriod: string;
  subtext: string;
  higherIsBetter: boolean;
}

export interface ModelOperationsKpis {
  items: ModelOperationsKpi[];
}

export interface ModelOperationsTrendPoint {
  month: string;
  label: string;
  adoptionRate: number;
  performanceRate: number;
  valueOpportunity?: number;
  cumulativeValueImpact?: number;
  expectedMin: number;
  expectedMax: number;
  outlierId?: string;
  isPostIntervention?: boolean;
}

export interface ModelOperationsTrends {
  subtitle: string;
  interventionMonth: string;
  points: ModelOperationsTrendPoint[];
}

export interface ModelOutlier {
  id: string;
  period: string;
  periodLabel: string;
  market: string;
  product: string;
  category: string;
  metricLabel: string;
  metricValue: number;
  expectedMin: number;
  expectedMax: number;
  zScore: number;
  severity: "High" | "Medium" | "Low";
  likelyDriver: string;
  autoDetected: boolean;
  interventionId: string;
}

export interface ModelIntervention {
  id: string;
  outlierId: string;
  actionType: string;
  actionStatus: "Open" | "In progress" | "Closed";
  date: string;
  ownerTeam: string;
  description: string;
}

export interface ModelImprovement {
  id: string;
  interventionId: string;
  adoptionBefore: number;
  adoptionAfter: number;
  performanceBefore: number;
  performanceAfter: number;
  overrideRateBefore: number;
  overrideRateAfter: number;
  incrementalValueImpact: number;
  cumulativeValueImpact: number;
}

export interface ModelOperationsLifecycle {
  stages: string[];
  accentStages: string[];
}

export interface PredictiveModelPerformanceImpactData {
  meta: DashboardMeta;
  framework: {
    dimensions: ModelOperationsDimension[];
    optionalMlDiagnostics?: string[];
  };
  lifecycle: ModelOperationsLifecycle;
  kpis: ModelOperationsKpis;
  trends: ModelOperationsTrends;
  outliers: ModelOutlier[];
  interventions: ModelIntervention[];
  improvements: ModelImprovement[];
}

export type DashboardData =
  | MarketingPerformanceData
  | PredictiveModelPerformanceImpactData;

export interface DashboardKpis {
  events: number;
  impressions: number;
  interactions: number;
  engagements: number;
  engagementRate: number;
  impressionsToGoal: number;
  engagementsToGoal: number;
  goalAttainment: number;
}

export interface MonthlyTrendPoint {
  month: string;
  label: string;
  impressions: number;
  engagementRate: number;
}

export interface TypeMixSegment {
  type: CampaignType;
  label: string;
  value: number;
}

export interface RankedMarket {
  cityId: string;
  label: string;
  impressions: number;
  engagementRate: number;
}

export interface ScatterPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
}

export interface DivergingRow {
  id: string;
  label: string;
  value: number;
  maxAbs: number;
}
