"""Transparensea demo data for the fictional A.Typical lifestyle brand.

The structure is designed to mirror a production model-operations workspace.
Values are synthetic and loosely inspired by the public Hillstrom marketing dataset.
"""

from __future__ import annotations

from dataclasses import dataclass

import pandas as pd

COMPANY = "A.Typical"
PRODUCT = "Transparensea"
DISCLAIMER = (
    "Public-data-inspired demonstration with simulated production runs, adoption, "
    "workflow, and financial outcomes. No employer or client data is represented."
)
LAST_REFRESHED = "2026-07-22"
DEFAULT_OUTLIER_ID = "olr-performance-midwest-2506"


@dataclass(frozen=True)
class KpiDefinition:
    kpi_id: str
    label: str
    value: float
    fmt: str
    delta: float
    comparison: str
    subtext: str
    higher_is_better: bool


def get_meta() -> dict[str, str]:
    return {
        "company": COMPANY,
        "product": PRODUCT,
        "disclaimer": DISCLAIMER,
        "last_refreshed": LAST_REFRESHED,
        "title": "Transparensea",
        "subtitle": "Marketing model transparency, adoption, and impact",
        "model": "Uplift / treatment-selection model · v2.1",
    }


def get_kpis() -> list[KpiDefinition]:
    return [
        KpiDefinition("customers", "Customers Scored", 184_260, "count", 8.4, "vs prior 12M", "Across 24 monthly batch runs", True),
        KpiDefinition("messages", "Recommended Messages", 112_480, "count", 6.8, "vs prior 12M", "Campaign and follow-up recommendations", True),
        KpiDefinition("adoption", "Campaign Adoption", 78.4, "percent", 16.7, "vs first 12M", "Recommended campaign actually sent", True),
        KpiDefinition("conversion", "Conversion Rate", 5.9, "percent_1", 1.4, "vs first 12M", "Conversions from executed messages", True),
        KpiDefinition("net-revenue", "Net Incremental Revenue", 2_840_000, "currency", 1_060_000, "vs first 12M", "Revenue less campaign and follow-up cost", True),
        KpiDefinition("missed-value", "Estimated Missed Value", 410_000, "currency", -520_000, "vs first 12M", "Ignored or modified recommendations", False),
    ]


def get_trends_df() -> pd.DataFrame:
    rows = [
        ("2024-07", "Jul 24", 56, 3.8, 118_000, 50, 68, None, False),
        ("2024-08", "Aug 24", 58, 4.0, 126_000, 50, 68, None, False),
        ("2024-09", "Sep 24", 57, 3.9, 121_000, 50, 68, None, False),
        ("2024-10", "Oct 24", 60, 4.2, 139_000, 50, 68, None, False),
        ("2024-11", "Nov 24", 61, 4.4, 152_000, 50, 68, None, False),
        ("2024-12", "Dec 24", 63, 4.6, 168_000, 50, 68, None, False),
        ("2025-01", "Jan 25", 62, 4.5, 161_000, 50, 68, None, False),
        ("2025-02", "Feb 25", 64, 4.7, 176_000, 50, 68, None, False),
        ("2025-03", "Mar 25", 65, 4.8, 184_000, 50, 68, None, False),
        ("2025-04", "Apr 25", 63, 4.6, 171_000, 50, 68, None, False),
        ("2025-05", "May 25", 61, 4.4, 157_000, 50, 68, None, False),
        ("2025-06", "Jun 25", 49, 3.2, 96_000, 50, 68, DEFAULT_OUTLIER_ID, False),
        ("2025-07", "Jul 25", 58, 4.1, 143_000, 50, 68, None, False),
        ("2025-08", "Aug 25", 63, 4.6, 174_000, 50, 68, None, False),
        ("2025-09", "Sep 25", 67, 4.9, 193_000, 50, 68, None, False),
        ("2025-10", "Oct 25", 71, 5.2, 218_000, 50, 68, None, True),
        ("2025-11", "Nov 25", 73, 5.4, 231_000, 50, 68, None, True),
        ("2025-12", "Dec 25", 75, 5.6, 246_000, 50, 68, None, True),
        ("2026-01", "Jan 26", 76, 5.7, 254_000, 50, 68, None, True),
        ("2026-02", "Feb 26", 78, 5.9, 269_000, 50, 68, None, True),
        ("2026-03", "Mar 26", 79, 6.0, 278_000, 50, 68, None, True),
        ("2026-04", "Apr 26", 81, 6.2, 291_000, 50, 68, None, True),
        ("2026-05", "May 26", 80, 6.1, 286_000, 50, 68, None, True),
        ("2026-06", "Jun 26", 82, 6.3, 302_000, 50, 68, None, True),
    ]
    return pd.DataFrame(rows, columns=["month", "label", "adoption_rate", "conversion_rate", "net_revenue", "expected_min", "expected_max", "outlier_id", "post_intervention"])


