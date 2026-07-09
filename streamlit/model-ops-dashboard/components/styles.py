"""Report styling tokens and global CSS."""

REPORT_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');

html, body, [class*="css"] {
  font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
}

.block-container {
  padding-top: 0.75rem;
  padding-bottom: 2rem;
  max-width: 1180px;
}

header[data-testid="stHeader"] {
  background: transparent;
}

#MainMenu, footer, header[data-testid="stHeader"] {
  visibility: hidden;
}

.report-header {
  background: #141414;
  color: #f5f5f5;
  padding: 14px 18px 16px;
  margin: -1rem -1rem 1rem -1rem;
  border-bottom: 1px solid #2a2a2a;
}

.report-header h1 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
}

.report-header .subtitle {
  font-size: 0.78rem;
  color: #b5b5b5;
  margin: 0;
}

.report-header .meta {
  font-size: 0.68rem;
  color: #8f8f8f;
  margin-top: 8px;
}

.report-canvas {
  background: #f3f3f1;
  padding: 12px;
  border: 1px solid #d6d6d4;
}

.section-title {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #4a4a4a;
  margin: 0 0 8px 0;
}

.kpi-card {
  background: #ffffff;
  border: 1px solid #d6d6d4;
  padding: 10px 12px;
  min-height: 92px;
}

.kpi-label {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6b6b6b;
}

.kpi-value {
  font-size: 1.35rem;
  font-weight: 600;
  color: #141414;
  margin: 4px 0 2px;
  line-height: 1.1;
}

.kpi-subtext {
  font-size: 0.68rem;
  color: #7a7a7a;
  margin: 0;
}

.kpi-delta-up { color: #2b6cb0; font-size: 0.68rem; }
.kpi-delta-down { color: #e87722; font-size: 0.68rem; }
.kpi-delta-neutral { color: #6b6b6b; font-size: 0.68rem; }

.panel {
  background: #ffffff;
  border: 1px solid #d6d6d4;
  padding: 12px 14px;
}

.panel h3 {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #4a4a4a;
  margin: 0 0 10px 0;
}

.field-label {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6b6b6b;
}

.field-value {
  font-size: 0.82rem;
  color: #2a2a2a;
  margin: 2px 0 10px 0;
}

.severity-high {
  display: inline-block;
  background: #fde8d8;
  color: #b45309;
  border: 1px solid #f0c9a6;
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 600;
}

.stPlotlyChart {
  border: 1px solid #d6d6d4;
  background: #ffffff;
}
</style>
"""

COLORS = {
    "canvas": "#f3f3f1",
    "panel": "#ffffff",
    "border": "#d6d6d4",
    "header": "#141414",
    "blue": "#2b6cb0",
    "orange": "#e87722",
    "gray": "#6b6b6b",
    "band": "rgba(43, 108, 176, 0.12)",
    "band_line": "rgba(43, 108, 176, 0.35)",
}
