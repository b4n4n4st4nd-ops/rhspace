# Transparensea — Build Report

**Branch:** `feature/transparensea-lab`  
**Date:** 2026-07-22  
**Repository:** `ryanhambleton-space`

## What was built

Replaced the Lab Streamlit model-operations demo with **Transparensea** — Model Transparency, Adoption & Impact — using the fictional brand **A.Typical**.

Delivered a multipage Streamlit product with:

- Reproducible synthetic data + T-learner scoring across 24 months (Aug 2024–Jul 2026)
- Feature Influence (standardized coefficients + permutation importance)
- Adoption control chart (p-chart), Pareto, heatmap, and drill-down
- Conversion & revenue views with financial methodology disclosure
- Outliers, business exceptions, automated insights, human review, actions, measurements
- Improvement history and model details / validation status
- Lab metadata updates for Transparensea presentation

## Data-source choice

**Option B — synthetic fallback.**

Hillstrom was not used as a runtime dependency. A deterministic synthetic panel (seed `42`) inspired by uplift-marketing workflows was generated offline. Source notes:

- `streamlit/model-ops-dashboard/data/raw/SOURCE.md`
- `streamlit/model-ops-dashboard/data/raw/source_manifest.json`

Disclosure shown in-app:

> A.Typical is a fictional brand. Demonstration records are synthetic and modeled after common marketing uplift and production-model workflows.

## Modeling approach

- T-learner: separate logistic regression pipelines per treatment (New Season Edit, Performance Collection, Suppression)
- Recommendation maximizes expected net value vs suppression
- Versions: `v1.0` (through Jan 2026 runs) and `v1.1` (Feb 2026+)
- Feature Influence methods kept distinct (not treated as interchangeable)

## Financial assumptions

From `data/schema.py`:

- AOV $88, gross margin 55%, message cost $0.14, follow-up cost $0.45
- Campaign allocated costs vary by campaign
- Formula documented in-app and in the data dictionary

## Key product decisions

1. Keep portfolio case study `predictive-model-performance-impact` untouched.
2. Update Lab slug `analytics-explorer` title/summary to Transparensea; add `transparensea` Lab entry; preserve routes.
3. Precompute all demo CSVs so Streamlit Cloud needs no training at runtime.
4. Use sidebar navigation + persistent filters for a single-product feel inside an iframe.
5. Include one inconclusive action (`ACT-BIZ-002`) so the loop is not unrealistically perfect.

## Files changed (high level)

- `streamlit/model-ops-dashboard/**` — full product rebuild
- `content/lab/analytics-explorer.json`, `content/lab/transparensea.json`
- `content/portfolio/analytics-explorer.json` — Lab link copy only
- `docs/transparensea/*`

Unrelated homepage/About/Art/Resume/Portfolio case-study content intentionally untouched.

## Commands run

```bash
python -m pip install -r streamlit/model-ops-dashboard/requirements.txt
python streamlit/model-ops-dashboard/scripts/build_demo_data.py
python -m compileall streamlit/model-ops-dashboard
python -m pytest streamlit/model-ops-dashboard/tests -q
streamlit run streamlit/model-ops-dashboard/app.py
```

## Tests

- Unit/contract tests in `streamlit/model-ops-dashboard/tests/test_transparensea.py`
- Result: **12 passed**

## Known limitations

- Synthetic data only (no Hillstrom raw file committed)
- Incremental revenue is modeled/simulated, not live causal identification
- Business and model interventions overlap; effects are partially confounded by design
- Lab `embedUrl` still placeholder until Streamlit Community Cloud URL is published
- Chart click-to-filter relies on selectbox fallbacks (robust in Streamlit)

## Deferred work

Live warehouse, SSO, multi-tenant, Jira/Slack, configuration wizard, LLM insight layer, automated retraining.

## Local run

```bash
cd streamlit/model-ops-dashboard
pip install -r requirements.txt
streamlit run app.py
```

## Deployment notes

Streamlit Community Cloud main file: `streamlit/model-ops-dashboard/app.py`  
Then set Lab `embedUrl` fields to the public app URL.

## Recommended next slice

Publish Streamlit Cloud URL, add a short Lab walkthrough script, and optionally wire a Hillstrom raw ingest path behind the same schema.
