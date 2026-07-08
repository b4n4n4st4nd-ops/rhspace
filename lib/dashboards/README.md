# Portfolio dashboards

Interactive dashboard artifacts live in **Portfolio**, not Lab. Lab is reserved for agentic tools, AI workflows, and a future visualization builder.

## Add a dashboard

1. **Portfolio metadata** — create `content/portfolio/<slug>.json` with at least:
   - `"kind": "dashboard"`
   - `"status": "draft"` while building, `"published"` when ready for the grid
   - `"componentKey"` — must match a registry entry
   - `"dataPath"` — folder name under `content/data/dashboards/`
   - `"designVersion"` — `"report-card-v1"` or `"report-card-v2"`
   - optional: `dashboardType`, `capabilityTags`, `displayOrder`, `thumbnail`, `summary`

2. **React component** — add a folder under `components/dashboards/demos/<componentKey>/`.

3. **Mock data** (optional) — add JSON under `content/data/dashboards/<dataPath>/`.

4. **Registry** — add one line to `lib/dashboards/registry.ts` mapping `componentKey` → component.

5. **Data loader** — add one loader to `lib/dashboards/loadData.ts` mapping `dataPath` → loader function.

Direct URL: `/portfolio/<slug>` (works for draft and published).

## Portfolio JSON schema

Every portfolio entry uses the same base fields:

```json
{
  "slug": "...",
  "title": "...",
  "kind": "case-study" | "dashboard",
  "status": "draft" | "published",
  "category": "...",
  "tools": [],
  "featured": false,
  "thumbnail": "/images/portfolio/....svg",
  "summary": "...",
  "date": "YYYY-MM"
}
```

Dashboard entries (`kind: "dashboard"`) add:

```json
{
  "designVersion": "report-card-v1" | "report-card-v2",
  "dashboardType": "...",
  "capabilityTags": [],
  "displayOrder": 10,
  "componentKey": "...",
  "dataPath": "..."
}
```

## Hide / publish

Edit `status` in the portfolio JSON:

- `"draft"` — hidden from portfolio grid and homepage featured section; still reachable by direct URL
- `"published"` — visible in portfolio grid

## Change design version

Set `"designVersion"` in the portfolio JSON (`"report-card-v1"` or `"report-card-v2"`). `DashboardShell` reads this and applies tokens from `lib/dashboards/design.ts`. Update tokens there to roll out a V2 direction across all dashboards.

## Reusable components

| Location | Purpose |
|----------|---------|
| `lib/dashboards/design.ts` | Design tokens (shell, header, KPI, accents) |
| `lib/dashboards/registry.ts` | componentKey → React component |
| `lib/dashboards/loadData.ts` | dataPath → mock/API data loader |
| `lib/dashboards/project.ts` | draft/published visibility helpers |
| `components/dashboards/shell/` | Report shell, tabs, sections, chart panels |
| `components/dashboards/metrics/` | KPI grid, goal progress |
| `components/dashboards/filters/` | Filter bars |
| `components/dashboards/charts/` | Chart primitives |
| `components/dashboards/tables/` | Data tables |
