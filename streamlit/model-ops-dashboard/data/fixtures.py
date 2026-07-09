"""Fictional model-operations portfolio data."""

from __future__ import annotations

from dataclasses import dataclass

import pandas as pd

COMPANY = "Northwind Analytics"
DISCLAIMER = (
    "Fictional decision-support scenario for portfolio demonstration. "
    "No proprietary client or employer data is represented."
)
LAST_REFRESHED = "2026-07-08"
DEFAULT_OUTLIER_ID = "olr-mw-2508"


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
        "disclaimer": DISCLAIMER,
        "last_refreshed": LAST_REFRESHED,
        "title": "Predictive Model Performance & Impact",
        "subtitle": "Executive decision-support framework for recommendations, adoption, and business value",
    }


def get_kpis() -> list[KpiDefinition]:
    return [
        KpiDefinition(
            "recommendations",
            "Recommendations",
            14200,
            "count",
            4.2,
            "vs prior 12M",
            "Issued across all markets and products",
            True,
        ),
        KpiDefinition(
            "units-recommended",
            "Units Recommended",
            2_100_000,
            "count",
            2.1,
            "vs prior 12M",
            "Allocation volume recommended",
            True,
        ),
        KpiDefinition(
            "adoption-rate",
            "Adoption Rate",
            78,
            "percent",
            5.0,
            "vs prior 12M",
            "Recommendations accepted and executed",
            True,
        ),
        KpiDefinition(
            "performance-rate",
            "Performance Rate",
            82,
            "percent",
            3.0,
            "vs prior 12M",
            "Adopted actions meeting target outcome",
            True,
        ),
        KpiDefinition(
            "override-rate",
            "Override Rate",
            12,
            "percent",
            -2.0,
            "vs prior 12M",
            "Human overrides against model guidance",
            False,
        ),
        KpiDefinition(
            "estimated-value",
            "Estimated Business Value",
            6_800_000,
            "currency",
            1_200_000,
            "incremental",
            "Cumulative attributed business value",
            True,
        ),
    ]


def get_trends_df() -> pd.DataFrame:
    rows = [
        ("2024-07", "Jul 24", 72, 80, 78, 86, 3_200_000, None, False),
        ("2024-08", "Aug 24", 73, 81, 78, 86, 3_350_000, None, False),
        ("2024-09", "Sep 24", 74, 82, 78, 86, 3_500_000, None, False),
        ("2024-10", "Oct 24", 73, 81, 78, 86, 3_650_000, None, False),
        ("2024-11", "Nov 24", 75, 83, 78, 86, 3_800_000, None, False),
        ("2024-12", "Dec 24", 76, 84, 78, 86, 3_950_000, None, False),
        ("2025-01", "Jan 25", 75, 83, 78, 86, 4_100_000, None, False),
        ("2025-02", "Feb 25", 76, 82, 78, 86, 4_250_000, None, False),
        ("2025-03", "Mar 25", 77, 84, 78, 86, 4_400_000, None, False),
        ("2025-04", "Apr 25", 76, 83, 78, 86, 4_550_000, None, False),
        ("2025-05", "May 25", 77, 84, 78, 86, 4_700_000, None, False),
        ("2025-06", "Jun 25", 78, 83, 78, 86, 4_850_000, None, False),
        ("2025-07", "Jul 25", 77, 82, 78, 86, 5_000_000, None, False),
        ("2025-08", "Aug 25", 74, 61, 78, 86, 5_050_000, DEFAULT_OUTLIER_ID, False),
        ("2025-09", "Sep 25", 75, 68, 78, 86, 5_200_000, None, False),
        ("2025-10", "Oct 25", 79, 78, 78, 86, 5_450_000, None, True),
        ("2025-11", "Nov 25", 81, 82, 78, 86, 5_750_000, None, True),
        ("2025-12", "Dec 25", 82, 84, 78, 86, 6_050_000, None, True),
        ("2026-01", "Jan 26", 83, 85, 78, 86, 6_300_000, None, True),
        ("2026-02", "Feb 26", 82, 84, 78, 86, 6_450_000, None, True),
        ("2026-03", "Mar 26", 83, 85, 78, 86, 6_600_000, None, True),
        ("2026-04", "Apr 26", 84, 86, 78, 86, 6_700_000, None, True),
        ("2026-05", "May 26", 83, 85, 78, 86, 6_750_000, None, True),
        ("2026-06", "Jun 26", 84, 86, 78, 86, 6_800_000, None, True),
    ]
    return pd.DataFrame(
        rows,
        columns=[
            "month",
            "label",
            "adoption_rate",
            "performance_rate",
            "expected_min",
            "expected_max",
            "cumulative_value",
            "outlier_id",
            "post_intervention",
        ],
    )


def get_outliers_df() -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "outlier_id": DEFAULT_OUTLIER_ID,
                "period": "2025-08",
                "period_label": "Aug 2025",
                "market": "Midwest Region",
                "product": "Electronics Distribution",
                "metric_label": "Performance rate",
                "metric_value": 61,
                "expected_min": 78,
                "expected_max": 86,
                "severity": "High",
                "likely_driver": (
                    "Elevated override behavior concentrated in the selected "
                    "market/product segment; recommendation adoption and realized "
                    "performance fell outside the expected range."
                ),
                "intervention_id": "int-mw-2509",
            }
        ]
    )


def get_interventions_df() -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "intervention_id": "int-mw-2509",
                "outlier_id": DEFAULT_OUTLIER_ID,
                "action_taken": "Recommendation parameter review and override-reason capture",
                "status": "Closed",
                "owner": "Demand Planning Operations",
                "description": (
                    "Reviewed recommendation parameters for the affected segment and "
                    "implemented structured override-reason capture to improve model "
                    "feedback loops."
                ),
                "date": "2025-09-15",
            }
        ]
    )


def get_improvements_df() -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "improvement_id": "imp-mw-2509",
                "intervention_id": "int-mw-2509",
                "adoption_before": 74,
                "adoption_after": 83,
                "performance_before": 61,
                "performance_after": 85,
                "incremental_value": 1_200_000,
                "cumulative_value": 6_800_000,
            }
        ]
    )


def get_outlier_by_id(outlier_id: str) -> pd.Series | None:
    df = get_outliers_df()
    match = df[df["outlier_id"] == outlier_id]
    if match.empty:
        return None
    return match.iloc[0]


def get_intervention_for_outlier(outlier_id: str) -> pd.Series | None:
    outlier = get_outlier_by_id(outlier_id)
    if outlier is None:
        return None
    df = get_interventions_df()
    match = df[df["intervention_id"] == outlier["intervention_id"]]
    if match.empty:
        return None
    return match.iloc[0]


def get_improvement_for_intervention(intervention_id: str) -> pd.Series | None:
    df = get_improvements_df()
    match = df[df["intervention_id"] == intervention_id]
    if match.empty:
        return None
    return match.iloc[0]


def get_outlier_options() -> list[tuple[str, str]]:
    df = get_outliers_df()
    return list(zip(df["outlier_id"], df["period_label"] + " · " + df["market"]))
