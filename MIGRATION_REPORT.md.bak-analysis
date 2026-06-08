# LokoAI Repository Recovery Migration Report

Date: 2026-06-05
Branch prepared: `migration/consolidated-loko-ai`
Target repository: `git@github.com:aryanthealgohype-ux/loko-ai.git`

## Summary

- Real target baseline used: `real-target-https/main` at `6b23e5f`
- Source repository 1: `https://github.com/Cognio-so/loko-ai-.git`
- Source repository 2: `https://github.com/cognio-labs/base-nova.git`
- Consolidated code commit before this report: `28df1ef`
- Production verification: `npm run build` passed on Next.js `16.2.6`
- Push status: blocked by GitHub credentials

## Commits Imported

- `219` commits imported from `source-cognio-so/changes` by fast-forward merge from the real target baseline.
- `1` selective recovery commit created from valid additive `source-base-nova/changes` work:
  - `28df1ef Import additive base-nova recovery assets`
- `220` code/data migration commits are ahead of `real-target-https/main` before adding this report.
- This report adds one documentation commit on top of the migrated code.

## Files Imported Or Changed

Total code/data paths changed versus `real-target-https/main`: `238`.

Major imported areas from `source-cognio-so/changes`:

- App Router pages and API routes:
  - `src/app/api/chat/route.ts`
  - `src/app/api/generate/route.ts`
  - `src/app/api/builder/terminal/route.ts`
  - `src/app/api/files/download/[filename]/route.ts`
  - `src/app/api/presentations/route.ts`
  - `src/app/api/presentations/[id]/route.ts`
  - `src/app/api/projects/route.ts`
  - `src/app/api/projects/[id]/route.ts`
  - `src/app/api/sandbox/route.ts`
  - `src/app/api/save-files/route.ts`
  - `src/app/api/superagents/route.ts`
  - `src/app/api/user/model/route.ts`
- UI/pages/components:
  - `src/components/DashboardWorkspace.tsx`
  - `src/components/BuilderWorkspace.tsx`
  - `src/components/ModelPicker.tsx`
  - `src/components/UniversalChatInterface.tsx`
  - `src/components/UserMenu.tsx`
  - `src/components/AppChrome.tsx`
  - `src/components/AccountPageShell.tsx`
  - `src/components/CollectionAgentLogo.tsx`
  - `src/components/ProfileThemeSync.tsx`
  - `src/app/appearance/*`
  - `src/app/community/*`
  - `src/app/documentation/*`
  - `src/app/profile/*`
  - `src/app/settings/*`
  - `src/app/support/*`
- Model, agent, workflow, prompt, memory, and file-generation logic:
  - `src/lib/openrouter.ts`
  - `src/lib/openrouterAgent.ts`
  - `src/lib/openrouterConfig.ts`
  - `src/lib/openrouterModels.ts`
  - `src/lib/openrouterModelAliases.ts`
  - `src/lib/systemPrompt.ts`
  - `src/lib/skillPrompts.ts`
  - `src/lib/agentSpecialization.ts`
  - `src/lib/promptRouter.ts`
  - `src/lib/fileGenerationEngine.ts`
  - `src/lib/file-generators/*`
  - `src/lib/memory/*`
  - `src/lib/projectMemory.ts`
  - `src/lib/localGeneratedProject.ts`
  - `src/lib/premiumSaasProject.ts`
- Supabase/database changes:
  - `supabase/schema.sql`
  - `supabase/memory_schema.sql`
  - `supabase/migrations/202606030001_account_dropdown_system.sql`
  - `supabase/migrations/202606040001_add_selected_model_to_profiles.sql`
  - `supabase/migrations/202606040002_create_presentations.sql`
  - `src/lib/supabase/*`
