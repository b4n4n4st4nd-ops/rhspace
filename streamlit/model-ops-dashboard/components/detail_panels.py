from __future__ import annotations

import pandas as pd


def render_exception_panel(outlier: pd.Series) -> str:
    return f"""
    <div class="panel">
      <h3>Statistical Outlier</h3>
      <div class="field-label">Run / Market</div>
      <div class="field-value">{outlier['period_label']} · {outlier['market']}</div>
      <div class="field-label">Campaign</div>
      <div class="field-value">{outlier['campaign']}</div>
      <div class="field-label">Observed Result</div>
      <div class="field-value">{outlier['metric_label']}: {outlier['metric_value']:.0f}%</div>
      <div class="field-label">Expected Range</div>
      <div class="field-value">{outlier['expected_min']:.0f}% – {outlier['expected_max']:.0f}%</div>
      <div class="field-label">Detected Pattern</div>
      <div class="field-value">{outlier['likely_driver']}</div>
      <span class="severity-high">{outlier['severity']} priority</span>
    </div>
    """


def render_insight_panel(insight: pd.Series) -> str:
    return f"""
    <div class="panel">
      <h3>Generated Insight</h3>
      <div class="field-label">Original Generation</div>
      <div class="field-value">{insight['generated_text']}</div>
      <div class="field-label">Human Review</div>
      <div class="field-value">{insight['human_text']}</div>
      <div class="field-label">Evidence Method</div>
      <div class="field-value">{insight['method']}</div>
      <div class="field-label">Review Status</div>
      <div class="field-value">{insight['status']} · {insight['confidence']} confidence</div>
    </div>
    """


def render_action_panel(action: pd.Series) -> str:
    return f"""
    <div class="panel">
      <h3>Suggested Actions</h3>
      <div class="field-label">Business Action</div>
      <div class="field-value">{action['business_action']}</div>
      <div class="field-label">Model Action</div>
      <div class="field-value">{action['model_action']}</div>
      <div class="field-label">Owner / Status</div>
      <div class="field-value">{action['owner']} · {action['status']}</div>
      <div class="field-label">Implemented</div>
      <div class="field-value">{action['implemented_date']}</div>
    </div>
    """


def render_improvement_panel(improvement: pd.Series) -> str:
    return f"""
    <div class="panel impact-panel">
      <h3>Measured Influence</h3>
      <div class="field-label">Campaign Adoption</div>
      <div class="field-value metric-shift">{improvement['adoption_before']:.1f}% → {improvement['adoption_after']:.1f}%</div>
      <div class="field-label">Conversion Rate</div>
      <div class="field-value metric-shift">{improvement['conversion_before']:.1f}% → {improvement['conversion_after']:.1f}%</div>
      <div class="field-label">Added Net Revenue</div>
      <div class="field-value metric-shift">+${improvement['incremental_value'] / 1_000_000:.2f}M</div>
      <div class="field-label">Estimated Missed Value</div>
      <div class="field-value">${improvement['missed_value_before'] / 1_000:.0f}K → ${improvement['missed_value_after'] / 1_000:.0f}K</div>
    </div>
    """
