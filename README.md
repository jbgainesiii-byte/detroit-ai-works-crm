# Detroit AI Works CRM

A lightweight outreach CRM for tracking small business website redesign prospects.

## What it does now

- Tracks prospects through a demo-first website sales pipeline
- Stores prospect records locally in the browser
- Imports and exports CSV files for Google Sheets workflows
- Includes outreach scripts, follow-ups, rebuttals, discovery prompts, and package anchors

## Deploy on Netlify

This is a static site, so Netlify does not need a build step.

- Build command: leave blank
- Publish directory: `.`

## Shared CRM Roadmap

The current version is local-only. Each browser has its own data.

To make this shared between Detroit AI Works and a partner/helper:

1. Add Supabase as the shared database.
2. Store prospects in a `prospects` table instead of `localStorage`.
3. Keep CSV import/export for batch lead loading.
4. Add simple activity fields such as `assignedTo`, `lastTouchedAt`, and `lastTouchedBy`.
5. Add login once more people need access.

## Recommended Lead Sheet Columns

Use these columns when importing leads from Google Sheets:

```csv
businessName,niche,city,contactName,email,phone,website,demoUrl,stage,followUp,score,quote,issue,notes
```
