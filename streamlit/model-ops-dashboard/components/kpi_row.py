from __future__ import annotations

from data.fixtures import KpiDefinition


def format_kpi_value(kpi: KpiDefinition) -> str:
    if kpi.fmt == "percent":
        return f"{kpi.value:.0f}%"
    if kpi.fmt == "currency":
        if kpi.value >= 1_000_000:
            return f"${kpi.value / 1_000_000:.1f}M"
        return f"${kpi.value:,.0f}"
    if kpi.value >= 1_000_000:
        return f"{kpi.value / 1_000_000:.1f}M"
    if kpi.value >= 1_000:
        return f"{kpi.value / 1_000:.1f}K"
    return f"{kpi.value:,.0f}"


def format_delta(kpi: KpiDefinition) -> tuple[str, str]:
    if kpi.fmt == "currency" and kpi.comparison == "incremental":
        text = f"+${kpi.delta / 1_000_000:.1f}M {kpi.comparison}"
        css = "kpi-delta-up"
        return text, css

    positive = kpi.delta >= 0
    good = positive if kpi.higher_is_better else not positive
    arrow = "▲" if positive else "▼"
    suffix = "%" if kpi.fmt == "percent" else " pts" if kpi.fmt == "count" else ""
    magnitude = abs(kpi.delta)
    if kpi.fmt == "percent":
        text = f"{arrow} {magnitude:.0f}{suffix} {kpi.comparison}"
    else:
        text = f"{arrow} {magnitude:.1f}{suffix} {kpi.comparison}"

    css = "kpi-delta-up" if good else "kpi-delta-down"
    return text, css


def render_kpi_card(kpi: KpiDefinition) -> str:
    value = format_kpi_value(kpi)
    delta_text, delta_css = format_delta(kpi)
    return f"""
    <div class="kpi-card">
      <div class="kpi-label">{kpi.label}</div>
      <div class="kpi-value">{value}</div>
      <p class="kpi-subtext">{kpi.subtext}</p>
      <div class="{delta_css}">{delta_text}</div>
    </div>
    """
