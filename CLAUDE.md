# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Policy overview dashboard for an insurance claims processing system. Monorepo with a React +
TypeScript + Tailwind + Recharts frontend (`frontend/`) and a C# / .NET 8 Web API backend that
serves **in-memory mock data** — there is no database (`backend/`).

## Commands

### Backend (`backend/ClaimsDashboard.Api`)
```powershell
dotnet run --project backend/ClaimsDashboard.Api      # serve API on http://localhost:5000 (Swagger at /swagger)
dotnet build backend/ClaimsDashboard.Api              # compile
dotnet test backend/ClaimsDashboard.Api.Tests         # run all xUnit tests
# single test / class (xUnit filter):
dotnet test backend/ClaimsDashboard.Api.Tests --filter "FullyQualifiedName~DashboardServiceTests.GetOverview_CountsMatchUnderlyingData"
dotnet test backend/ClaimsDashboard.Api.Tests --filter "ClassName~MockDataStoreTests"
```

### Frontend (`frontend/`)
```powershell
npm install                 # first run only
npm run dev                 # Vite dev server on http://localhost:5173
npm run build               # type-check (tsc -b) + production build
npm run lint                # ESLint
npm run test                # Vitest, single run
npm run test:watch          # Vitest watch mode
npx vitest run src/utils/format.test.ts   # a single test file
npx vitest run -t "toggles to dark"       # tests matching a name
```

There is no root-level task runner — run backend and frontend commands from their own concerns.
The frontend dev server and the API must both be running for the dashboard to load data.

## Architecture

### Backend: layered, swap-the-data-source design
Request flow is `Controllers → IDashboardService → MockDataStore`:
- **`MockDataStore`** (`Data/`) is a **singleton** seeded once at startup with a **fixed RNG seed**,
  so policies/transactions are deterministic across restarts (tests rely on this). It is the only
  place data originates.
- **`DashboardService`** (`Services/`) holds all aggregation logic (LINQ `GroupBy`/`Sum`) behind
  `IDashboardService`. To change a KPI, chart roll-up, or the budget-vs-actual calculation, edit
  this one class — controllers contain no logic.
- **Controllers** (`Controllers/`) are thin: `DashboardController` (`/api/dashboard/*`) and
  `TransactionsController` (`/api/transactions/recent`).
- **DTOs** (`Dtos/`) are the API contract returned to the client. Domain enums are serialized as
  **strings** (`JsonStringEnumConverter`) and JSON is camelCase by default.

Replacing mock data with a real database means swapping `MockDataStore` for an EF Core context
behind the same `IDashboardService` — nothing else should need to change. DI and CORS (allows the
Vite origins `5173`/`4173`) are wired in `Program.cs`.

### Frontend: single dashboard, one data hook
- **`useDashboardData`** (`hooks/`) is the data backbone: it loads all four endpoints in parallel
  via `Promise.all` and exposes a single `{ ...data, loading, error, refetch }` surface.
  `pages/Dashboard.tsx` renders loading / error / content states from it; presentational components
  receive plain props and do no fetching.
- **`api/client.ts`** wraps `fetch` with the base URL from `VITE_API_URL` (default
  `http://localhost:5000`); **`api/dashboardApi.ts`** holds the typed endpoint functions.
- **`types/index.ts`** mirrors the backend DTOs. **Keep these in sync** — if you change a DTO on the
  backend, update the matching interface here.

### Theming (class-based dark mode)
- Tailwind uses `darkMode: 'class'`; `ThemeProvider` (`theme/`) toggles the `dark` class on
  `<html>`, persists to `localStorage`, and falls back to OS `prefers-color-scheme` on first visit.
- Recharts colors are set via props, not CSS classes, so charts read theme-aware colors from
  `useChartTheme()` (`components/charts/`) rather than `dark:` utilities.

## Conventions

1. **Always include unit tests** as part of a change (xUnit backend, Vitest + Testing Library
   frontend with co-located `*.test.ts(x)` files) — not a follow-up.
2. **Every new frontend component must support dark mode**: add `dark:` variants for backgrounds,
   borders, text, hover, and accent/status colors; for prop-styled libraries use `useChartTheme()`
   / `useTheme()` instead of `dark:` utilities.

## Gotchas

- Changing `frontend/tailwind.config.js` requires **restarting the Vite dev server** — it does not
  reliably hot-reload Tailwind config, which can leave `dark:` styles stuck on the `media` strategy.
