"""Transparensea + A.Typical visual system."""

PRODUCT_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

:root {
  --ts-canvas: #f4f1ea;
  --ts-panel: #fffdf8;
  --ts-ink: #15202b;
  --ts-ocean: #1f4e5f;
  --ts-sea: #3d8b8b;
  --ts-accent: #c45c26;
  --ts-lime: #b7c45a;
  --ts-warn: #b45309;
  --ts-crit: #9b1c1c;
  --ts-muted: #5c6570;
  --ts-border: #d9d2c5;
  --ts-rec: #1f4e5f;
  --ts-actual: #c45c26;
  --ts-adopt: #3d8b8b;
  --ts-conv: #2f6f4e;
  --ts-rev: #1f4e5f;
  --ts-outlier: #9b1c1c;
  --ts-intervene: #b45309;
  --ts-post: #3d8b8b;
}

html, body, [class*="css"] {
  font-family: "Source Sans 3", "Segoe UI", sans-serif;
  color: var(--ts-ink);
}

.block-container {
  padding-top: 0.6rem;
  padding-bottom: 2rem;
  max-width: 1220px;
}

header[data-testid="stHeader"] { background: transparent; }
#MainMenu, footer { visibility: hidden; }

.tsi-header {
  background: linear-gradient(120deg, #15202b 0%, #1f4e5f 58%, #2a6a6a 100%);
  color: #f7f4ee;
  padding: 16px 18px 14px;
  margin: -1rem -1rem 0.85rem -1rem;
  border-bottom: 3px solid var(--ts-lime);
}

.tsi-brand {
  font-family: "Fraunces", Georgia, serif;
  font-size: 1.55rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.02em;
}

.tsi-tagline {
  margin: 2px 0 0;
  font-size: 0.84rem;
  color: #d7e6e4;
}

.tsi-meta {
  margin-top: 8px;
  font-size: 0.72rem;
  color: #b9c7c6;
}

.tsi-atypical {
  font-family: "Fraunces", Georgia, serif;
  color: var(--ts-lime);
}

.section-title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--ts-ocean);
  margin: 0.35rem 0 0.55rem;
}

.kpi-card {
  background: var(--ts-panel);
  border: 1px solid var(--ts-border);
  border-left: 3px solid var(--ts-ocean);
  padding: 10px 12px;
  min-height: 88px;
}

.kpi-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ts-muted);
}

.kpi-value {
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--ts-ink);
  margin: 4px 0 2px;
  line-height: 1.1;
}

.kpi-subtext {
  font-size: 0.68rem;
  color: var(--ts-muted);
  margin: 0;
}

.panel {
  background: var(--ts-panel);
  border: 1px solid var(--ts-border);
  padding: 12px 14px;
}

.panel h3 {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ts-ocean);
  margin: 0 0 8px;
}

.field-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ts-muted);
}

.field-value {
  font-size: 0.84rem;
  color: var(--ts-ink);
  margin: 2px 0 10px;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 700;
  border: 1px solid var(--ts-border);
  background: #efe9dc;
}

.badge-high { background: #f8e4d4; color: var(--ts-warn); border-color: #e7c3a4; }
.badge-crit { background: #f6d9d9; color: var(--ts-crit); border-color: #e3b0b0; }
.badge-ok { background: #dcefe8; color: var(--ts-conv); border-color: #b7d8c8; }

.disclosure {
  font-size: 0.72rem;
  color: var(--ts-muted);
  border-top: 1px solid var(--ts-border);
  margin-top: 1rem;
  padding-top: 0.6rem;
}

div[data-testid="stSidebar"] {
  background: #ece7dc;
  border-right: 1px solid var(--ts-border);
}

.stPlotlyChart {
  border: 1px solid var(--ts-border);
  background: var(--ts-panel);
}
</style>
"""

COLORS = {
    "canvas": "#f4f1ea",
    "panel": "#fffdf8",
    "ink": "#15202b",
    "ocean": "#1f4e5f",
    "sea": "#3d8b8b",
    "accent": "#c45c26",
    "lime": "#b7c45a",
    "recommend": "#1f4e5f",
    "actual": "#c45c26",
    "adoption": "#3d8b8b",
    "conversion": "#2f6f4e",
    "revenue": "#1f4e5f",
    "outlier": "#9b1c1c",
    "intervention": "#b45309",
    "post": "#3d8b8b",
    "band": "rgba(61, 139, 139, 0.14)",
    "grid": "#e5dfd2",
}
