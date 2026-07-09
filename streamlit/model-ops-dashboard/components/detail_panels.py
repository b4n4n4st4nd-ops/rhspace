from __future__ import annotations

import pandas as pd


def render_exception_panel(outlier: pd.Series) -> str:
    return f"""
    <div class="panel">
      <h3>Selected Exception</h3>
      <div class="field-label">Market</div>
      <div class="field-value">{outlier['market']}</div>
      <div class="field-label">Product</div>
      <div class="field-value">{outlier['product']}</div>
      <div class="field-label">Likely Driver</div>
      <div class="field-value">{outlier['likely_driver']}</div>
      <div class="field-label">Severity</div>
      <div class="field-value"><span class="severity-high">{outlier['severity']}</span></div>
      <div class="field-label">Performance</div>
      <div class="field-value">{outlier['metric_value']:.0f}%</div>
      <div class="field-label">Expected Range</div>
      <div class="field-value">{outlier['expected_min']:.0f}% – {outlier['expected_max']:.0f}%</div>
    </div>
    """


def render_intervention_panel(intervention: pd.Series) -> str:
    return f"""
    <div class="panel">
      <h3>Intervention</h3>
      <div class="field-label">Action Taken</div>
      <div class="field-value">{intervention['action_taken']}</div>
      <div class="field-label">Status</div>
      <div class="field-value">{intervention['status']}</div>
      <div class="field-label">Owner</div>
      <div class="field-value">{intervention['owner']}</div>
      <div class="field-label">Description</div>
      <div class="field-value">{intervention['description']}</div>
      <div class="field-label">Date</div>
      <div class="field-value">{intervention['date']}</div>
    </div>
    """


def render_improvement_panel(improvement: pd.Series) -> str:
    return f"""
    <div class="panel">
      <h3>Improvement</h3>
      <div class="field-label">Adoption · Before / After</div>
      <div class="field-value">{improvement['adoption_before']:.0f}% → {improvement['adoption_after']:.0f}%</div>
      <div class="field-label">Performance · Before / After</div>
      <div class="field-value">{improvement['performance_before']:.0f}% → {improvement['performance_after']:.0f}%</div>
      <div class="field-label">Estimated Incremental Value</div>
      <div class="field-value">${improvement['incremental_value'] / 1_000_000:.1f}M</div>
      <div class="field-label">Cumulative Value</div>
      <div class="field-value">${improvement['cumulative_value'] / 1_000_000:.1f}M</div>
    </div>
    """
