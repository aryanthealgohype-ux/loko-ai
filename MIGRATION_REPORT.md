# LokoAI Backend Migration Report

Date: 2026-06-08
Scope: Initial repository analysis and migration strategy only.
Status: No backend conversion performed yet.

## Executive Summary

This repository is a Next.js 16.2.6 App Router application with a React/Tailwind frontend and substantial backend/business logic embedded in App Router route handlers and `src/lib` server-only modules. The frontend must remain unchanged. A production-safe Python migration should therefore introduce a FastAPI backend that mirrors the existing `/api/*` and `/auth/callback` behavior while leaving all pages, layouts, components, styling, animations, and client workflows intact.

The migration is feasible, but several areas are high risk and require a stop/go decision before code conversion:

- Supabase auth currently depends on Next.js SSR cookie helpers. FastAPI must preserve the same session cookie behavior or authenticated frontend flows will break.
- `/api/chat`, `/api/generate`, `/api/superagents`, and `/api/sandbox` contain orchestration/business logic directly in route files, not thin controllers.
- E2B sandbox execution depends on the Node SDK and generated Vite project behavior.
- File generation uses Node-only libraries for PPTX, DOCX, PDF, XLSX, ZIP, and buffers.
- The frontend currently calls relative `/api/...` URLs. API compatibility can be preserved either with Next.js rewrites/proxying to FastAPI or by serving FastAPI behind the same origin/path.

## Preservation Rules

The migration must preserve:

- All frontend routes under `src/app`.
- All React components under `src/components`.
- All design system files under `src/design-system`.
- All Tailwind/global styling under `src/app/globals.css`.
- All animations, visual behavior, app chrome behavior, and responsive layouts.
- All Supabase auth, profile, projects, presentations, memory, support, community, and storage behavior.
- All OpenRouter, Gemini, E2B, file generation, generated project, sandbox, and agent workflows.
- All request bodies, response bodies, status codes, CORS/security headers, rate limits, and error shapes.

## Repository Classification

### Frontend Files To Keep Unchanged

