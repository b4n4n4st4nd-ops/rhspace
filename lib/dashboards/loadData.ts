import fs from "fs";
import path from "path";
import type {
  DashboardData,
  DecisionSupportData,
  MarketingPerformanceData,
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

export function loadDecisionSupportData(): DecisionSupportData {
  const slugDir = path.join(dataDir, "decision-support-framework");
  return {
    meta: readJsonFile(path.join(slugDir, "_meta.json")),
    framework: readJsonFile(path.join(slugDir, "framework.json")),
  };
}

/** Add one loader per dashboard dataPath. Key must match portfolio JSON dataPath. */
const dataLoaders = {
  "marketing-performance-dashboard": loadMarketingPerformanceData,
  "decision-support-framework": loadDecisionSupportData,
} satisfies Record<string, () => DashboardData>;

export type DashboardDataPath = keyof typeof dataLoaders;

export function loadDashboardData(dataPath: string): DashboardData | null {
  if (!(dataPath in dataLoaders)) return null;
  return dataLoaders[dataPath as DashboardDataPath]();
}
