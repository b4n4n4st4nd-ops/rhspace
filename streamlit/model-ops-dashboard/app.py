"""Predictive Model Performance & Impact — Streamlit portfolio demo."""

from __future__ import annotations

import pandas as pd
import streamlit as st

from charts.trend_chart import build_trend_chart
from components.detail_panels import (
    render_exception_panel,
    render_improvement_panel,
    render_intervention_panel,
)
from components.kpi_row import render_kpi_card
from components.styles import REPORT_CSS
from data.fixtures import (
    DEFAULT_OUTLIER_ID,
    get_improvement_for_intervention,
    get_intervention_for_outlier,
    get_kpis,
    get_meta,
    get_outlier_by_id,
    get_outlier_options,
    get_trends_df,
)

st.set_page_config(
    page_title="Model Ops Executive Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(REPORT_CSS, unsafe_allow_html=True)

meta = get_meta()
trends = get_trends_df()
outlier_options = get_outlier_options()
option_ids = [item[0] for item in outlier_options]
option_labels = {item[0]: item[1] for item in outlier_options}

if "selected_outlier_id" not in st.session_state:
    st.session_state.selected_outlier_id = DEFAULT_OUTLIER_ID

st.markdown(
    f"""
    <div class="report-header">
      <h1>{meta['title']}</h1>
      <p class="subtitle">{meta['subtitle']}</p>
      <p class="meta">{meta['company']} · Refreshed {meta['last_refreshed']} · {meta['disclaimer']}</p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown('<div class="report-canvas">', unsafe_allow_html=True)

st.markdown('<p class="section-title">Executive KPI Summary</p>', unsafe_allow_html=True)
kpi_cols = st.columns(6)
for col, kpi in zip(kpi_cols, get_kpis()):
    with col:
        st.markdown(render_kpi_card(kpi), unsafe_allow_html=True)

st.markdown('<p class="section-title">Adoption & Performance</p>', unsafe_allow_html=True)

chart_col, control_col = st.columns([4, 1])
with control_col:
    st.markdown('<p class="section-title">Exception focus</p>', unsafe_allow_html=True)
    selected_outlier_id = st.selectbox(
        "Selected exception",
        options=option_ids,
        index=option_ids.index(st.session_state.selected_outlier_id),
        format_func=lambda value: option_labels[value],
        key="outlier_selector",
        label_visibility="collapsed",
    )
    st.session_state.selected_outlier_id = selected_outlier_id
    st.caption("Select the highlighted outlier to walk through the decision-support loop.")

outlier = get_outlier_by_id(st.session_state.selected_outlier_id)
selected_month = outlier["period"] if outlier is not None else None

with chart_col:
    fig = build_trend_chart(trends, selected_month=selected_month)
    selection = st.plotly_chart(
        fig,
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

intervention = (
    get_intervention_for_outlier(st.session_state.selected_outlier_id)
    if st.session_state.selected_outlier_id
    else None
)
improvement = (
    get_improvement_for_intervention(intervention["intervention_id"])
    if intervention is not None
    else None
)

st.markdown('<p class="section-title">Decision-support loop</p>', unsafe_allow_html=True)
detail_cols = st.columns(3)

with detail_cols[0]:
    if outlier is not None:
        st.markdown(render_exception_panel(outlier), unsafe_allow_html=True)
    else:
        st.info("Select an exception to inspect context.")

with detail_cols[1]:
    if intervention is not None:
        st.markdown(render_intervention_panel(intervention), unsafe_allow_html=True)
    else:
        st.info("No intervention linked to the selected exception.")

with detail_cols[2]:
    if improvement is not None:
        st.markdown(render_improvement_panel(improvement), unsafe_allow_html=True)
    else:
        st.info("Improvement metrics appear after an intervention is recorded.")

st.markdown("</div>", unsafe_allow_html=True)

st.caption(
    "Portfolio demonstration of executive reporting, model transparency, and human-in-the-loop "
    "decision support using fictional Northwind Analytics data."
)
