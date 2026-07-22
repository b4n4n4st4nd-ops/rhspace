"""Transparensea — production model transparency, adoption, and impact demo."""

from __future__ import annotations

import pandas as pd
import plotly.express as px
import streamlit as st

from charts.trend_chart import build_trend_chart
from components.detail_panels import (
    render_action_panel,
    render_exception_panel,
    render_improvement_panel,
    render_insight_panel,
)
from components.kpi_row import render_kpi_card
from components.styles import COLORS, REPORT_CSS
from data.fixtures import (
    DEFAULT_OUTLIER_ID,
    get_action_for_insight,
    get_campaign_performance_df,
    get_feature_influence_df,
    get_improvement_for_action,
    get_insight_for_outlier,
    get_kpis,
    get_meta,
    get_outlier_by_id,
    get_outlier_options,
    get_trends_df,
)

st.set_page_config(
    page_title="Transparensea · A.Typical",
    page_icon="◌",
    layout="wide",
    initial_sidebar_state="collapsed",
)
st.markdown(REPORT_CSS, unsafe_allow_html=True)

meta = get_meta()
trends = get_trends_df()
campaigns = get_campaign_performance_df()
features = get_feature_influence_df().sort_values("influence")
outlier_options = get_outlier_options()
option_ids = [item[0] for item in outlier_options]
option_labels = {item[0]: item[1] for item in outlier_options}

if "selected_outlier_id" not in st.session_state:
    st.session_state.selected_outlier_id = DEFAULT_OUTLIER_ID

st.markdown(
    f"""
    <div class="report-header">
      <div class="brand-lockup"><span class="product-mark">◌</span><div><h1>{meta['title']}</h1><p class="eyebrow">{meta['company']} MARKETING INTELLIGENCE</p></div></div>
      <p class="subtitle">{meta['subtitle']}</p>
      <p class="meta">{meta['model']} · Refreshed {meta['last_refreshed']}</p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown('<div class="report-canvas">', unsafe_allow_html=True)

st.markdown('<p class="section-title">Model value overview</p>', unsafe_allow_html=True)
kpi_cols = st.columns(6)
for col, kpi in zip(kpi_cols, get_kpis()):
    with col:
        st.markdown(render_kpi_card(kpi), unsafe_allow_html=True)

st.markdown('<p class="section-title section-space">Adoption, conversion, and intervention history</p>', unsafe_allow_html=True)
chart_col, focus_col = st.columns([4, 1])

with focus_col:
    selected_outlier_id = st.selectbox(
        "Selected outlier",
        options=option_ids,
        index=option_ids.index(st.session_state.selected_outlier_id),
        format_func=lambda value: option_labels[value],
        key="outlier_selector",
    )
    st.session_state.selected_outlier_id = selected_outlier_id
    st.markdown(
        "<div class='context-note'><strong>Reading the chart</strong><br>Campaign adoption is compared with conversion rate across 24 scheduled model runs. The marked intervention combines a business workflow change with a model review.</div>",
        unsafe_allow_html=True,
    )

outlier = get_outlier_by_id(st.session_state.selected_outlier_id)
selected_month = outlier["period"] if outlier is not None else None

with chart_col:
    selection = st.plotly_chart(
        build_trend_chart(trends, selected_month=selected_month),
        use_container_width=True,
        on_select="rerun",
        selection_mode="points",
        key="trend_chart",
    )
    if selection and selection.selection and selection.selection.get("points"):
        point_index = selection.selection["points"][0].get("point_index")
        if point_index is not None and point_index < len(trends):
            clicked = trends.iloc[point_index]
            if pd.notna(clicked["outlier_id"]):
                st.session_state.selected_outlier_id = clicked["outlier_id"]

st.markdown('<p class="section-title section-space">Recommendation adoption and business impact</p>', unsafe_allow_html=True)
left, right = st.columns([3, 2])
with left:
    campaign_fig = px.bar(
        campaigns,
        x="campaign",
        y="conversion_rate",
        color="decision",
        barmode="group",
        text_auto=".1f",
        labels={"campaign": "", "conversion_rate": "Conversion rate (%)", "decision": "Business decision"},
        color_discrete_map={"Adopted": COLORS["blue"], "Modified": COLORS["orange"], "Ignored": "#9a8f84"},
    )
    campaign_fig.update_layout(height=330, margin=dict(l=10, r=10, t=20, b=55), plot_bgcolor="#ffffff", paper_bgcolor="#ffffff", legend=dict(orientation="h", y=1.05), font=dict(size=10))
    campaign_fig.update_xaxes(tickangle=-18, linecolor=COLORS["border"])
    campaign_fig.update_yaxes(gridcolor="#ece8e2", linecolor=COLORS["border"])
    st.plotly_chart(campaign_fig, use_container_width=True)

with right:
    feature_fig = px.bar(
        features,
        x="influence",
        y="feature",
        orientation="h",
        text="method",
        labels={"influence": "Normalized influence", "feature": ""},
    )
    feature_fig.update_traces(marker_color=COLORS["blue"], textposition="outside", textfont_size=9)
    feature_fig.update_layout(height=330, margin=dict(l=10, r=60, t=20, b=40), plot_bgcolor="#ffffff", paper_bgcolor="#ffffff", showlegend=False, font=dict(size=10))
    feature_fig.update_xaxes(range=[0, 1.05], gridcolor="#ece8e2", linecolor=COLORS["border"])
    feature_fig.update_yaxes(linecolor=COLORS["border"])
    st.plotly_chart(feature_fig, use_container_width=True)

insight = get_insight_for_outlier(st.session_state.selected_outlier_id) if outlier is not None else None
action = get_action_for_insight(insight["insight_id"]) if insight is not None else None
improvement = get_improvement_for_action(action["action_id"]) if action is not None else None

st.markdown('<p class="section-title section-space">Automated intelligence and improvement loop</p>', unsafe_allow_html=True)
loop_cols = st.columns(4)
with loop_cols[0]:
    st.markdown(render_exception_panel(outlier), unsafe_allow_html=True)
with loop_cols[1]:
    st.markdown(render_insight_panel(insight), unsafe_allow_html=True)
with loop_cols[2]:
    st.markdown(render_action_panel(action), unsafe_allow_html=True)
with loop_cols[3]:
    st.markdown(render_improvement_panel(improvement), unsafe_allow_html=True)

st.markdown("</div>", unsafe_allow_html=True)
st.caption(meta["disclaimer"])
