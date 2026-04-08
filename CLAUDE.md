# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (outputs to `dist/`)
- **Lint**: `npm run lint` (ESLint with react-hooks and react-refresh plugins)
- **Preview production build**: `npm run preview`

No test framework is configured.

## Architecture

Single-page React 19 + Vite 8 app (plain JavaScript, no TypeScript). An AI-powered dashboard prototype for a gelato shop with three tab views: today (stats + flavor forecast + insights), campaigns (approval queue), and performance (weekly metrics + ROI).

**Entry flow**: `index.html` → `src/main.jsx` → `src/App.jsx` → `src/GelatoDashboard.jsx`

All application logic lives in `src/GelatoDashboard.jsx` — a single self-contained component with hardcoded mock data (flavors, campaigns, weekly stats, insights) and inline styles. There is no routing, no API calls, no external state management, and no component library.

## Style Conventions

- All UI styling is inline (no CSS-in-JS library or utility classes). The CSS files (`index.css`, `App.css`) are leftover from the Vite template scaffold and are not used by the dashboard.
- Fonts loaded via Google Fonts link in the component: DM Sans (body) and Playfair Display (header).
- ESLint rule: unused variables starting with uppercase or `_` are allowed (`varsIgnorePattern: '^[A-Z_]'`).
