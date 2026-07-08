import fs from "fs";
import path from "path";
import type {
  DashboardData,
  MarketingPerformanceData,
  PredictiveModelPerformanceImpactData,
} from "@/lib/dashboards/types";

const dataDir = path.join(process.cwd(), "content", "data", "dashboards");

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function loadMarketingPerformanceData(): MarketingPerformanceData {
  const slugDir = path.join(dataDir, "marketing-performance-dashboard");
  return {
    meta: readJsonFile(path.join(slugDir, "_meta.json")),
    cities: readJsonFile(path.join(slugDir, "cities.json")),
    campaigns: readJsonFile(path.join(slugDir, "campaigns.json")),
  };
}

export function loadPredictiveModelPerformanceImpactData(): PredictiveModelPerformanceImpactData {
  const slugDir = path.join(dataDir, "predictive-model-performance-impact");
  return {
    meta: readJsonFile(path.join(slugDir, "_meta.json")),
    framework: readJsonFile(path.join(slugDir, "framework.json")),
    lifecycle: readJsonFile(path.join(slugDir, "lifecycle.json")),
    kpis: readJsonFile(path.join(slugDir, "kpis.json")),
    trends: readJsonFile(path.join(slugDir, "trends.json")),
    outliers: readJsonFile(path.join(slugDir, "outliers.json")),
    interventions: readJsonFile(path.join(slugDir, "interventions.json")),
    improvements: readJsonFile(path.join(slugDir, "improvements.json")),
  };
}

/** Add one loader per dashboard dataPath. Key must match portfolio JSON dataPath. */
const dataLoaders = {
  "marketing-performance-dashboard": loadMarketingPerformanceData,
  "predictive-model-performance-impact": loadPredictiveModelPerformanceImpactData,
} satisfies Record<string, () => DashboardData>;

export type DashboardDataPath = keyof typeof dataLoaders;

export function loadDashboardData(dataPath: string): DashboardData | null {
  if (!(dataPath in dataLoaders)) return null;
  return dataLoaders[dataPath as DashboardDataPath]();
}
