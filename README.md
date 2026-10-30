# StyleIQ: decision platform for new footwear launches

[![Live prototype](https://img.shields.io/badge/Live%20prototype-Vercel-black?logo=vercel)](https://rashmibaur-styleiq.vercel.app)
[![Case study](https://img.shields.io/badge/Case%20study-Portfolio-blue)](https://rashmibaur-portfolio.vercel.app/metro/)

A clickable front-end prototype of the New Product Introduction (NPI) Intelligence Platform for fashion retail merchandising. It is the working half of the case study [Intelligence tool for new retail product launch](https://rashmibaur-portfolio.vercel.app/metro/). All data is mock data in `src/data/mockData.ts`. There is no backend and no forecasting model.

## UX problem statement

A footwear brand launches a large number of new SKUs every season. Decisions rest on intuition, fragmented reports and late signals. There is no single view of trend momentum, comparable historical performance or demand confidence. The result is weak products over-launched, pilots run when confidence is already high, and excess inventory.

How might we enable buyers and designers to make faster, more confident new product launch decisions using trend, product and demand intelligence in one workflow?

## Users

| Persona | What they decide |
|---------|------------------|
| Buyers and category managers (primary) | Go/No-Go, launch quantities, store allocation for new SKUs |
| Designers (primary) | Validate concepts against trends, refine colour, heel style, toe shape and ornamentation |

Secondary stakeholders: planning and forecasting teams, business leadership, data science and engineering.

## Interaction model and decision architecture

The prototype follows the NPI journey as three tabs, each answering one decision:

| Tab | Decision it supports | What the user does |
|-----|----------------------|--------------------|
| Trend Intelligence | Which trends to invest in early, which to ignore | Switch between Brand and Social views, filter by date range and assortment, read attribute sentiment and brand-vs-user activity |
| New Product Intelligence | Which designs to iterate, shortlist or stop | Browse the collection list, upload product images (batch queue with metadata), open a product and configure its attributes |
| Launch Intelligence | Pilot quantity, store allocation, go/no-go at scale | Review the demand forecast summary for a product, change the time range, read the launch plan |

Opening a product in the collection list shows its attribute selection. Confirming the selection moves on to Launch Intelligence for that product, and the back button there returns to the collection list.

Design principles from the case study:

- **Confidence over complexity:** clear, actionable signals instead of raw data.
- **Explain the why:** every recommendation shows its reasoning.
- **Early signals over delayed certainty:** act on directional intelligence.
- **Progressive disclosure:** summary first, detail on demand.
- **AI informs, humans decide:** outputs are transparent, auditable and open to override.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Recharts for charts, including treemap, grouped bar, scatter and stacked views
- TanStack Table for the collection list
- react-dropzone for image upload
- lucide-react for icons
- Hosted on Vercel

## Run locally

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Related

- Case study: https://rashmibaur-portfolio.vercel.app/metro/
- Portfolio source: https://github.com/rashmibaur/portfolio
