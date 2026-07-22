from __future__ import annotations

from data.fixtures import KpiDefinition


def format_kpi_value(kpi: KpiDefinition) -> str:
    if kpi.fmt == "percent":
        return f"{kpi.value:.0f}%"
    if kpi.fmt == "percent_1":
        return f"{kpi.value:.1f}%"
    if kpi.fmt == "currency":
        if abs(kpi.value) >= 1_000_000:
            return f"${kpi.value / 1_000_000:.2f}M"
        return f"${kpi.value:,.0f}"
    if kpi.value >= 1_000_000:
        return f"{kpi.value / 1_000_000:.1f}M"
    if kpi.value >= 1_000:
        return f"{kpi.value / 1_000:.1f}K"
    return f"{kpi.value:,.0f}"


def format_delta(kpi: KpiDefinition) -> tuple[str, str]:
    positive = kpi.delta >= 0
    good = positive if kpi.higher_is_better else not positive
    arrow = "▲" if positive else "▼"

    if kpi.fmt == "currency":
        amount = abs(kpi.delta)
        formatted = f"${amount / 1_000_000:.2f}M" if amount >= 1_000_000 else f"${amount:,.0f}"
        text = f"{arrow} {formatted} {kpi.comparison}"
    elif kpi.fmt in {"percent", "percent_1"}:
        text = f"{arrow} {abs(kpi.delta):.1f} pts {kpi.comparison}"
    else:
        text = f"{arrow} {abs(kpi.delta):.1f}% {kpi.comparison}"

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
