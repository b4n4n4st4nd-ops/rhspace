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

export interface FrameworkDimension {
  id: string;
  label: string;
  description: string;
}

export interface DecisionSupportData {
  meta: DashboardMeta;
  framework: {
    dimensions: FrameworkDimension[];
  };
}

export type DashboardData = MarketingPerformanceData | DecisionSupportData;

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
