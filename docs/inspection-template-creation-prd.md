# PRD — Inspection Template Creation System

## 2) Objective

Build a template-creation system for inspections, audits, checklists, quality checks, and field workflows that is at least at SafetyCulture parity and exceeds it in authoring speed, governance, flexibility, and maintainability.

## 3) Problem statement

Operations teams need to create and maintain inspection templates quickly, consistently, and at scale. Existing products solve much of this, but common pain points remain: limited authoring ergonomics, weak versioning, CSV-heavy translation flows, table limitations, title-format limits, and insufficient testing/simulation before publishing.

SafetyCulture covers the core workflow well, but its docs reveal opportunities to beat it on bulk editing, table behavior, translation UX, title formatting, branching/version control, and pre-publish validation.

## 4) Goals

- Let a non-technical operations user create a production-ready inspection template in under 15 minutes.
- Support all core template authoring workflows SafetyCulture supports.
- Reduce template maintenance overhead through reusable components, global response sets, versioning, cloning, and bulk editing.
- Improve data quality with stronger validation, better logic, and pre-publish testing.
- Make templates enterprise-ready with access control, approvals, localization, APIs, and analytics compatibility.

## 5) Non-goals

- Full inspections runtime UX is not the core scope here.
- Full action-management product is not the core scope, though template logic must be able to require/create/link actions.
- Full BI/analytics product is not the core scope, but template metadata must support analytics.

## 6) Primary users

- **Template Author:** QA manager, safety manager, ops manager, documentation manager.
- **Template Admin:** controls permissions, defaults, foldering, governance.
- **Inspector/Technician:** consumes templates in the field.
- **Approver:** reviews inspections that require signoff.
- **Developer/Admin Integrator:** consumes APIs, exports, and webhooks.

## 7) Key user stories

- As a template author, I can create a template from scratch, duplicate an existing one, import an existing paper/PDF/Excel form, or start from a library template.
- As a template author, I can add pages, sections, subsections, repeat sections, tables, and questions without losing structure.
- As a template author, I can configure logic, required fields, flagged responses, scoring, calculations, media rules, and approvals.
- As a template admin, I can control who can create, edit, archive, delete, publish, use, and view results for templates.
- As an enterprise team, I can reuse standardized response sets and localized content across many templates.
- As a publisher, I can test, preview, version, compare, and safely publish template changes without breaking active inspections.

## 8) Functional requirements

### Epic A — Template creation entry points

#### A1. Create new template

System must support:

- Create from scratch.
- Duplicate/copy template.
- Import/convert from XLSX, PDF, JPEG, PNG.
- Start from internal library/shared collection.
- Start from marketplace/public library template.
- Start from AI-assisted prompt-to-template flow.

SafetyCulture already supports scratch creation, duplication, conversion from Excel/image/PDF, and library downloads/imports, so parity is mandatory.

#### A2. Default scaffold

A newly created template must include:

- Title page.
- At least one blank inspection page.
- Sensible starter response set such as Yes / No / N/A.
- Configurable org defaults for title-page fields, note/media/action visibility, access, date format, and folder destination.

SafetyCulture creates a default title page and blank inspection page, and supports default access plus template settings like note/media/action toggles.

### Epic B — Template editor IA and authoring experience

#### B1. Editor layout

Editor must have:

- Left navigation tree for pages/sections/questions.
- Main canvas.
- Right property panel.
- Search/filter within template.
- Breadcrumbs for nested sections.
- Drag-and-drop reordering.
- Keyboard shortcuts.

#### B2. Content structure

Must support:

- Title page.
- Inspection pages.
- Sections.
- Subsections.
- Repeat sections.
- Tables/grid sections.
- Approval page.

SafetyCulture supports pages, sections, subsections, repeat sections, and approval workflows. It also supports tables, though with notable constraints.

#### B3. Editing ergonomics

Must support:

- Inline question editing.
- Bulk add.
- Bulk delete.
- Bulk copy/paste.
- Bulk move.
- Bulk edit properties.
- Multi-select across sections/pages.
- Undo/redo history.
- Persistent autosave.
- Draft mode.

SafetyCulture supports bulk add/delete/copy/paste/edit and draft publishing, but its bulk-edit undo behavior is weak because edits can effectively only be reversed by reverting to the last published version. We should explicitly beat that with true granular undo/redo and version history.

Requirement to exceed SafetyCulture:

- Full undo/redo stack across sessions.
- Change history per field.
- Side-by-side diff before publish.
- Branching/sandbox drafts.
- Real-time collaborative editing with presence and comments.

### Epic C — Field and response types

#### C1. Title-page fields

Must support:

- Site
- Inspection date
- Person
- Inspection location
- Document number
- Asset
- Company
- Custom metadata fields

SafetyCulture supports these title-page fields and uses them in reports and naming workflows.

