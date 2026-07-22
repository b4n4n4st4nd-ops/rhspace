"""Transparensea — Model Transparency, Adoption & Impact.

A.Typical demonstration for the Lab.
"""

from __future__ import annotations

import streamlit as st

from components.ui import apply_filters, get_data, inject_styles, render_global_filters
from views.pages import (
    render_adoption,
    render_conversion_revenue,
    render_exceptions,
    render_improvement_history,
    render_input_transparency,
    render_insights_actions,
    render_model_details,
    render_overview,
    render_recommendations,
)

st.set_page_config(
    page_title="Transparensea · A.Typical",
    page_icon="🌊",
    layout="wide",
    initial_sidebar_state="expanded",
)

inject_styles()

PAGES = {
    "Model Overview": render_overview,
    "Input Transparency": render_input_transparency,
    "Recommendations": render_recommendations,
    "Adoption": render_adoption,
    "Conversion & Revenue": render_conversion_revenue,
    "Exceptions & Outliers": render_exceptions,
    "Insights & Actions": render_insights_actions,
    "Improvement History": render_improvement_history,
    "Model Details": render_model_details,
}

try:
    data = get_data()
except FileNotFoundError as exc:
    st.error(str(exc))
    st.stop()

filters = render_global_filters(data)
filtered = apply_filters(data, filters)

with st.sidebar:
    st.markdown("---")
    page = st.radio("Navigate", list(PAGES.keys()), index=0)
    st.caption("Transparensea product demonstration")

PAGES[page](filtered)
