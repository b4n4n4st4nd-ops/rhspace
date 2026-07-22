from __future__ import annotations

import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from components.styles import COLORS


def build_trend_chart(
    trends: pd.DataFrame,
    selected_month: str | None,
    intervention_month: str = "2025-10",
) -> go.Figure:
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    fig.add_trace(
        go.Scatter(
            x=trends["label"], y=trends["expected_max"], mode="lines",
            line=dict(width=0), showlegend=False, hoverinfo="skip",
        ), secondary_y=False,
    )
    fig.add_trace(
        go.Scatter(
            x=trends["label"], y=trends["expected_min"], mode="lines",
            line=dict(width=0), fill="tonexty", fillcolor=COLORS["band"],
            name="Expected adoption range", hovertemplate="Expected %{y:.0f}%<extra></extra>",
        ), secondary_y=False,
    )
    fig.add_trace(
        go.Scatter(
            x=trends["label"], y=trends["adoption_rate"], mode="lines+markers",
            name="Campaign adoption", line=dict(color=COLORS["blue"], width=2.4),
            marker=dict(size=5), hovertemplate="Adoption %{y:.0f}%<extra></extra>",
        ), secondary_y=False,
    )
    fig.add_trace(
        go.Scatter(
            x=trends["label"], y=trends["conversion_rate"], mode="lines+markers",
            name="Conversion rate", line=dict(color=COLORS["orange"], width=2.2),
            marker=dict(size=5), hovertemplate="Conversion %{y:.1f}%<extra></extra>",
        ), secondary_y=True,
    )

    outlier_rows = trends[trends["outlier_id"].notna()]
    if not outlier_rows.empty:
        fig.add_trace(
            go.Scatter(
                x=outlier_rows["label"], y=outlier_rows["adoption_rate"], mode="markers",
                name="Statistical outlier", marker=dict(size=12, color="#ffffff", line=dict(color=COLORS["orange"], width=3)),
                hovertemplate="Adoption outlier<extra></extra>",
            ), secondary_y=False,
        )

    if selected_month:
        selected = trends[trends["month"] == selected_month]
        if not selected.empty:
            fig.add_vline(x=selected.iloc[0]["label"], line_width=1, line_dash="dot", line_color="#4a4a4a")

    intervention = trends[trends["month"] == intervention_month]
    if not intervention.empty:
        fig.add_vline(x=intervention.iloc[0]["label"], line_width=1, line_color="#81766b")
        fig.add_annotation(x=intervention.iloc[0]["label"], y=1.05, yref="paper", text="Workflow + model action", showarrow=False, font=dict(size=10, color="#655d55"))

    fig.update_layout(
        height=350, margin=dict(l=12, r=12, t=32, b=36),
        plot_bgcolor="#ffffff", paper_bgcolor="#ffffff", hovermode="x unified",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0, font=dict(size=10)),
        xaxis=dict(tickfont=dict(size=9, color=COLORS["gray"]), showgrid=False, linecolor=COLORS["border"]),
    )
    fig.update_yaxes(title_text="Adoption (%)", range=[40, 90], tickfont=dict(size=9, color=COLORS["gray"]), gridcolor="#ece8e2", secondary_y=False)
    fig.update_yaxes(title_text="Conversion (%)", range=[2, 7], tickfont=dict(size=9, color=COLORS["gray"]), showgrid=False, secondary_y=True)
    return fig