Primary app routes:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/loading.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/workspace/page.tsx`
- `src/app/create/page.tsx`
- `src/app/generate/page.tsx`
- `src/app/login/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/settings/page.tsx`
- `src/app/appearance/page.tsx`
- `src/app/community/page.tsx`
- `src/app/support/page.tsx`
- `src/app/documentation/page.tsx`
- `src/app/integrations/page.tsx`
- `src/app/partners/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/affiliate/page.tsx`
- `src/app/launchpad/page.tsx`
- `src/app/build/[id]/page.tsx`
- `src/app/collection/page.tsx`
- `src/app/collection/[slug]/page.tsx`

Primary frontend components:

- `src/components/DashboardWorkspace.tsx`
- `src/components/BuilderWorkspace.tsx`
- `src/components/UniversalChatInterface.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/AppChrome.tsx`
- `src/components/AuthPanel.tsx`
- `src/components/AuthModal.tsx`
- `src/components/UserMenu.tsx`
- `src/components/ModelPicker.tsx`
- `src/components/FileExplorer.tsx`
- `src/components/PreviewFrame.tsx`
- `src/components/ProjectList.tsx`
- `src/components/SuperagentDashboard.tsx`
- `src/components/ui/*`
- `src/components/dashboard/*`
- `src/components/landing/*`
- `src/components/animations/*`
- `src/components/effects/*`

Client-side Supabase/UI files that should remain in TypeScript unless explicitly split later:

- `src/hooks/useAuth.tsx`
- `src/lib/supabase/client.ts`
- `src/app/profile/AvatarUploadClient.tsx`
- `src/app/community/CommunityClient.tsx`
- `src/app/settings/SettingsClient.tsx`
- `src/app/support/SupportClient.tsx`
- `src/app/collection/[slug]/CollectionChatShell.tsx`

### Backend/API Files To Migrate To FastAPI

Route handlers:

- `src/app/api/chat/route.ts`
- `src/app/api/generate/route.ts`
- `src/app/api/superagents/route.ts`
- `src/app/api/sandbox/route.ts`
- `src/app/api/builder/terminal/route.ts`
- `src/app/api/projects/route.ts`
- `src/app/api/projects/[id]/route.ts`
- `src/app/api/presentations/route.ts`
- `src/app/api/presentations/[id]/route.ts`
- `src/app/api/save-files/route.ts`
- `src/app/api/files/download/[filename]/route.ts`
- `src/app/api/user/model/route.ts`
- `src/app/api/debug/route.ts`
- `src/app/auth/callback/route.ts`

Server/business logic modules:

- `src/lib/ai.ts`
- `src/lib/openrouter.ts`
- `src/lib/openrouterAgent.ts`
- `src/lib/openrouterConfig.ts`
- `src/lib/openrouterModelAliases.ts`
- `src/lib/modelRouter.ts`
- `src/lib/gemini.ts`
- `src/lib/security.ts`
- `src/lib/rate-limit.ts`
- `src/lib/api.ts`
- `src/lib/file-analysis.ts`
- `src/lib/fileGenerationEngine.ts`
- `src/lib/file-generators/*`
- `src/lib/storage/generated-files.ts`
- `src/lib/terminalExecutor.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/projects.ts`
- `src/lib/supabase/presentations.ts`
- `src/lib/supabase/middleware.ts`
- `src/lib/supabase/config.ts`
- `src/lib/memory/memoryManager.ts`
- `src/lib/memory/buildSystemPrompt.ts`
- `src/lib/agentSpecialization.ts`
- `src/lib/generationIntent.ts`
- `src/lib/promptRouter.ts`
- `src/lib/localGeneratedProject.ts`
- `src/lib/premiumSaasProject.ts`
- `src/lib/lokoAiStandards.ts`
- `src/lib/systemPrompt.ts`
- `src/lib/skillPrompts.ts`
- `src/lib/projectMemory.ts`
- `src/lib/project-history.ts`
- `src/lib/builder-session.ts`
- `src/lib/themeEngine.ts`
- `src/lib/layoutEngine.ts`

### Shared Utilities To Evaluate Before Moving

These are imported by frontend and/or backend and must not be blindly removed from TypeScript:

- `src/lib/utils.ts`
- `src/types/index.ts`
- `src/utils/format.ts`
- `src/data/integrations.ts`
- `src/data/partners.ts`
- `src/app/collection/collection-data.ts`
- `src/config/modelLogos.ts`
- `src/templates/index.ts`
- `src/sections/index.ts`
- `src/design-system/*`

## API Compatibility Map

FastAPI must expose the same effective paths, methods, payloads, responses, and status codes.

| Existing endpoint | Methods | Current responsibilities | Proposed FastAPI module |
| --- | --- | --- | --- |
| `/api/chat` | POST, OPTIONS | Chat orchestration, model routing, web/image/video tools, memory writes, project persistence, generated files | `backend/routes/chat.py`, `backend/services/ai.py`, `backend/agents/*`, `backend/database/memory.py` |
| `/api/generate` | POST, OPTIONS | Website/app generation and edit flow, AI JSON parsing, workspace writes | `backend/routes/generate.py`, `backend/services/generation.py` |
| `/api/superagents` | POST, OPTIONS | Multi-agent design generation/editing, local design docs, auto-save to projects | `backend/routes/superagents.py`, `backend/agents/superagents.py` |
| `/api/sandbox` | POST, OPTIONS | E2B sandbox create/reconnect/update, Vite boot, preview URL, sandbox_id persistence | `backend/routes/sandbox.py`, `backend/services/sandbox.py` |
| `/api/builder/terminal` | POST, OPTIONS | Restricted command execution in `workspace/` | `backend/routes/terminal.py`, `backend/services/terminal.py` |
| `/api/projects` | GET, POST, OPTIONS | List/create owner-scoped projects | `backend/routes/projects.py`, `backend/database/projects.py` |
| `/api/projects/{id}` | GET, PUT, DELETE, OPTIONS | Fetch/update/delete project by id | `backend/routes/projects.py`, `backend/database/projects.py` |
| `/api/presentations` | GET, POST, OPTIONS | List PPTX history, generate presentation file | `backend/routes/presentations.py`, `backend/services/files.py`, `backend/database/presentations.py` |
| `/api/presentations/{id}` | PATCH, DELETE, OPTIONS | Update/delete presentation metadata | `backend/routes/presentations.py` |
| `/api/save-files` | POST, OPTIONS | Persist generated files to `generated/` and Supabase projects | `backend/routes/files.py`, `backend/services/workspace_files.py` |
| `/api/files/download/{filename}` | GET | Read generated file bytes with correct headers | `backend/routes/files.py`, `backend/services/generated_files.py` |
| `/api/user/model` | POST | Persist selected model on profile | `backend/routes/user.py`, `backend/database/profiles.py` |
| `/api/debug` | POST | Gemini-based code repair/debug output | `backend/routes/debug.py`, `backend/services/gemini.py` |
| `/auth/callback` | GET | Supabase OAuth code exchange and redirects | `backend/auth/routes.py` or preserved Next route proxy |

## Frontend API Consumers

Existing frontend code calls relative API paths. These calls must continue to work:

- `src/components/DashboardWorkspace.tsx`: `/api/presentations`, `/api/projects`, `/api/sandbox`, `/api/generate`, `/api/chat`
- `src/components/BuilderWorkspace.tsx`: `/api/projects/{id}`, `/api/sandbox`
- `src/components/UniversalChatInterface.tsx`: `/api/chat`
- `src/components/ModelPicker.tsx`: `/api/user/model`
- `src/components/ProjectList.tsx`: `/api/projects/{id}`
- `src/app/create/page.tsx`: `/api/projects`
- `src/app/collection/[slug]/CollectionChatShell.tsx`: `/api/chat`
- `src/lib/store.ts`: `/api/superagents`, `/api/save-files`, `/api/debug`
- `src/lib/storage/generated-files.ts`: `/api/files/download/{filename}`

Compatibility requirement: do not change these frontend fetch URLs unless using invisible Next rewrites that keep browser-visible paths identical.

## Dependency Map

### Runtime Dependencies

- Next.js 16.2.6, React 19.2.4, Tailwind 4.
- Supabase SSR and browser clients: `@supabase/ssr`, `@supabase/supabase-js`.
- AI providers: OpenRouter via fetch, OpenRouter Agent SDK, Gemini via `@google/generative-ai`, OpenAI package present.
- Sandbox: `e2b`.
- File generation: `docx`, `exceljs`, `pdf-lib`, `pptxgenjs`, `jszip`.
- Builder execution: Node `child_process.spawn`.
- Local persistence: filesystem writes under `workspace/`, `generated/`, `public/generated-files/`.
- State/UI: Zustand, Framer Motion, Radix UI, shadcn, lucide-react, Monaco/Sandpack.

### Database Dependencies

Supabase schemas and migrations define:

- `profiles`
- `profile_settings`
- `support_tickets`
- `community_posts`
- `projects`
- `presentations`
- `short_term_memory`
- `long_term_memory`
- `episodic_memory`
- `working_memory`
- Supabase Storage bucket: `avatars`

RLS policies are owner-scoped for profiles/projects/presentations/memory-adjacent data and public/author-scoped for community/support as defined in SQL migrations.

### Environment Variables

Must be preserved and exposed to the correct runtime:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENROUTER_API_KEY`
- `OPENROUTER_BASE_URL`
- `OPENROUTER_API_URL`
- `OPENROUTER_MODEL`
- `OPENROUTER_MODELS`
- `OPENROUTER_WEBSITE_MODELS`
- `OPENROUTER_CODER_MODELS`
- `OPENROUTER_SEARCH_MODELS`
- `OPENROUTER_IMAGE_MODELS`
- `OPENROUTER_IMAGE_GENERATION_MODEL`
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `GOOGLE_API_KEY`
- `GOOGLE_GENERATIVE_AI_MODEL`
- `AI_PROVIDER`
- `FAST_MODEL`
- `SMART_MODEL`
- `REASONING_MODEL`
- `BIG_CONTEXT_MODEL`
- `IMAGE_SIZE`
- `IMAGE_QUALITY`
- `IMAGE_STYLE`
- `ENABLE_MODEL_FALLBACK`
- `ENABLE_AUTO_RETRY`
- `ENABLE_SMART_ROUTING`
- `ENABLE_STREAMING`
- `ENABLE_WEB_SEARCH`
- `ENABLE_DEEP_SEARCH`
- `ENABLE_CITATIONS`
- `CHAT_TEMPERATURE`
- `CODER_TEMPERATURE`
- `SEARCH_TEMPERATURE`
- `MAX_OUTPUT_TOKENS`
- `MAX_CONTEXT_TOKENS`
- `E2B_API_KEY`
- `E2B_SANDBOX_TIMEOUT_MINUTES`
- `BUILDER_TERMINAL_API_ENABLED`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_URL`
- `VERCEL_URL`
- `NODE_ENV`
- `SUPABASE_ACCESS_TOKEN` for scripts only

## Proposed FastAPI Structure

Create this structure only after approval:

```text
backend/
  main.py
  routes/
    chat.py
    generate.py
    superagents.py
    sandbox.py
    terminal.py
    projects.py
    presentations.py
    files.py
    user.py
    debug.py
  services/
    ai.py
    openrouter.py
    gemini.py
    generation.py
    file_generation.py
    file_analysis.py
    generated_files.py
    workspace_files.py
    sandbox.py
    terminal.py
    security.py
  agents/
    specialization.py
    prompts.py
    superagents.py
    memory_prompt.py
  auth/
    dependencies.py
    routes.py
    supabase.py
  database/
    supabase.py
    projects.py
    presentations.py
    profiles.py
    memory.py
  middleware/
    cors.py
    rate_limit.py
    errors.py
```

## Migration Strategy

1. Freeze baseline.
   - Keep current frontend untouched.
   - Record current route list, endpoint contracts, env vars, and Supabase schema.
   - Keep `MIGRATION_REPORT.md.bak-analysis` as the pre-report backup.

2. Add FastAPI sidecar without changing behavior.
   - Create `backend/` skeleton.
   - Add Python dependency manifest only after approving exact libraries.
   - Implement health endpoint first outside the existing `/api/*` contract.

3. Port infrastructure services.
   - CORS/security headers from `src/lib/security.ts`.
   - Rate limiter from `src/lib/rate-limit.ts`.
   - Supabase auth/session helpers from `src/lib/supabase/server.ts`.
   - Shared response helpers from `src/lib/api.ts`.

4. Port database services.
   - Projects, presentations, profiles, and memory modules.
   - Preserve RLS/user ownership behavior.
   - Verify all JSON serialization matches the TypeScript version.

5. Port low-risk routes.
   - `/api/projects`
   - `/api/projects/{id}`
   - `/api/presentations/{id}`
   - `/api/user/model`
   - `/api/files/download/{filename}`

6. Port file and generation services.
   - Generated file storage.
   - PPTX/DOCX/PDF/XLSX/CSV/TXT/MD/JSON generation.
   - File analysis/parsing.
   - Workspace write path safety.

7. Port AI orchestration.
   - OpenRouter config/model aliasing.
   - Gemini fallback.
   - Chat payload building.
   - Image/video generation and polling.
   - Agent specialization and memory context.

8. Port high-risk routes last.
   - `/api/chat`
   - `/api/generate`
   - `/api/superagents`
   - `/api/sandbox`
   - `/api/builder/terminal`

9. Wire compatibility.
   - Either configure Next.js rewrites from `/api/*` to FastAPI or serve FastAPI under the same origin.
   - Preserve `/auth/callback` behavior exactly.

10. Verify per route.
   - Compare status codes.
   - Compare JSON key names and null/empty behavior.
   - Compare auth-required behavior.
   - Compare CORS/security/rate-limit behavior.
   - Compare filesystem side effects.
   - Compare Supabase row mutations.

## Conversion Map

No files have been converted yet. Proposed first conversion wave:

| Original file path | New Python file path | Explanation | Dependency impact |
| --- | --- | --- | --- |
| `src/lib/security.ts` | `backend/services/security.py`, `backend/middleware/cors.py`, `backend/middleware/rate_limit.py` | Port CORS, origin validation, JSON body limits, guarded route behavior | Required by every migrated route |
| `src/lib/supabase/server.ts` | `backend/auth/supabase.py`, `backend/database/supabase.py` | Port Supabase client creation and current-user lookup | High auth/session impact |
| `src/lib/supabase/projects.ts` | `backend/database/projects.py` | Port project CRUD and missing-table fallback behavior | Required by projects/chat/generate/sandbox |
| `src/lib/supabase/presentations.ts` | `backend/database/presentations.py` | Port presentation CRUD and missing-table fallback behavior | Required by presentations/file generation |
| `src/app/api/projects/route.ts` | `backend/routes/projects.py` | Port `GET /api/projects`, `POST /api/projects` | Low-risk first route after auth |
| `src/app/api/projects/[id]/route.ts` | `backend/routes/projects.py` | Port `GET/PUT/DELETE /api/projects/{id}` | Depends on project DB service |
| `src/app/api/files/download/[filename]/route.ts` | `backend/routes/files.py` | Port generated-file download behavior | Depends on generated file storage |

High-risk later conversion wave:

| Original file path | New Python file path | Explanation | Dependency impact |
| --- | --- | --- | --- |
| `src/app/api/chat/route.ts` | `backend/routes/chat.py`, `backend/services/ai.py`, `backend/agents/*` | Largest orchestration path: chat, tools, memory, file generation, projects | Highest compatibility risk |
| `src/app/api/sandbox/route.ts` | `backend/routes/sandbox.py`, `backend/services/sandbox.py` | E2B lifecycle and Vite dev server management | SDK/runtime parity risk |
| `src/app/api/generate/route.ts` | `backend/routes/generate.py`, `backend/services/generation.py` | Project generation/editing and workspace writes | Prompt/output parity risk |
| `src/app/api/superagents/route.ts` | `backend/routes/superagents.py`, `backend/agents/superagents.py` | Multi-agent design generation and internal auto-save | Prompt/output parity risk |
| `src/lib/file-generators/*` | `backend/services/file_generation.py` plus format modules | Recreate document generation formats | Library output parity risk |

## Risks That Require Stop Before Conversion

Do not start code conversion until these are explicitly accepted:

1. Supabase SSR auth risk.
   - Current code uses Next cookies via `@supabase/ssr`.
   - FastAPI must read/write equivalent Supabase auth cookies and preserve OAuth callback behavior.
   - If this is wrong, login, profile, projects, and authenticated API calls break.

2. Same-origin API routing risk.
   - Frontend uses relative `/api/*`.
   - FastAPI must be mounted/proxied behind the same visible paths.
   - Directly changing frontend URLs would violate the no-UI/no-workflow-change rule.

3. E2B SDK parity risk.
   - Current implementation uses the JavaScript `e2b` SDK.
   - Python support and method parity must be confirmed before replacing `/api/sandbox`.

4. Document generation parity risk.
   - Current output depends on Node libraries and exact buffer/file handling.
   - Python libraries may produce visually different PPTX/DOCX/PDF/XLSX files.

5. AI prompt/output risk.
   - The app relies on large embedded prompts and strict JSON parsing.
   - Small prompt or schema changes can alter generated UI/projects.

6. Filesystem side-effect risk.
   - Current app writes under `workspace/`, `generated/`, and `public/generated-files/`.
   - Python paths must preserve safety checks and output locations.

7. Next proxy/security risk.
   - `src/proxy.ts` and Supabase route protection remain part of the Next app.
   - Authorization must still be revalidated in backend routes, not only in proxy.

## Verification Requirements

For every migrated file/route:

- Import verification: Python imports resolve and no circular dependencies.
- Dependency verification: equivalent Python package exists and is pinned.
- Runtime verification: local FastAPI route starts and handles representative requests.
- API compatibility verification: same request structure, response keys, status codes, headers.
- Auth verification: unauthenticated and authenticated cases match current behavior.
- Database verification: Supabase row reads/writes match current TypeScript behavior.
- Filesystem verification: generated files use the same relative paths and download URLs.
- Agent verification: prompts, model selection, fallback, memory, and workflow logs match.

## Recommended Next Step

Stop here for review. The next approved step should be a no-behavior-change scaffold:

- Create `backend/` with empty FastAPI app and health route.
- Do not remove or replace any Next.js API route yet.
- Add a local-only compatibility test plan for the existing TypeScript endpoints before porting the first route.

