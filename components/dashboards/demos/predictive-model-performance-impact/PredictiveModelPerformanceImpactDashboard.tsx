"use client";

import { useMemo, useState } from "react";
import type { PredictiveModelPerformanceImpactData } from "@/lib/dashboards/types";
import {
  getImprovementForIntervention,
  getInterventionForOutlier,
  getOutlierById,
} from "@/lib/dashboards/model-ops-utils";
import { AdoptionPerformanceTrend } from "@/components/dashboards/demos/predictive-model-performance-impact/AdoptionPerformanceTrend";
import { ImprovementImpactPanel } from "@/components/dashboards/demos/predictive-model-performance-impact/ImprovementImpactPanel";
import { InterventionPanel } from "@/components/dashboards/demos/predictive-model-performance-impact/InterventionPanel";
import { LifecycleStrip } from "@/components/dashboards/demos/predictive-model-performance-impact/LifecycleStrip";
import { ModelOpsKpiRow } from "@/components/dashboards/demos/predictive-model-performance-impact/ModelOpsKpiRow";
import { SelectedOutlierPanel } from "@/components/dashboards/demos/predictive-model-performance-impact/SelectedOutlierPanel";

interface PredictiveModelPerformanceImpactDashboardProps {
  data: PredictiveModelPerformanceImpactData;
}

export function PredictiveModelPerformanceImpactDashboard({
  data,
}: PredictiveModelPerformanceImpactDashboardProps) {
  const defaultOutlierId = data.outliers[0]?.id ?? null;
  const [selectedOutlierId, setSelectedOutlierId] = useState<string | null>(
    defaultOutlierId
  );

  const selectedOutlier = useMemo(
    () =>
      selectedOutlierId ? getOutlierById(data, selectedOutlierId) : undefined,
    [data, selectedOutlierId]
  );

  const intervention = useMemo(
    () =>
      selectedOutlier ? getInterventionForOutlier(data, selectedOutlier) : undefined,
    [data, selectedOutlier]
  );

  const improvement = useMemo(
    () =>
      intervention
        ? getImprovementForIntervention(data, intervention)
        : undefined,
    [data, intervention]
  );

  const loopActive = Boolean(selectedOutlier && intervention && improvement);

  return (
    <div className="space-y-3">
      <LifecycleStrip lifecycle={data.lifecycle} />

      <ModelOpsKpiRow kpis={data.kpis} />

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdoptionPerformanceTrend
            subtitle={data.trends.subtitle}
            interventionMonth={data.trends.interventionMonth}
            points={data.trends.points}
            selectedOutlierId={selectedOutlierId}
            onSelectOutlier={setSelectedOutlierId}
          />
        </div>
        {selectedOutlier ? (
          <SelectedOutlierPanel outlier={selectedOutlier} active={loopActive} />
        ) : (
          <div className="flex items-center justify-center border border-[#d2d2d0] bg-white p-6 text-[11px] text-[#7a7a7a]">
            Select an outlier marker to inspect the exception.
          </div>
        )}
      </div>

      {selectedOutlier && intervention && improvement ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <InterventionPanel
            intervention={intervention}
            outlier={selectedOutlier}
            active={loopActive}
          />
          <ImprovementImpactPanel
            improvement={improvement}
            intervention={intervention}
            active={loopActive}
          />
        </div>
      ) : null}
    </div>
  );
}
