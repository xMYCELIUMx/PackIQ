# PackIQ

Intelligent inspection and quality platform built for packaging automation.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ORM**: Prisma
- **Database**: PostgreSQL

## Core Modules

1. **Inspections** — Mobile-first inspection management with Smart Finding Engine
2. **Templates** — Drag-and-drop builder with conditional logic, version control, and pre-built machine library
3. **Issues** — P1–P4 severity tracking with SLA definitions (1hr → 1 week)
4. **CARs** — Corrective Action Requests with 5-Why workflow and 7-stage lifecycle
5. **Actions** — Role-restricted action management (technicians log issues, managers create actions)
6. **Analytics** — Three dashboard views (Operations, Quality, Executive), vendor scorecards, and 7 standard reports

## User Personas

| Role | Key Permissions |
|------|----------------|
| Field Technician | Create inspections, report issues |
| Engineer | Full access + template management |
| Quality Manager | Full access + CAR management |
| Production Supervisor | Inspections, issues, actions, analytics |
| Vendor (External) | CAR portal access via token link |

## Getting Started

```bash
# Install dependencies
npm install

# Set up database
cp .env.example .env  # Configure DATABASE_URL
npx prisma migrate dev

# Start development server
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Authenticated dashboard routes
│   │   ├── inspections/      # Inspection list and management
│   │   ├── templates/        # Template builder and library
│   │   ├── issues/           # Issue tracking with SLA
│   │   ├── cars/             # Corrective Action Requests
│   │   ├── actions/          # Action management
│   │   └── analytics/        # Dashboards and reports
│   └── api/                  # REST API routes
├── components/
│   ├── ui/                   # Reusable UI components
│   └── layout/               # Layout components (Sidebar, Header)
├── lib/                      # Utilities, Prisma client, constants
└── types/                    # TypeScript type definitions
```
