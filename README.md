# Detroit AI Works CRM

A lightweight outreach CRM for tracking small business website redesign prospects.

## What it does now

- Tracks prospects through a demo-first website sales pipeline
- Stores prospect records in the shared Supabase database with a browser backup
- Moves leads forward with quick stage buttons, owner fields, next steps, and last-contact dates
- Imports and exports CSV files for Google Sheets workflows
- Includes outreach scripts, follow-ups, rebuttals, discovery prompts, and package anchors

## Deploy on Netlify

This is a static site, so Netlify does not need a build step.

- Build command: leave blank
- Publish directory: `.`

## Supabase Table

Create the `prospects` table in Supabase before using shared saves:

```sql
create table if not exists prospects (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  niche text,
  city text,
  contact_name text,
  email text,
  phone text,
  website text,
  demo_url text,
  stage text default 'Found',
  follow_up date,
  score integer default 0,
  quote text,
  assigned_to text,
  next_step text,
  last_contacted date,
  issue text,
  notes text,
  last_touched_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

If the table already exists, run this safe update to add the new mini-Salesforce fields:

```sql
alter table prospects add column if not exists assigned_to text;
alter table prospects add column if not exists next_step text;
alter table prospects add column if not exists last_contacted date;
```

## Recommended Lead Sheet Columns

Use these columns when importing leads from Google Sheets:

```csv
businessName,niche,city,contactName,email,phone,website,demoUrl,stage,followUp,score,quote,assignedTo,nextStep,lastContacted,issue,notes
```