#### C2. Inspection fields

Must support:

- Multiple choice
  - single select
  - multi-select
  - custom response sets
  - global response sets
- Text
  - short
  - long
  - regex/format validation
  - barcode scan input
- Number
  - plain numeric
  - units
  - min/max
  - decimal rules
  - temperature
  - calculated
- Checkbox
- Date
- Time
- Date-time
- Media
  - photo
  - video
  - PDF
  - audio
- Slider
- Annotation / markup on base image
- Signature
- Location / geolocation
- Instruction block
- Note / media / action companion options
- Table/grid cell question types
- Hidden/system/computed fields

SafetyCulture supports most of this set directly, including text, number, checkbox, date & time, media, slider, annotation, signature, location, instruction, and note/media/action; it also supports custom and global response sets.

Requirement to exceed SafetyCulture:

- Add audio upload/recording.
- Add lookup fields from master data.
- Add formula fields with richer references.
- Add hidden/system variables for advanced automation.
- Add matrix and repeating row templates without the current table limitations SafetyCulture documents.

### Epic D — Logic engine

#### D1. Core logic

Must support conditional rules based on:

- question response
- score
- flagged status
- site
- asset type
- user/group/role
- prior answer
- calculated value
- inspection state
- date/time
- external metadata

#### D2. Logic outcomes

Must support:

- ask/show follow-up questions
- hide questions
- skip sections/pages
- require note
- require media
- require action
- notify recipients
- prefill linked responses
- set field values
- change severity/status
- route to approver
- block completion
- call webhook / automation / integration
- create issue / action draft

SafetyCulture supports follow-up questions, linked responses, notifications, require note, require media, and require action.

Requirement to exceed SafetyCulture:

- Visual rule builder with nested AND/OR groups.
- Cross-section and cross-page dependencies.
- Rule conflict detection.
- Rule simulation mode.
- Reusable logic snippets.
- Logic coverage report before publish.
- Table logic beyond “notify only”; SafetyCulture’s current table logic is limited.

### Epic E — Response sets, flags, and scoring

#### E1. Response sets

Must support:

- Template-level custom response sets.
- Org-level global response sets.
- Bulk import of response options.
- Color, label, icon, score, flag state, sort order.
- Linkable responses across questions.
- Versioned response sets with impact analysis.

SafetyCulture supports custom response sets and global response sets, and lets updates to global sets flow to linked templates.

#### E2. Flags

Must support:

- Default flagged options at response-set level.
- Question-level override.
- Flag severity levels.
- Flag-to-action automation.

SafetyCulture supports flagged responses at custom-response-set or question level.

#### E3. Scoring

Must support:

- Template scoring on/off.
- Question-level scoring.
- Response-level scoring.
- Weighted scoring.
- Negative scoring.
- Excluded-from-score questions.
- Scoring formulas.
- Score preview in builder.
- Analytics-safe handling for negative scoring.

SafetyCulture supports template scoring plus question and response-set scoring, but its scoring support is limited to certain response types and its analytics may not fully support negative scoring.

Requirement to exceed SafetyCulture:

- Score support across all relevant field types, including formulas and tables.
- Better score explainability.
- “What changed” scoring diff after template edits.
- Simulation of max/min/expected score paths.

### Epic F — Sections, repeat sections, and tables

#### F1. Sections

Must support:

- nested sections
- collapsible sections
- drag/drop reorder
- move section into another section
- copy section across templates

SafetyCulture supports sections, subsections, and moving sections into other sections.

#### F2. Repeat sections

Must support:

- repeating any section at runtime
- min/max repeats
- user-defined repeat labels
- formulas that can reference repeated rows/sections safely
- aggregated rollups across repeats

SafetyCulture supports repeat sections, but its calculation docs show edge cases when referencing questions inside repeat sections.

#### F3. Tables

Must support:

- reusable table templates
- more than 5 tables per template
- more than 20 columns
- more than 100 response rows
- logic on all cell types
- copy/paste in tables
- linked responses in and out of tables
- formula columns
- totals/aggregates
- frozen headers
- CSV paste
- mobile-friendly row entry

SafetyCulture’s current table limits are a clear beat-opportunity: 5 tables per template, 20 question columns, 100 rows, notify-only logic, no linked responses, and no copy/paste in tables.

### Epic G — Required fields, validation, and completion rules

Must support:

- required / optional per field
- bulk required/optional toggling
- completion gating
- validation messages
- regex, range, type, dependency validation
- file-type and upload-size validation
- warnings vs hard blocks
- role-based requiredness

SafetyCulture supports marking individual, grouped, or all questions as required, but some fields cannot be required because they are auto-populated or instruction-only.

Requirement to exceed SafetyCulture:

- Rich validation engine.
- Role-sensitive requiredness.
- Conditional validation by context.
- “Why this can’t be completed” debugger.