- Config/dependencies/assets:
  - `package.json`
  - `package-lock.json`
  - `next.config.ts`
  - `tsconfig.json`
  - `src/proxy.ts`
  - `mcp.config.json`
  - `LOKO_MEMORY_README.md`
  - `scripts/dev-safe.mjs`
  - `scripts/generate-lokoai-investor-deck.cjs`
  - `public/models/*`
  - `public/provider-logos/*`
  - `public/generated-files/*`
  - selected tracked `workspace/*` generated previews

Selective additive files imported from `source-base-nova/changes`:

- `src/components/animations/Reveal.tsx`
- `src/components/buttons/GlowButton.tsx`
- `src/components/cards/GlassCard.tsx`
- `src/components/dashboard/CommandCenterPanel.tsx`
- `src/components/effects/ParticleField.tsx`
- `src/components/landing/PremiumLandingPage.tsx`
- `src/lib/modelRouter.ts`
- `src/services/README.md`
- `src/styles/README.md`
- `src/types/index.ts`
- `src/utils/format.ts`
- scoped CSS support in `src/app/globals.css`

## Conflict Handling

- Full merge conflict count: `0`
- `source-cognio-so/changes` fast-forwarded cleanly from the real target baseline.
- `source-base-nova/changes` was not merged wholesale because it was a divergent older branch that would delete newer valid target/source-cognio work.
- Newer implementation preserved for existing files including:
  - API routes
  - Supabase helpers and migrations
  - generated-file support
  - model logo/provider logo system
  - collection/chat/dashboard UX
  - project memory and presentation generation

## Files Skipped

Skipped from `source-base-nova/changes`:

- `.claude/worktrees/*` local agent metadata
- `openrouter-agent/node_modules/*` tracked dependency directory
- package-lock-only churn from `49bd637` and `687325b`
- older rewrites of:
  - `src/app/page.tsx`
  - `src/app/globals.css`
  - `src/components/BuilderWorkspace.tsx`
  - `src/components/DashboardWorkspace.tsx`
  - `src/lib/openrouter.ts`
  - `src/lib/openrouterAgent.ts`
  - `src/lib/openrouterConfig.ts`
- older deletions that would remove newer valid work from:
  - `src/app/api/*`
  - `src/app/collection/*`
  - `src/components/*`
  - `src/lib/*`
  - `public/models/*`
  - `public/provider-logos/*`
  - `supabase/migrations/*`
  - tracked generated previews under `workspace/*`

## Verification

- Read local Next.js docs under `node_modules/next/dist/docs/01-app/` before editing, per `AGENTS.md`.
- Verified package/dependency state via `package.json` and production build.
- Verified App Router API/page structure by successful Next build route collection.
- Verified TypeScript via `next build`.
- Verified Supabase migrations/config files are present in the consolidated diff.
- Verified API routes, model configuration, prompts, workflow/memory files, assets, and generated-file routes are included in the consolidated diff.

Build command:

```powershell
npm run build
```

Result: passed.

## Manual Review Items

- Push is blocked until the authenticated GitHub identity has write access to `aryanthealgohype-ux/loko-ai`.
  - SSH push failed: `Permission denied (publickey)`.
  - HTTPS push failed: `Permission to aryanthealgohype-ux/loko-ai.git denied to cognio-labs`.
- Three untracked generated workspace folders were left uncommitted because they were not part of the fetched source branches:
  - `workspace/Create-A-Build-Seo-Website-68516320/`
  - `workspace/Create-A-Premium-Lovable-style-Responsive-4e5801bf/`
  - `workspace/Create-A-Saas-Landing-Apge-f952657f/`
- Review whether tracked generated previews under `workspace/*` should remain in production history; they were imported because they are part of `source-cognio-so/changes`.
- Review `public/generated-files/*` binary artifacts for production policy; they were imported because they are part of `source-cognio-so/changes`.
- Rotate any GitHub token that may have been present in the old local `target` remote URL. The local remote was sanitized during this recovery.

## Push Command When Credentials Are Fixed

```powershell
git push real-target HEAD:main
```

Fallback HTTPS command:

```powershell
git push real-target-https HEAD:main
```
