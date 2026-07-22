# Transparensea — A.Typical Marketing Intelligence

Standalone Streamlit product demo for production-model transparency, adoption, business impact, automated insights, and action measurement.

## Demo narrative

A.Typical uses a scheduled uplift / treatment-selection model to recommend campaigns, customer audiences, follow-ups, and suppressions. Transparensea compares those recommendations with what the marketing business actually executed, measures conversion and net revenue, detects outliers, publishes evidence-backed insights, suggests model and business actions, and tracks before-and-after results.

The current data is synthetic and loosely inspired by the structure of the public Hillstrom marketing dataset. Simulated production runs, business adoption, workflow, and financial outcomes are explicitly disclosed in the app.

## Run locally

```bash
cd streamlit/model-ops-dashboard
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

## Current vertical slice

- 24 scheduled monthly model runs
- Executive model-value KPIs
- Campaign adoption and conversion trend
- Statistical adoption outlier
- Adopted, modified, and ignored campaign comparisons
- Feature Influence with the underlying importance method
- Generated insight and preserved human review
- Suggested business and model actions
- Before-and-after adoption, conversion, and net-revenue measurement

## Intended next slices

1. Dynamic control-chart metric and standard-deviation controls
2. Pareto analysis with campaign, region, market type, and segment drill-down
3. Lowest-grain recommendation and execution records
4. Dedicated input transparency and recommendations pages
5. Exception and insight history
6. Real Hillstrom ingestion and model training pipeline
7. Generalized data-source and model-workspace configuration

## Deploy for Lab embed

1. Deploy the repository on Streamlit Community Cloud.
2. Set **Main file path** to `streamlit/model-ops-dashboard/app.py`.
3. Keep the existing Lab `embedUrl` pointed to the deployed app.

The Portfolio case study remains separate; this application replaces and expands the interactive Lab demonstration.