### Epic H — Calculations and formulas

Must support:

- formulas referencing numbers, sliders, scores, rows, repeats, and aggregates
- functions like sum, avg, min, max, if, and, or, round, date math
- unit-aware formulas
- formula dependency graph
- cycle detection
- preview values

SafetyCulture supports calculation response questions, but only certain question types can be referenced, calculation questions cannot be required, and there are repeat-section edge cases. Older mobile versions may also show formula limitations.

Requirement to exceed SafetyCulture:

- Strong formula editor with autocomplete.
- Error tracing.
- Full repeat/table compatibility.
- Mobile parity.

### Epic I — Reports, numbering, and titles

#### I1. Report configuration

Must support:

- report layouts at template level
- report layouts at org/global level
- PDF export
- Word export
- branded cover pages
- report logos
- public/private share links
- email templates
- conditional report sections

SafetyCulture supports template-specific and org-level report layouts and export flows.

#### I2. Document numbering

Must support:

- auto-incrementing document numbers
- configurable prefix/suffix
- alphanumeric formats
- reset rules by template/site/date

SafetyCulture supports incremental document numbering with customizable formats.

#### I3. Inspection title format

Must support:

- template title inclusion
- title-page variable tokens
- logic-driven values
- multi-select rendering
- preview

SafetyCulture supports title formats using title-page responses, but cannot include the template title and does not fully support multiple-selection rendering in titles.

Requirement to exceed SafetyCulture:

- Template title token.
- Full multi-select support.
- Rich title preview with test data.

### Epic J — Approvals and signoff

Must support:

- approval page creation
- multi-step approval chains
- approver roles/groups
- conditional approval paths
- required signatures
- timestamps
- rejection with comments
- re-submit workflow
- approval SLA timers

SafetyCulture supports approval workflow pages and sets template owners as default approvers for newly created approval pages.

### Epic K — Governance, access, and ownership

Must support:

- template-level access: conduct, edit, archive, delete, publish
- inspection-result access rules
- default org access rules for new templates
- access by user, group, site, company, role
- ownership transfer
- audit trail for permission changes
- protected templates
- environment-based publishing rights

SafetyCulture supports granular template and inspection access, default access rules, and ownership concepts.

Requirement to exceed SafetyCulture:

- Permission inheritance preview.
- Publish approvals.
- “Why does this user have access?” explainer.
- Environment separation: draft / staging / production.

### Epic L — Localization and reuse

Must support:

- multi-language templates
- inline translation editor
- CSV import/export for bulk translation
- machine-assisted translation suggestions
- fallback language behavior
- translation completeness checks
- reusable blocks/components
- global snippets
- shared template collections

SafetyCulture supports multi-language templates through download/edit/upload CSV workflows using language codes.

Requirement to exceed SafetyCulture:

- No CSV-only dependency.
- Side-by-side translation QA.
- “Untranslated string” warnings at publish.
- snippet/component system with dependency map.

### Epic M — Publish, versioning, and rollback

Must support:

- draft state
- autosave
- explicit publish
- publish notes
- semantic versioning
- version compare/diff
- rollback
- archived template restore
- template duplication
- change impact analysis on linked assets, schedules, automations, and reports
- guarantee that published changes affect only new inspections unless a migration is explicitly run

SafetyCulture saves edits in draft, requires publish, and states published changes only apply to new inspections going forward. It also supports duplicate/archive/restore workflows.

Requirement to exceed SafetyCulture:

- Branches.
- Promotion workflow.
- Dry-run migration tool.
- Rollback by click, not archive gymnastics.

### Epic N — Preview, testing, and simulation

Must support:

- desktop preview
- mobile preview
- runtime simulation
- test data injection
- rule coverage report
- unresolved logic warning
- broken reference warning
- unused response-set warning
- localization QA preview
- report preview
- accessibility preview

This is a strategic “better than SafetyCulture” area. Their docs emphasize creation and publishing, but there is room to win by adding a formal preflight/testing system before release. Supported by the breadth of configurable logic, scoring, titles, approvals, and reports they expose, pre-publish validation is essential.

### Epic O — Schedules, APIs, export, and automations

Must support:

- schedule creation from templates
- API to create/read/update/archive templates
- API to start inspections from template
- prefill inspection data
- export to PDF/Word/JSON/CSV
- webhooks for template and inspection events
- deep links
- automation triggers from template logic

SafetyCulture supports schedules from templates, APIs around templates and inspections, exports, deep links, and webhooks for near real-time events.

Requirement to exceed SafetyCulture:

- First-class template CRUD APIs, not just read/archive.
- Webhooks for template version published.
- Sandbox API tokens.
- Event replay and dead-letter handling.

## 9) Non-functional requirements

### Performance