def get_campaign_performance_df() -> pd.DataFrame:
    return pd.DataFrame([
        ("Performance Collection", "Adopted", 22_840, 7.2, 742_000),
        ("Performance Collection", "Modified", 6_780, 4.6, 121_000),
        ("New Season Edit", "Adopted", 31_260, 5.8, 694_000),
        ("New Season Edit", "Modified", 7_420, 4.1, 109_000),
        ("Member Access", "Adopted", 12_160, 8.1, 516_000),
        ("Member Access", "Ignored", 3_240, 2.2, -18_000),
        ("Re-Engagement", "Adopted", 10_420, 4.9, 168_000),
        ("Re-Engagement", "Ignored", 5_180, 1.7, -47_000),
    ], columns=["campaign", "decision", "customers", "conversion_rate", "net_revenue"])


def get_feature_influence_df() -> pd.DataFrame:
    return pd.DataFrame([
        ("Recent category spend", 0.91, "Mean |SHAP|", "Performance Collection"),
        ("Purchase recency", 0.84, "Mean |SHAP|", "Re-Engagement"),
        ("Prior campaign response", 0.79, "Mean |SHAP|", "Member Access"),
        ("Digital engagement", 0.72, "Mean |SHAP|", "Performance Collection"),
        ("Customer tenure", 0.58, "Permutation importance", "New Season Edit"),
        ("Contact frequency", 0.47, "Permutation importance", "Suppression"),
    ], columns=["feature", "influence", "method", "strongest_effect"])


def get_outliers_df() -> pd.DataFrame:
    return pd.DataFrame([{
        "outlier_id": DEFAULT_OUTLIER_ID,
        "period": "2025-06",
        "period_label": "Jun 2025",
        "market": "Midwest · Suburban",
        "campaign": "Performance Collection",
        "metric_label": "Campaign adoption",
        "metric_value": 49,
        "expected_min": 50,
        "expected_max": 68,
        "severity": "High",
        "likely_driver": "Marketing teams substituted New Season Edit for the recommended Performance Collection among recently active sport customers. Adopted recommendations converted materially better than substitutions.",
        "insight_id": "ins-performance-midwest-2506",
    }])


def get_insights_df() -> pd.DataFrame:
    return pd.DataFrame([{
        "insight_id": "ins-performance-midwest-2506",
        "outlier_id": DEFAULT_OUTLIER_ID,
        "generated_text": "Performance Collection adoption fell to 49% in Midwest suburban markets. Customers receiving the recommended campaign converted at 6.9%, compared with 4.2% when New Season Edit was substituted. The recurring substitution pattern is associated with an estimated $286K in missed net revenue across the prior six runs.",
        "human_text": "Confirmed: the Midwest team defaulted to the broader seasonal creative despite stronger model evidence for sport-oriented customers.",
        "method": "Control limit breach + campaign substitution cohort comparison",
        "status": "Confirmed",
        "confidence": "High",
        "action_id": "act-performance-midwest-2507",
    }])


def get_actions_df() -> pd.DataFrame:
    return pd.DataFrame([{
        "action_id": "act-performance-midwest-2507",
        "insight_id": "ins-performance-midwest-2506",
        "business_action": "Make the model-recommended campaign and audience the default campaign plan; require a reason when teams substitute another campaign.",
        "model_action": "Review feature influence near the Performance Collection / New Season Edit treatment boundary, especially recent category spend and digital engagement.",
        "status": "Measuring",
        "owner": "Lifecycle Marketing + Model Product",
        "implemented_date": "2025-09-15",
    }])


def get_improvements_df() -> pd.DataFrame:
    return pd.DataFrame([{
        "improvement_id": "imp-performance-midwest-2507",
        "action_id": "act-performance-midwest-2507",
        "adoption_before": 60.8,
        "adoption_after": 78.4,
        "conversion_before": 4.3,
        "conversion_after": 5.9,
        "incremental_value": 1_060_000,
        "missed_value_before": 930_000,
        "missed_value_after": 410_000,
    }])


def get_outlier_by_id(outlier_id: str) -> pd.Series | None:
    match = get_outliers_df().query("outlier_id == @outlier_id")
    return None if match.empty else match.iloc[0]


def get_insight_for_outlier(outlier_id: str) -> pd.Series | None:
    match = get_insights_df().query("outlier_id == @outlier_id")
    return None if match.empty else match.iloc[0]


def get_action_for_insight(insight_id: str) -> pd.Series | None:
    match = get_actions_df().query("insight_id == @insight_id")
    return None if match.empty else match.iloc[0]


def get_improvement_for_action(action_id: str) -> pd.Series | None:
    match = get_improvements_df().query("action_id == @action_id")
    return None if match.empty else match.iloc[0]


def get_outlier_options() -> list[tuple[str, str]]:
    df = get_outliers_df()
    return list(zip(df["outlier_id"], df["period_label"] + " · " + df["market"]))
