"""Shared UI helpers."""

from __future__ import annotations

from typing import Any

import pandas as pd
import streamlit as st

from components.styles import PRODUCT_CSS
from data.loaders import load_all, product_meta


def inject_styles() -> None:
    st.markdown(PRODUCT_CSS, unsafe_allow_html=True)


def render_header(page_name: str) -> None:
    meta = product_meta()
    st.markdown(
        f"""
        <div class="tsi-header">
          <p class="tsi-brand">{meta['product']}</p>
          <p class="tsi-tagline">{meta['tagline']} · <span class="tsi-atypical">{meta['brand']}</span> demonstration</p>
          <p class="tsi-meta">{page_name} · Synthetic production-model intelligence demo · Not real financial results</p>
        </div>
        """,
        unsafe_allow_html=True,
    )


def kpi_card(label: str, value: str, subtext: str = "") -> str:
    return f"""
    <div class="kpi-card">
      <div class="kpi-label">{label}</div>
      <div class="kpi-value">{value}</div>
      <p class="kpi-subtext">{subtext}</p>
    </div>
    """


def fmt_pct(value: float | None, digits: int = 1) -> str:
    if value is None or pd.isna(value):
        return "—"
    return f"{value * 100:.{digits}f}%"


def fmt_money(value: float | None, digits: int = 0) -> str:
    if value is None or pd.isna(value):
        return "—"
    return f"${value:,.{digits}f}"


def fmt_int(value: float | int | None) -> str:
    if value is None or pd.isna(value):
        return "—"
    return f"{int(value):,}"


def disclosure() -> None:
    meta = product_meta()
    st.markdown(f'<p class="disclosure">{meta["disclosure"]}</p>', unsafe_allow_html=True)


def init_filter_state(data: dict[str, pd.DataFrame]) -> None:
    months = sorted(data["monthly_kpis"]["run_month"].unique().tolist())
    if "filter_months" not in st.session_state:
        st.session_state.filter_months = (months[0], months[-1])
    if "filter_model_version" not in st.session_state:
        st.session_state.filter_model_version = "All"
    if "filter_campaign" not in st.session_state:
        st.session_state.filter_campaign = "All"
    if "filter_region" not in st.session_state:
        st.session_state.filter_region = "All"
    if "filter_market_type" not in st.session_state:
        st.session_state.filter_market_type = "All"
    if "filter_segment" not in st.session_state:
        st.session_state.filter_segment = "All"
    if "filter_execution" not in st.session_state:
        st.session_state.filter_execution = "All"
    if "selected_outlier_month" not in st.session_state:
        outliers = data["statistical_outliers"]
        st.session_state.selected_outlier_month = (
            outliers.iloc[0]["timestamp"][:7].replace("-", "")  # placeholder
            if len(outliers)
            else None
        )
        if len(outliers):
            run = data["model_runs"]
            match = run[run["run_id"] == outliers.iloc[0]["run_id"]]
            st.session_state.selected_outlier_month = (
                match.iloc[0]["run_month"] if len(match) else months[min(8, len(months) - 1)]
            )


def render_global_filters(data: dict[str, pd.DataFrame]) -> dict[str, Any]:
    init_filter_state(data)
    months = sorted(data["monthly_kpis"]["run_month"].unique().tolist())
    decisions = data["decisions"]

    with st.sidebar:
        st.markdown("### Filters")
        start, end = st.select_slider(
            "Date range",
            options=months,
            value=st.session_state.filter_months,
        )
        st.session_state.filter_months = (start, end)
        st.session_state.filter_model_version = st.selectbox(
            "Model version",
            ["All", "v1.0", "v1.1"],
            index=["All", "v1.0", "v1.1"].index(st.session_state.filter_model_version),
        )
        campaigns = ["All"] + sorted(decisions["recommended_campaign"].dropna().unique().tolist())
        st.session_state.filter_campaign = st.selectbox(
            "Campaign",
            campaigns,
            index=campaigns.index(st.session_state.filter_campaign)
            if st.session_state.filter_campaign in campaigns
            else 0,
        )
        regions = ["All"] + sorted(decisions["region"].dropna().unique().tolist())
        st.session_state.filter_region = st.selectbox(
            "U.S. region",
            regions,
            index=regions.index(st.session_state.filter_region)
            if st.session_state.filter_region in regions
            else 0,
        )
        markets = ["All"] + sorted(decisions["market_type"].dropna().unique().tolist())
        st.session_state.filter_market_type = st.selectbox(
            "Market type",
            markets,
            index=markets.index(st.session_state.filter_market_type)
            if st.session_state.filter_market_type in markets
            else 0,
        )
        segments = ["All"] + sorted(decisions["segment"].dropna().unique().tolist())
        st.session_state.filter_segment = st.selectbox(
            "Customer segment",
            segments,
            index=segments.index(st.session_state.filter_segment)
            if st.session_state.filter_segment in segments
            else 0,
        )
        executions = ["All"] + sorted(decisions["execution_class"].dropna().unique().tolist())
        st.session_state.filter_execution = st.selectbox(
            "Adoption classification",
            executions,
            index=executions.index(st.session_state.filter_execution)
            if st.session_state.filter_execution in executions
            else 0,
        )
        st.caption("Filters persist across views in this session.")

    return {
        "start": start,
        "end": end,
        "model_version": st.session_state.filter_model_version,
        "campaign": st.session_state.filter_campaign,
        "region": st.session_state.filter_region,
        "market_type": st.session_state.filter_market_type,
        "segment": st.session_state.filter_segment,
        "execution": st.session_state.filter_execution,
    }


def apply_filters(
    data: dict[str, pd.DataFrame], filters: dict[str, Any]
) -> dict[str, pd.DataFrame]:
    months = sorted(data["monthly_kpis"]["run_month"].unique().tolist())
    start_i = months.index(filters["start"])
    end_i = months.index(filters["end"])
    keep_months = set(months[start_i : end_i + 1])

    monthly = data["monthly_kpis"][data["monthly_kpis"]["run_month"].isin(keep_months)].copy()
    decisions = data["decisions"][data["decisions"]["run_month"].isin(keep_months)].copy()
    runs = data["model_runs"][data["model_runs"]["run_month"].isin(keep_months)].copy()

    if filters["model_version"] != "All":
        monthly = monthly[monthly["model_version"] == filters["model_version"]]
        decisions = decisions[decisions["model_version"] == filters["model_version"]]
        runs = runs[runs["model_version"] == filters["model_version"]]
    if filters["campaign"] != "All":
        decisions = decisions[decisions["recommended_campaign"] == filters["campaign"]]
    if filters["region"] != "All":
        decisions = decisions[decisions["region"] == filters["region"]]
    if filters["market_type"] != "All":
        decisions = decisions[decisions["market_type"] == filters["market_type"]]
    if filters["segment"] != "All":
        decisions = decisions[decisions["segment"] == filters["segment"]]
    if filters["execution"] != "All":
        decisions = decisions[decisions["execution_class"] == filters["execution"]]

    out = dict(data)
    out["monthly_kpis"] = monthly
    out["decisions"] = decisions
    out["model_runs"] = runs
    return out


@st.cache_data(show_spinner="Loading Transparensea demo data…")
def get_data() -> dict[str, pd.DataFrame]:
    return load_all()
