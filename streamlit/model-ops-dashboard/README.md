# Predictive Model Performance & Impact — Streamlit

Standalone portfolio demo for executive model-operations reporting.

## Run locally

```bash
cd streamlit/model-ops-dashboard
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

## Deploy for portfolio embed

1. Push this folder to a public GitHub repo (or monorepo subpath).
2. Deploy on [Streamlit Community Cloud](https://share.streamlit.io).
3. Set **Main file path** to `streamlit/model-ops-dashboard/app.py` if using the monorepo root.
4. Copy the public app URL into `content/lab/*.json` as `embedUrl` for `DemoFrame` iframe embed.

## Customize

- **Data story**: edit `data/fixtures.py`
- **Visual style**: edit `components/styles.py` and `charts/trend_chart.py`
- **Layout**: edit `app.py`

All data is fictional (Northwind Analytics). No proprietary terminology.
