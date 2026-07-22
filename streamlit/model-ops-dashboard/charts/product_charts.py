"""Shared Plotly chart builders."""

from __future__ import annotations

import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from components.styles import COLORS


def trend_lines(monthly: pd.DataFrame) -> go.Figure:
    fig = make_subplots(specs=[[{"secondary_y": True}]])
    fig.add_trace(
        go.Scatter(
            x=monthly["run_month"],
            y=monthly["campaign_choice_adoption"],
            name="Campaign-choice adoption",
            line=dict(color=COLORS["adoption"], width=2.5),
        ),
        secondary_y=False,
    )
    fig.add_trace(
        go.Scatter(
            x=monthly["run_month"],
            y=monthly["conversion_rate"],
            name="Conversion rate",
            line=dict(color=COLORS["conversion"], width=2),
        ),
        secondary_y=False,
    )
    fig.add_trace(
        go.Bar(
            x=monthly["run_month"],
            y=monthly["net_incremental_revenue"],
            name="Net incremental revenue",
            marker_color=COLORS["revenue"],
            opacity=0.35,
        ),
        secondary_y=True,
    )
    if "is_adoption_outlier" in monthly.columns:
        pts = monthly[monthly["is_adoption_outlier"]]
        if len(pts):
            fig.add_trace(
                go.Scatter(
                    x=pts["run_month"],
                    y=pts["campaign_choice_adoption"],
                    mode="markers",
                    name="Adoption outlier",
                    marker=dict(color=COLORS["outlier"], size=10, symbol="diamond"),
                ),
                secondary_y=False,
            )
    # Intervention markers around Dec 2025 / Jan 2026
    for month in ("2025-12", "2026-02"):
        if month in set(monthly["run_month"]):
            fig.add_vline(
                x=month,
                line_dash="dot",
                line_color=COLORS["intervention"],
            )
    fig.update_layout(
        height=340,
        margin=dict(l=20, r=20, t=30, b=20),
        paper_bgcolor=COLORS["panel"],
        plot_bgcolor=COLORS["panel"],
        legend=dict(orientation="h", y=1.12),
        font=dict(color=COLORS["ink"], size=11),
    )
    fig.update_yaxes(title_text="Rate", tickformat=".0%", secondary_y=False, gridcolor=COLORS["grid"])
    fig.update_yaxes(title_text="Net incr. revenue", secondary_y=True, gridcolor=COLORS["grid"])
    return fig


def control_chart(monthly: pd.DataFrame, kpi: str, limits: pd.DataFrame) -> go.Figure:
    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=monthly["run_month"],
            y=limits["value"],
            name=kpi,
            line=dict(color=COLORS["adoption"], width=2.4),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=monthly["run_month"],
            y=limits["center"],
            name="Centerline",
            line=dict(color=COLORS["ink"], width=1.2, dash="dash"),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=monthly["run_month"],
            y=limits["ucl"],
            name="UCL",
            line=dict(color=COLORS["sea"], width=1, dash="dot"),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=monthly["run_month"],
            y=limits["lcl"],
            name="LCL",
            line=dict(color=COLORS["sea"], width=1, dash="dot"),
            fill="tonexty",
            fillcolor=COLORS["band"],
        )
    )
    out = monthly[limits["outlier"].to_numpy()]
    if len(out):
        fig.add_trace(
            go.Scatter(
                x=out["run_month"],
                y=limits.loc[out.index, "value"],
                mode="markers",
                name="Outlier",
                marker=dict(color=COLORS["outlier"], size=11, symbol="x"),
            )
        )
    for month, label in [("2025-12", "Biz action"), ("2026-02", "v1.1")]:
        if month in set(monthly["run_month"]):
            fig.add_vline(x=month, line_dash="dot", line_color=COLORS["intervention"])
    fig.update_layout(
        height=360,
        margin=dict(l=20, r=20, t=20, b=20),
        paper_bgcolor=COLORS["panel"],
        plot_bgcolor=COLORS["panel"],
        legend=dict(orientation="h", y=1.12),
        yaxis=dict(tickformat=".0%", gridcolor=COLORS["grid"]),
        font=dict(color=COLORS["ink"], size=11),
    )
    return fig


def pareto_chart(pareto: pd.DataFrame, dimension: str) -> go.Figure:
    fig = make_subplots(specs=[[{"secondary_y": True}]])
    fig.add_trace(
        go.Bar(
            x=pareto[dimension].astype(str),
            y=pareto["misses"],
            name="Adoption misses",
            marker_color=COLORS["actual"],
        ),
        secondary_y=False,
    )
    fig.add_trace(
        go.Scatter(
            x=pareto[dimension].astype(str),
            y=pareto["cumulative"],
            name="Cumulative %",
            line=dict(color=COLORS["ocean"], width=2),
        ),
        secondary_y=True,
    )
    fig.update_layout(
        height=320,
        margin=dict(l=20, r=20, t=20, b=20),
        paper_bgcolor=COLORS["panel"],
        plot_bgcolor=COLORS["panel"],
        legend=dict(orientation="h", y=1.12),
        font=dict(color=COLORS["ink"], size=11),
    )
    fig.update_yaxes(title_text="Misses", secondary_y=False, gridcolor=COLORS["grid"])
    fig.update_yaxes(title_text="Cumulative", tickformat=".0%", secondary_y=True)
    return fig


def heatmap(decisions: pd.DataFrame) -> go.Figure:
    pivot = (
        decisions.assign(exact=decisions["actual_campaign"] == decisions["recommended_campaign"])
        .groupby(["segment", "recommended_campaign"])["exact"]
        .mean()
        .reset_index()
        .pivot(index="segment", columns="recommended_campaign", values="exact")
    )
    fig = go.Figure(
        data=go.Heatmap(
            z=pivot.values,
            x=list(pivot.columns),
            y=list(pivot.index),
            colorscale=[
                [0, "#f4f1ea"],
                [0.5, "#9ec5c5"],
                [1, "#1f4e5f"],
            ],
            zmin=0,
            zmax=1,
            colorbar=dict(tickformat=".0%"),
        )
    )
    fig.update_layout(
        height=340,
        margin=dict(l=20, r=20, t=20, b=20),
        paper_bgcolor=COLORS["panel"],
        plot_bgcolor=COLORS["panel"],
        font=dict(color=COLORS["ink"], size=11),
        title="Campaign-choice exact-match rate by segment",
    )
    return fig
