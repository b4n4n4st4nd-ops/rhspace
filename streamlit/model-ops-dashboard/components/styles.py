"""A.Typical report styling tokens and global CSS."""

REPORT_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap');

html, body, [class*="css"] { font-family: "Manrope", "Segoe UI", sans-serif; }
.block-container { padding-top: 0.65rem; padding-bottom: 2rem; max-width: 1320px; }
header[data-testid="stHeader"] { background: transparent; }
#MainMenu, footer, header[data-testid="stHeader"] { visibility: hidden; }

.report-header {
  background: #17211d;
  color: #f7f2e8;
  padding: 18px 22px 20px;
  margin: -1rem -1rem 1rem -1rem;
  border-bottom: 1px solid #31423a;
}
.brand-lockup { display: flex; align-items: center; gap: 12px; }
.product-mark { font-size: 2rem; line-height: 1; color: #d8ff66; }
.report-header h1 { font-size: 1.35rem; font-weight: 700; margin: 0; letter-spacing: -0.03em; }
.report-header .eyebrow { font-family: "IBM Plex Mono", monospace; font-size: 0.58rem; color: #b7c2ba; letter-spacing: 0.12em; margin: 2px 0 0; }
.report-header .subtitle { font-size: 0.8rem; color: #d8ded8; margin: 10px 0 0; }
.report-header .meta { font-family: "IBM Plex Mono", monospace; font-size: 0.63rem; color: #93a198; margin-top: 7px; }

.report-canvas { background: #eeeae2; padding: 14px; border: 1px solid #d6cfc3; }
.section-title { font-family: "IBM Plex Mono", monospace; font-size: 0.64rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #4d574f; margin: 0 0 8px; }
.section-space { margin-top: 18px; }

.kpi-card { background: #fffdf8; border: 1px solid #d8d1c6; padding: 11px 12px; min-height: 105px; }
.kpi-label { font-family: "IBM Plex Mono", monospace; font-size: 0.58rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: #6b716c; }
.kpi-value { font-size: 1.35rem; font-weight: 700; color: #17211d; margin: 6px 0 3px; line-height: 1.1; }
.kpi-subtext { font-size: 0.65rem; color: #7b7c77; margin: 0 0 6px; line-height: 1.35; }
.kpi-delta-up { color: #28654c; font-size: 0.66rem; font-weight: 600; }
.kpi-delta-down { color: #a34a2c; font-size: 0.66rem; font-weight: 600; }

.panel { background: #fffdf8; border: 1px solid #d8d1c6; padding: 13px 14px; min-height: 390px; }
.panel h3 { font-family: "IBM Plex Mono", monospace; font-size: 0.64rem; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; color: #435047; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #e3ddd3; }
.field-label { font-family: "IBM Plex Mono", monospace; font-size: 0.56rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: #777b76; }
.field-value { font-size: 0.76rem; color: #252e29; margin: 3px 0 12px; line-height: 1.5; }
.metric-shift { font-size: 1.05rem; font-weight: 700; color: #245d47; }
.impact-panel { border-top: 3px solid #d8ff66; }
.severity-high { display: inline-block; background: #f6dfd2; color: #9e4529; border: 1px solid #e6bba8; padding: 3px 8px; font-size: 0.64rem; font-weight: 600; }
.context-note { background: #fffdf8; border: 1px solid #d8d1c6; padding: 12px; font-size: 0.7rem; line-height: 1.5; color: #545b56; margin-top: 12px; }

.stPlotlyChart { border: 1px solid #d8d1c6; background: #fffdf8; }
div[data-baseweb="select"] > div { background: #fffdf8; border-color: #c9c1b5; }
</style>
"""

COLORS = {
    "canvas": "#eeeae2",
    "panel": "#fffdf8",
    "border": "#d8d1c6",
    "header": "#17211d",
    "blue": "#3f6f69",
    "orange": "#bd6541",
    "gray": "#6b716c",
    "band": "rgba(63, 111, 105, 0.12)",
    "band_line": "rgba(63, 111, 105, 0.35)",
}