- Open a 500-question template in under 2 seconds on desktop broadband.
- Drag/drop reorder under 100 ms perceived latency.
- Publish validation under 5 seconds for 1,000-question templates.
- Table rendering must virtualize large grids.

### Reliability

- No data loss on refresh, crash, or browser close.
- Offline-capable draft edits on mobile and desktop app.
- Conflict resolution for concurrent edits.

### Security

- RBAC and least privilege.
- Full audit logs for create/edit/publish/archive/restore/access change.
- Encryption in transit and at rest.
- Tenant isolation.
- PII-aware field classification.

### Accessibility

- WCAG 2.2 AA for builder and runtime.
- Full keyboard navigation.
- Screen reader labels for all controls.
- Color-independent flag/severity cues.

### Compliance

- Audit-ready change history.
- Exportable version history.
- Retention rules per org.

### Observability

- Template publish success/fail telemetry.
- Conversion/import quality metrics.
- Rule-evaluation error logging.
- API/webhook delivery monitoring.

## 10) Data model (minimum)

### Entities

- Template
- TemplateVersion
- Page
- Section
- Question
- QuestionType
- ResponseSet
- ResponseOption
- LogicRule
- LogicAction
- ApprovalWorkflow
- ReportLayout
- TitleFormat
- NumberingScheme
- TranslationBundle
- AccessRule
- Folder/Collection
- Schedule
- IntegrationBinding
- TemplateAuditEvent

### Important relationships

- Template has many versions.
- Version has many pages/sections/questions.
- Questions may reference response sets.
- Logic rules reference questions and outcomes.
- Report layouts can be template-specific or global.
- Access rules apply to template and inspection-result scopes.

SafetyCulture’s own developer docs frame the model similarly: templates define the work, inspections are executions, item responses live under inspections, and template access controls use/manage visibility.

## 11) Success metrics

### Adoption

- % of accounts that create a template within first 7 days
- time-to-first-published-template
- templates published per org per month

### Quality

- publish error rate
- post-publish rollback rate
- field completion rate
- logic misfire rate
- translation completeness rate

### Efficiency

- median template creation time
- median edit-to-publish time
- reuse rate of shared response sets/components
- % of templates created from import vs scratch

### Competitive win metrics

- fewer support tickets on template logic/versioning than SafetyCulture-equivalent workflows
- higher builder NPS
- lower publish regret/rollback rate

## 12) Acceptance criteria / Definition of done

A release is complete when a user can:

- Create a template from scratch, by duplication, from import, and from library.
- Add all core field types and title-page fields.
- Configure required/optional rules, flags, scoring, calculations, and logic.
- Add pages, sections, subsections, repeat sections, tables, and approvals.
- Configure report layouts, numbering, and title formats.
- Save drafts, compare versions, publish, rollback, archive, and restore.
- Assign access by user/group/site/role and set org defaults.
- Translate the template into at least 3 languages.
- Preview desktop/mobile/report output before publish.
- Trigger schedules, APIs, exports, and webhooks downstream.

## 13) Where we should deliberately beat SafetyCulture

- **Versioning and undo:** True undo/redo, compare, branch, rollback.
- **Tables:** Remove documented limits around table count, columns, rows, logic, linked responses, and copy/paste.
- **Localization:** Inline translation editor, not just CSV round-trip.
- **Title formatting:** Include template title token and fully support multi-select title rendering.
- **Formula power:** Better repeat/table references and better mobile parity than documented formula edge cases.
- **Pre-publish testing:** Add simulator, linting, impact analysis, and rule coverage.
- **Collaboration:** Real-time co-editing, comments, approvals for publish.
- **AI authoring:** Prompt-to-template, import cleanup, rule suggestions, scoring suggestions, translation assist, field normalization.

## 14) Suggested build phases

### Phase 1 — parity foundation

- scratch create
- duplicate
- import
- pages/sections/questions
- core field types
- custom/global response sets
- required/optional
- flags
- scoring
- logic basics
- report layout basics
- draft/publish
- access basics

### Phase 2 — enterprise readiness

- approvals
- schedules
- translations
- tables
- APIs
- webhooks
- exports
- ownership transfer
- archive/restore
- audit logs

### Phase 3 — better-than-SafetyCulture

- real version diff/rollback/branching
- advanced logic debugger
- inline localization
- strong tables
- simulation/preflight
- AI template copilot
- reusable component library

## 15) Recommended technical guardrails for Codex/devs

- Use a schema-first template model with explicit typed nodes for page, section, question, and logic.
- Keep template version immutable after publish.
- Separate authoring model from runtime inspection model.
- Build a rule engine as a standalone service/library.
- Store response sets and reusable snippets as first-class entities.
- Make the editor optimistic + autosaved, but publish validated + transactional.
- Add a migration layer for old template versions and import conversion.
