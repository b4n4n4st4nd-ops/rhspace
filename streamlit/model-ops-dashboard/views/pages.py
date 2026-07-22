"""Transparensea product views."""

from __future__ import annotations

import pandas as pd
import plotly.express as px
import streamlit as st

from analytics.adoption import ADOPTION_LABELS, decision_class_summary, pareto_gap, pchart_limits
from analytics.financials import aggregate_financials, methodology_markdown
from charts.product_charts import control_chart, heatmap, pareto_chart, trend_lines
from components.styles import COLORS
from components.ui import disclosure, fmt_int, fmt_money, fmt_pct, kpi_card, render_header


def _latest_insight(data: dict[str, pd.DataFrame]) -> pd.Series:
    return data["generated_insights"].iloc[0]


def render_overview(data: dict[str, pd.DataFrame]) -> None:
    render_header("Model Overview")
    monthly = data["monthly_kpis"]
    decisions = data["decisions"]
    insight = _latest_insight(data)
    actions = data["suggested_actions"]
    biz = actions[actions["category"] == "Business action"].iloc[0]
    mdl = actions[actions["category"] == "Model action"].iloc[0]
    latest = monthly.iloc[-1]
    version = data["model_versions"].loc[
        data["model_versions"]["status"] == "Production", "model_version"
    ].iloc[0]

    cols = st.columns(4)
    metrics = [
        ("Customers scored", fmt_int(monthly["customers_scored"].sum()), "Across selected runs"),
        ("Campaign-choice adoption", fmt_pct(latest["campaign_choice_adoption"]), "Latest month"),
        ("Conversion rate", fmt_pct(latest["conversion_rate"]), "Latest month"),
        ("Net incremental revenue", fmt_money(monthly["net_incremental_revenue"].sum()), "Selected window"),
    ]
    for col, (label, value, sub) in zip(cols, metrics):
        col.markdown(kpi_card(label, value, sub), unsafe_allow_html=True)

    cols2 = st.columns(4)
    metrics2 = [
        ("Production coverage", fmt_pct(latest["production_coverage"]), "Eligible processed"),
        ("Follow-up adoption", fmt_pct(latest["followup_adoption"]), "Latest month"),
        ("Estimated missed value", fmt_money(monthly["missed_value"].sum()), "Selected window"),
        ("Current model", version, data["model_versions"].loc[data["model_versions"]["model_version"] == version, "status"].iloc[0]),
    ]
    for col, (label, value, sub) in zip(cols2, metrics2):
        col.markdown(kpi_card(label, value, sub), unsafe_allow_html=True)

    st.markdown('<p class="section-title">24-month adoption, conversion, and value</p>', unsafe_allow_html=True)
    st.plotly_chart(trend_lines(monthly), use_container_width=True)

    left, right = st.columns([1.2, 1])
    with left:
        st.markdown('<p class="section-title">Active insight</p>', unsafe_allow_html=True)
        st.markdown(
            f"""
            <div class="panel">
              <h3>{insight['title']}</h3>
              <p class="field-value">{insight['automated_text']}</p>
              <span class="badge badge-high">{insight['status']} · {insight['evidence_strength']} evidence</span>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with right:
        st.markdown('<p class="section-title">Recommended actions</p>', unsafe_allow_html=True)
        st.markdown(
            f"""
            <div class="panel">
              <div class="field-label">Business action</div>
              <p class="field-value">{biz['human_reviewed_text']}</p>
              <div class="field-label">Model action</div>
              <p class="field-value">{mdl['human_reviewed_text']}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

    c1, c2, c3 = st.columns(3)
    with c1:
        st.markdown('<p class="section-title">Campaign mix (recommended)</p>', unsafe_allow_html=True)
        mix = decisions["recommended_campaign"].value_counts().reset_index()
        mix.columns = ["campaign", "count"]
        fig = px.bar(mix, x="campaign", y="count", color_discrete_sequence=[COLORS["recommend"]])
        fig.update_layout(height=260, margin=dict(l=10, r=10, t=10, b=10), paper_bgcolor=COLORS["panel"])
        st.plotly_chart(fig, use_container_width=True)
    with c2:
        st.markdown('<p class="section-title">Regional breakdown</p>', unsafe_allow_html=True)
        reg = decisions.groupby("region")["net_incremental_revenue"].sum().reset_index()
        fig = px.bar(reg, x="region", y="net_incremental_revenue", color_discrete_sequence=[COLORS["sea"]])
        fig.update_layout(height=260, margin=dict(l=10, r=10, t=10, b=10), paper_bgcolor=COLORS["panel"])
        st.plotly_chart(fig, use_container_width=True)
    with c3:
        st.markdown('<p class="section-title">Decision classifications</p>', unsafe_allow_html=True)
        cls = decisions["execution_class"].value_counts().reset_index()
        cls.columns = ["execution_class", "count"]
        fig = px.pie(
            cls,
            names="execution_class",
            values="count",
            color_discrete_sequence=[
                COLORS["ocean"],
                COLORS["accent"],
                COLORS["sea"],
                COLORS["lime"],
                "#b45309",
                COLORS["outlier"],
            ],
        )
        fig.update_layout(height=260, margin=dict(l=10, r=10, t=10, b=10), paper_bgcolor=COLORS["panel"])
        st.plotly_chart(fig, use_container_width=True)

    if len(data["statistical_outliers"]):
        ol = data["statistical_outliers"].iloc[0]
        st.info(f"Current outlier path: {ol['outlier_id']} — {ol['evidence']}")
    disclosure()


def render_input_transparency(data: dict[str, pd.DataFrame]) -> None:
    render_header("Input Transparency")
    feats = data["feature_dictionary"]
    infl = data["feature_influence"]
    decisions = data["decisions"]

    method = st.selectbox("Feature Influence method", ["Standardized coefficient", "Permutation importance"])
    version = st.selectbox("Model version", ["v1.0", "v1.1"])
    treatment = st.selectbox("Treatment model", ["New Season Edit", "Performance Collection", "Suppression"])
    view = infl[
        (infl["method"] == method)
        & (infl["model_version"] == version)
        & (infl["treatment"] == treatment)
    ].copy()
    view["abs_importance"] = view["importance"].abs()
    view = view.sort_values("abs_importance", ascending=False)

    st.markdown('<p class="section-title">Feature Influence ranking</p>', unsafe_allow_html=True)
    fig = px.bar(
        view.head(12),
        x="importance",
        y="feature",
        orientation="h",
        color="importance",
        color_continuous_scale=["#c45c26", "#f4f1ea", "#1f4e5f"],
    )
    fig.update_layout(height=380, yaxis={"categoryorder": "total ascending"}, paper_bgcolor=COLORS["panel"])
    st.plotly_chart(fig, use_container_width=True)

    st.markdown('<p class="section-title">Searchable feature table</p>', unsafe_allow_html=True)
    q = st.text_input("Search features", "")
    table = feats.merge(
        view[["feature", "importance", "method", "direction_note"]],
        on="feature",
        how="left",
    )
    if q:
        table = table[table["feature"].str.contains(q, case=False) | table["definition"].str.contains(q, case=False)]
    st.dataframe(table, use_container_width=True, hide_index=True)

    with st.expander("Methodology notes"):
        st.markdown(
            """
- **Standardized coefficient**: direction and relative magnitude inside a linear/logistic model on scaled numeric inputs. Not causation.
- **Permutation importance**: drop in predictive score when a feature is shuffled. Method-specific; not interchangeable with coefficients.
- Correlation with outcomes is shown separately and is not causal attribution.
            """
        )

    st.markdown('<p class="section-title">Customer-level example</p>', unsafe_allow_html=True)
    sample = decisions.sample(1, random_state=7).iloc[0]
    c1, c2 = st.columns(2)
    with c1:
        st.markdown(
            f"""
            <div class="panel">
              <h3>Inputs · {sample['customer_id']}</h3>
              <div class="field-label">Region / market</div><p class="field-value">{sample['region']} · {sample['market_type']}</p>
              <div class="field-label">Segment</div><p class="field-value">{sample['segment']}</p>
              <div class="field-label">Performance affinity</div><p class="field-value">{sample['performance_affinity']}</p>
              <div class="field-label">Lifestyle affinity</div><p class="field-value">{sample['lifestyle_affinity']}</p>
              <div class="field-label">Email engagement</div><p class="field-value">{sample['email_engagement']}</p>
              <div class="field-label">Recency (days)</div><p class="field-value">{sample['recency_days']}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with c2:
        st.markdown(
            f"""
            <div class="panel">
              <h3>Recommendation output</h3>
              <div class="field-label">Recommended campaign</div><p class="field-value">{sample['recommended_campaign']}</p>
              <div class="field-label">Priority</div><p class="field-value">{sample['priority_score']:.2f}</p>
              <div class="field-label">Predicted conversion</div><p class="field-value">{fmt_pct(sample['predicted_conversion'])}</p>
              <div class="field-label">Estimated uplift</div><p class="field-value">{fmt_pct(sample['estimated_uplift'])}</p>
              <div class="field-label">Estimated net value</div><p class="field-value">{fmt_money(sample['estimated_net_value'], 2)}</p>
              <p class="field-value">Natural-language: Higher performance affinity increases likelihood of a Performance Collection recommendation under the selected treatment model ({method}).</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
    disclosure()


def render_recommendations(data: dict[str, pd.DataFrame]) -> None:
    render_header("Recommendations")
    d = data["decisions"]
    contact = d[d["recommended_campaign"] != "Suppression"]
    cols = st.columns(4)
    for col, item in zip(
        cols,
        [
            ("Total recommendations", fmt_int(len(d))),
            ("Recommended messages", fmt_int(len(contact))),
            ("Suppressions", fmt_int((d["recommended_campaign"] == "Suppression").sum())),
            ("Recommended follow-ups", fmt_int(d["recommend_followup"].sum())),
        ],
    ):
        col.markdown(kpi_card(item[0], item[1]), unsafe_allow_html=True)

    c1, c2 = st.columns(2)
    with c1:
        mix = d["recommended_campaign"].value_counts().reset_index()
        mix.columns = ["campaign", "audience"]
        fig = px.bar(mix, x="campaign", y="audience", color_discrete_sequence=[COLORS["recommend"]])
        fig.update_layout(height=300, paper_bgcolor=COLORS["panel"], title="Recommended audience sizes")
        st.plotly_chart(fig, use_container_width=True)
    with c2:
        fig = px.histogram(contact, x="priority_score", nbins=30, color_discrete_sequence=[COLORS["sea"]])
        fig.update_layout(height=300, paper_bgcolor=COLORS["panel"], title="Priority-score distribution")
        st.plotly_chart(fig, use_container_width=True)

    st.markdown(
        f"**Expected conversion (mean):** {fmt_pct(d['predicted_conversion'].mean())} · "
        f"**Expected uplift:** {fmt_pct(d['estimated_uplift'].mean())} · "
        f"**Expected net value sum:** {fmt_money(d['estimated_net_value'].sum())}"
    )

    st.markdown('<p class="section-title">Lowest-grain investigation</p>', unsafe_allow_html=True)
    page_size = st.selectbox("Rows per page", [25, 50, 100], index=0)
    cols_show = [
        "decision_id",
        "customer_id",
        "run_month",
        "region",
        "market_type",
        "segment",
        "performance_affinity",
        "lifestyle_affinity",
        "recommended_campaign",
        "priority_score",
        "predicted_conversion",
        "estimated_uplift",
        "estimated_net_value",
        "actual_campaign",
        "execution_class",
        "converted",
        "gross_revenue",
    ]
    sample = d[cols_show].sort_values("priority_score", ascending=False)
    max_page = max(1, (len(sample) - 1) // page_size + 1)
    page = st.number_input("Page", min_value=1, max_value=max_page, value=1)
    start = (page - 1) * page_size
    st.dataframe(sample.iloc[start : start + page_size], use_container_width=True, hide_index=True)
    disclosure()


def render_adoption(data: dict[str, pd.DataFrame]) -> None:
    render_header("Adoption")
    monthly = data["monthly_kpis"].reset_index(drop=True)
    decisions = data["decisions"]

    kpi = st.selectbox(
        "Adoption KPI",
        list(ADOPTION_LABELS.keys()),
        format_func=lambda k: ADOPTION_LABELS[k],
        index=list(ADOPTION_LABELS.keys()).index("campaign_choice_adoption"),
    )
    n = monthly["recommended_messages"] if kpi in (
        "campaign_choice_adoption",
        "message_volume_adoption",
        "customer_selection_adoption",
        "priority_adoption",
    ) else monthly["customers_scored"]
    if kpi in ("campaign_choice_adoption", "followup_adoption", "suppression_adoption", "customer_selection_adoption", "priority_adoption", "production_coverage", "message_volume_adoption"):
        limits = pchart_limits(monthly[kpi].fillna(monthly[kpi].mean()), n)
        method_note = "p-chart (binomial proportion) with 3σ limits weighted by opportunity volume."
    else:
        limits = pchart_limits(monthly[kpi].fillna(0), n)
        method_note = "Control limits shown with proportion methodology; verify metric type before operational use."

    st.caption(f"Control method: {method_note}")
    st.plotly_chart(control_chart(monthly, ADOPTION_LABELS[kpi], limits), use_container_width=True)

    outlier_months = monthly.loc[limits["outlier"].to_numpy(), "run_month"].tolist()
    if not outlier_months:
        outlier_months = monthly.nsmallest(3, "campaign_choice_adoption")["run_month"].tolist()
    selected_month = st.selectbox(
        "Outlier / focus month (updates Pareto)",
        options=monthly["run_month"].tolist(),
        index=monthly["run_month"].tolist().index(outlier_months[0])
        if outlier_months[0] in monthly["run_month"].tolist()
        else 0,
    )
    st.session_state.selected_outlier_month = selected_month

    dim = st.selectbox(
        "Pareto dimension",
        ["region", "state", "market_type", "segment", "primary_channel", "model_version", "recommended_campaign"],
        index=0,
    )
    month_decisions = decisions[decisions["run_month"] == selected_month]
    pareto = pareto_gap(month_decisions, dim)
    st.plotly_chart(pareto_chart(pareto, dim), use_container_width=True)

    contributor = st.selectbox("Drill into contributor", pareto[dim].astype(str).tolist())
    drill = month_decisions[month_decisions[dim].astype(str) == contributor]
    st.markdown(f"**Records for {dim}={contributor} in {selected_month}:** {len(drill):,}")
    st.dataframe(
        drill[
            [
                "decision_id",
                "customer_id",
                "segment",
                "region",
                "recommended_campaign",
                "actual_campaign",
                "execution_class",
                "converted",
                "net_incremental_revenue",
            ]
        ].head(100),
        use_container_width=True,
        hide_index=True,
    )

    st.plotly_chart(heatmap(decisions), use_container_width=True)

    c1, c2 = st.columns(2)
    with c1:
        vol = monthly[["run_month", "recommended_messages", "messages_sent"]].melt(
            "run_month", var_name="series", value_name="volume"
        )
        fig = px.line(vol, x="run_month", y="volume", color="series", color_discrete_sequence=[COLORS["recommend"], COLORS["actual"]])
        fig.update_layout(height=300, paper_bgcolor=COLORS["panel"], title="Recommended vs actual message volume")
        st.plotly_chart(fig, use_container_width=True)
    with c2:
        summary = decision_class_summary(decisions)
        st.dataframe(summary, use_container_width=True, hide_index=True)
    disclosure()


def render_conversion_revenue(data: dict[str, pd.DataFrame]) -> None:
    render_header("Conversion & Revenue")
    monthly = data["monthly_kpis"]
    decisions = data["decisions"]
    grain = st.selectbox("Aggregation", ["monthly", "quarterly", "retail-season", "yearly"])
    agg = aggregate_financials(monthly, grain)

    c1, c2 = st.columns(2)
    with c1:
        fig = px.line(agg, x="period", y="conversion_rate", color_discrete_sequence=[COLORS["conversion"]])
        fig.update_layout(height=300, yaxis_tickformat=".1%", paper_bgcolor=COLORS["panel"], title="Conversion rate")
        st.plotly_chart(fig, use_container_width=True)
    with c2:
        fig = px.bar(agg, x="period", y="net_incremental_revenue", color_discrete_sequence=[COLORS["revenue"]])
        fig.update_layout(height=300, paper_bgcolor=COLORS["panel"], title="Net incremental revenue")
        st.plotly_chart(fig, use_container_width=True)

    summary = decision_class_summary(decisions)
    st.markdown('<p class="section-title">Adopted vs modified vs ignored performance</p>', unsafe_allow_html=True)
    st.dataframe(summary, use_container_width=True, hide_index=True)

    matrix = pd.crosstab(decisions["recommended_campaign"], decisions["actual_campaign"])
    st.markdown('<p class="section-title">Recommended vs actual campaign matrix</p>', unsafe_allow_html=True)
    st.dataframe(matrix, use_container_width=True)

    cols = st.columns(4)
    cols[0].markdown(kpi_card("Missed value", fmt_money(decisions["missed_value"].sum())), unsafe_allow_html=True)
    cols[1].markdown(kpi_card("Wasted spend", fmt_money(decisions["wasted_spend"].sum())), unsafe_allow_html=True)
    cols[2].markdown(kpi_card("Gross revenue", fmt_money(decisions["gross_revenue"].sum())), unsafe_allow_html=True)
    cols[3].markdown(kpi_card("Campaign cost", fmt_money(decisions["campaign_cost"].sum())), unsafe_allow_html=True)

    pre = monthly[monthly["phase"].isin(["initial", "recurring"])]
    post = monthly[monthly["phase"] == "improved"]
    st.markdown(
        f"**Before/after intervention:** conversion {fmt_pct(pre['conversion_rate'].mean())} → "
        f"{fmt_pct(post['conversion_rate'].mean())}; NIR/month "
        f"{fmt_money(pre['net_incremental_revenue'].mean())} → {fmt_money(post['net_incremental_revenue'].mean())}"
    )
    with st.expander("Financial methodology"):
        st.markdown(methodology_markdown())
    disclosure()


def render_exceptions(data: dict[str, pd.DataFrame]) -> None:
    render_header("Exceptions & Outliers")
    st.markdown(
        """
**Outlier** — statistically identified deviation in model, adoption, or outcome results.  
**Business exception** — known condition outside model data recorded because it affects interpretation.
        """
    )
    st.markdown('<p class="section-title">Statistical outliers</p>', unsafe_allow_html=True)
    st.dataframe(data["statistical_outliers"], use_container_width=True, hide_index=True)
    st.markdown('<p class="section-title">Business exceptions</p>', unsafe_allow_html=True)
    st.dataframe(data["business_exceptions"], use_container_width=True, hide_index=True)
    disclosure()


def render_insights_actions(data: dict[str, pd.DataFrame]) -> None:
    render_header("Insights & Actions")
    insights = data["generated_insights"]
    reviews = data["human_insight_reviews"]
    actions = data["suggested_actions"]

    for _, insight in insights.iterrows():
        review = reviews[reviews["insight_id"] == insight["insight_id"]]
        st.markdown(
            f"""
            <div class="panel" style="margin-bottom:12px;">
              <h3>{insight['insight_id']} · {insight['title']}</h3>
              <div class="field-label">Automated insight (preserved)</div>
              <p class="field-value">{insight['automated_text']}</p>
              <div class="field-label">Method / evidence</div>
              <p class="field-value">{insight['method']} · {insight['evidence_strength']} · {insight['magnitude']}</p>
              <div class="field-label">Contributing dimensions</div>
              <p class="field-value">{insight['contributing_dimensions']}</p>
              <div class="field-label">Why the action follows</div>
              <p class="field-value">{insight['why_action_follows']}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
        if len(review):
            r = review.iloc[0]
            st.markdown(
                f"""
                <div class="panel" style="margin-bottom:16px;border-left:3px solid #b7c45a;">
                  <h3>Human review · {r['status']}</h3>
                  <div class="field-label">Reviewer</div><p class="field-value">{r['reviewer']} · {r['reviewed_at']}</p>
                  <div class="field-label">Human-reviewed text</div><p class="field-value">{r['human_edited_text']}</p>
                  <div class="field-label">Edit reason</div><p class="field-value">{r['edit_reason']}</p>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown('<p class="section-title">Suggested actions (not auto-approved)</p>', unsafe_allow_html=True)
    for _, action in actions.iterrows():
        st.markdown(
            f"""
            <div class="panel" style="margin-bottom:12px;">
              <h3>{action['action_id']} · {action['category']} · {action['status']}</h3>
              <div class="field-label">Original automated suggestion</div>
              <p class="field-value">{action['original_suggestion']}</p>
              <div class="field-label">Human-reviewed text</div>
              <p class="field-value">{action['human_reviewed_text']}</p>
              <div class="field-label">Owner / window / result</div>
              <p class="field-value">{action['owner']} · {action['measurement_window']} · {action['result_classification']}</p>
            </div>
            """,
            unsafe_allow_html=True,
        )
    disclosure()


def render_improvement_history(data: dict[str, pd.DataFrame]) -> None:
    render_header("Improvement History")
    st.markdown("Learning loop: insight → review → action → implementation → measurement.")
    measures = data["action_measurements"].merge(
        data["suggested_actions"][["action_id", "category", "human_reviewed_text", "status"]],
        on="action_id",
        how="left",
    )
    st.dataframe(measures, use_container_width=True, hide_index=True)

    monthly = data["monthly_kpis"]
    fig = px.line(
        monthly,
        x="run_month",
        y=["campaign_choice_adoption", "conversion_rate"],
        color_discrete_sequence=[COLORS["adoption"], COLORS["conversion"]],
    )
    fig.add_vline(x="2025-12", line_dash="dot", line_color=COLORS["intervention"])
    fig.add_vline(x="2026-02", line_dash="dot", line_color=COLORS["post"])
    fig.update_layout(height=340, yaxis_tickformat=".0%", paper_bgcolor=COLORS["panel"], title="Before/after adoption and conversion")
    st.plotly_chart(fig, use_container_width=True)

    st.markdown(
        """
- **ACT-BIZ-001** (business default plan): **Successful**
- **ACT-MDL-001** (model v1.1 boundary): **Successful** (partially confounded with business action)
- **ACT-BIZ-002** (follow-up checklist): **Inconclusive**
        """
    )
    disclosure()


def render_model_details(data: dict[str, pd.DataFrame]) -> None:
    render_header("Model Details")
    versions = data["model_versions"]
    validation = data["validation_report"]

    st.markdown(
        """
The model estimates which marketing action is most likely to create an **incremental** customer response,
rather than only predicting which customers are already likely to purchase.

**Approach:** T-learner with a separate calibrated logistic conversion model for
New Season Edit, Performance Collection, and Suppression. Recommendation maximizes expected net value versus suppression.
        """
    )
    st.dataframe(versions, use_container_width=True, hide_index=True)

    with st.expander("Financial methodology"):
        st.markdown(methodology_markdown())
    with st.expander("Adoption definitions"):
        for key, label in ADOPTION_LABELS.items():
            st.markdown(f"- **{label}** (`{key}`)")
    with st.expander("Limitations"):
        st.markdown(
            """
- Demonstration uses **synthetic** A.Typical data; financial results are simulated.
- Incremental revenue is a **modeled estimate**, not proven causal attribution from a live RCT in this demo.
- Business-process and model changes overlap in time; influence is partially identified.
- No protected personal attributes are used.
            """
        )

    st.markdown('<p class="section-title">System validation status</p>', unsafe_allow_html=True)
    passed = int(validation["passed"].sum())
    total = len(validation)
    st.markdown(
        f'<span class="badge badge-ok">{passed}/{total} checks passed</span>',
        unsafe_allow_html=True,
    )
    st.dataframe(validation, use_container_width=True, hide_index=True)
    disclosure()
