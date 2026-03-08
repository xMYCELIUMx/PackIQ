# PackIQ Senior Software Audit Report

_Date:_ 2026-03-08

## Scope

This audit reviewed repository architecture and implementation across:

- Next.js app routes/pages/components
- API route handlers
- Prisma schema/client configuration
- Type safety and maintainability patterns

## Executive Summary

The project has a clean, understandable structure and consistent UI/component conventions, but there is one **critical runtime blocker** and several high-impact reliability/security gaps.

- **Critical:** Prisma client initialization is incompatible with current Prisma v7 setup, causing API route build/runtime failure.
- **High:** API handlers lack authn/authz boundaries, request validation, and robust error handling.
- **High:** Multi-tenant isolation is not enforced at API boundary (organization scoping is caller-controlled query/body data).
- **Medium:** API contract typing is weak (`Record<string, unknown>`, unvalidated request bodies), increasing defect risk.
- **Medium:** UI pages are mostly static fixture data, so dashboard state does not reflect backend/system truth.

## Detailed Findings

### 1) Critical: Prisma v7 client configuration is not deploy-ready

**Evidence**

- Schema datasource omits URL field (required in older Prisma, removed in Prisma 7): `datasource db { provider = "postgresql" }`. 
- Prisma client singleton is constructed without any runtime adapter configuration: `new PrismaClient()`. 

**Impact**

- API routes that import the Prisma client fail during build/runtime when route modules are loaded.
- This blocks production deployment and prevents server route execution.

**References**

- `prisma/schema.prisma` datasource definition.
- `src/lib/prisma.ts` singleton construction.

**Recommendation**

- Align fully to Prisma 7 runtime model:
  - Add and configure an official adapter package (e.g. `@prisma/adapter-pg`) and underlying driver.
  - Instantiate with `new PrismaClient({ adapter: ... })`.
  - Add startup self-check and fail-fast message with remediation hint.

---

### 2) High: Missing authentication and authorization boundaries on API routes

**Evidence**

- All route handlers accept user-controlled query/body parameters directly and perform DB queries/creates with no verified identity context.
- Only one endpoint includes partial role check (`actions` POST), and it still trusts `creatorId` from request body.

**Impact**

- Unauthorized reads/writes are possible.
- Caller can impersonate users by submitting another user's ID.

**References**

- `src/app/api/actions/route.ts`
- `src/app/api/cars/route.ts`
- `src/app/api/issues/route.ts`
- `src/app/api/inspections/route.ts`
- `src/app/api/templates/route.ts`
- `src/app/api/vendors/route.ts`
- `src/app/api/analytics/route.ts`

**Recommendation**

- Enforce session/JWT middleware.
- Derive actor identity from auth context only (never from body).
- Centralize RBAC checks and apply consistently per route/method.

---

### 3) High: Multi-tenant data isolation is not enforced

**Evidence**

- Organization/site/vendor filters are optional and caller-provided.
- Queries can run with broad scope when query params are omitted.

**Impact**

- Cross-tenant data exposure risk.
- Potential compliance/security incident in shared environments.

**References**

- `src/app/api/templates/route.ts`
- `src/app/api/vendors/route.ts`
- `src/app/api/issues/route.ts`
- `src/app/api/inspections/route.ts`

**Recommendation**

- Require tenant context from authenticated session.
- Inject immutable tenant filters server-side into all read/write operations.
- Add integration tests proving tenant boundary enforcement.

---

### 4) High: Request validation and error handling are insufficient

**Evidence**

- Raw `await request.json()` is used with direct property access.
- No schema-level validation, no typed request DTO guards, no `try/catch` with standardized error responses.

**Impact**

- Runtime exceptions from malformed payloads.
- Inconsistent client error behavior and difficult observability.

**References**

- All API route files under `src/app/api/*/route.ts`.

**Recommendation**

- Add input validation layer (schema-based).
- Standardize API responses (`{ error: { code, message, details } }`).
- Add centralized route helper for exception handling and logging.

---

### 5) Medium: Weak type strictness in filtering/query construction

**Evidence**

- `where` clauses typed as `Record<string, unknown>`.

**Impact**

- Reduced compile-time safety and easier field drift/regressions.

**References**

- Multiple API routes under `src/app/api/*/route.ts`.

**Recommendation**

- Use generated Prisma `WhereInput` types directly per model.
- Add enum parsing for query strings before assignment.

---

### 6) Medium: Frontend dashboard pages are static data stubs

**Evidence**

- Dashboard module pages define hardcoded arrays/values and do not integrate API data.

**Impact**

- Product can appear functional while not representing system state.
- Increased integration risk later due to divergence of UI assumptions and API contracts.

**References**

- `src/app/(dashboard)/*/page.tsx`

**Recommendation**

- Introduce typed API client hooks.
- Replace fixture constants with server-fetched data + loading/error/empty states.

## Prioritized Remediation Plan

1. **P0 (Immediate):** Fix Prisma v7 adapter/client setup; unblock builds and route execution.
2. **P0 (Immediate):** Add auth middleware + tenant context enforcement across all API routes.
3. **P1:** Implement request validation and standardized error handling in every route.
4. **P1:** Replace untyped `Record<string, unknown>` filters with Prisma types + enum coercion.
5. **P2:** Migrate dashboard pages from static fixtures to real API-backed data flow.
6. **P2:** Add API integration tests for RBAC, tenant isolation, and invalid payload handling.

## Positive Notes

- Clear domain modeling in Prisma schema for inspections/issues/CAR/actions lifecycle.
- Consistent design system primitives (`Button`, `Card`, `Badge`, `StatusBadge`) and clean Tailwind usage.
- Logical app/module structure that should scale once runtime and API governance issues are addressed.
