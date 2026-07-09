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
    fig = make_subplots(specs=[[{"secondary_y": False}]])

    fig.add_trace(
        go.Scatter(
            x=trends["label"],
            y=trends["expected_max"],
            mode="lines",
            line=dict(width=0),
            showlegend=False,
            hoverinfo="skip",
        )
    )
    fig.add_trace(
        go.Scatter(
            x=trends["label"],
            y=trends["expected_min"],
            mode="lines",
            line=dict(width=0),
            fill="tonexty",
            fillcolor=COLORS["band"],
            name="Expected range",
            hovertemplate="Expected %{y:.0f}%<extra></extra>",
        )
    )

    fig.add_trace(
        go.Scatter(
            x=trends["label"],
            y=trends["adoption_rate"],
            mode="lines+markers",
            name="Adoption rate",
            line=dict(color=COLORS["blue"], width=2),
            marker=dict(size=5),
            hovertemplate="Adoption %{y:.0f}%<extra></extra>",
        )
    )
    fig.add_trace(
        go.Scatter(
            x=trends["label"],
            y=trends["performance_rate"],
            mode="lines+markers",
            name="Performance rate",
            line=dict(color=COLORS["orange"], width=2),
            marker=dict(size=5),
            hovertemplate="Performance %{y:.0f}%<extra></extra>",
        )
    )

    outlier_rows = trends[trends["outlier_id"].notna()]
    if not outlier_rows.empty:
        fig.add_trace(
            go.Scatter(
                x=outlier_rows["label"],
                y=outlier_rows["performance_rate"],
                mode="markers",
                name="Outlier",
                marker=dict(
                    size=11,
                    color="#ffffff",
                    line=dict(color=COLORS["orange"], width=2.5),
                    symbol="circle",
                ),
                hovertemplate="Exception month<extra></extra>",
            )
        )

    if selected_month:
        selected = trends[trends["month"] == selected_month]
        if not selected.empty:
            fig.add_vline(
                x=selected.iloc[0]["label"],
                line_width=1,
                line_dash="dot",
                line_color="#4a4a4a",
            )

    intervention = trends[trends["month"] == intervention_month]
    if not intervention.empty:
        fig.add_vline(
            x=intervention.iloc[0]["label"],
            line_width=1,
            line_color="#9a9a9a",
        )
        fig.add_annotation(
            x=intervention.iloc[0]["label"],
            y=1.04,
            yref="paper",
            text="Intervention",
            showarrow=False,
            font=dict(size=10, color="#6b6b6b"),
        )

    fig.update_layout(
        height=320,
        margin=dict(l=12, r=12, t=28, b=36),
        plot_bgcolor="#ffffff",
        paper_bgcolor="#ffffff",
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="left",
            x=0,
            font=dict(size=10),
        ),
        hovermode="x unified",
        xaxis=dict(
            title="",
            tickfont=dict(size=9, color=COLORS["gray"]),
            showgrid=False,
            linecolor=COLORS["border"],
        ),
        yaxis=dict(
            title="Rate (%)",
            tickfont=dict(size=9, color=COLORS["gray"]),
            gridcolor="#ececea",
            range=[50, 92],
            linecolor=COLORS["border"],
        ),
    )

    return fig
