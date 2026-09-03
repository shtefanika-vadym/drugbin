# drugbin

The DrugBin dashboard SPA. CRA 5 · React 18 · TypeScript · **styled-components 5** · MUI 5 (charts
only) · zustand · SWR · react-hook-form + yup · react-router-dom 6. Romanian UI.

## Golden rule: reuse what's already here

**Before adding anything, look for an existing pattern and follow it.** This repo has a full design
system and UI kit; new code that reinvents them will be rejected.

- **Styling:** styled-components only. Never inline `style={{}}`, never raw px/hex/rem. Use the
  tokens in `src/common/styles/` — `size.ts` (`WDS_SIZE_016_PX` …), `colors.ts` (`WDS_COLOR_BLUE_300`
  …), `typography.ts` — and the mixins in `src/common/styles/mixins/` (`flex`, `grid`, `ellipsis`,
  `textVariant`). Every component keeps its styles in a sibling `*.styled.ts`.
- **Text:** `<Text variant='titleH4' | 'subheading' | 'bodyM' | 'bodyS' | 'bodyXS' | …>` — never a
  bare `<p>`/`<span>` with a font-size.
- **UI kit** (`src/components/ui/`): `Button`, `Input`, `LabeledInput`, `Select`, `Dialog` +
  `useDialog`, `Tabs`, `Table` (+ `TableHeaderRow` / `TableHeaderCell` / `TableRow` / `TableCell`),
  `Tag`, `Pagination`, `Empty`, `CopyText`, `ValidationMessage`, `Text`, `Show`, `DatePicker`,
  `Spinner`. Reach for these first.
- **Confirmations:** never `window.confirm`. `ConfirmProvider` wraps the app (`src/app/App.tsx`);
  `const confirm = useConfirm()` → `if (!(await confirm({ title, description?, confirmLabel?, danger? }))) return`.
  It renders above open dialogs and won't dismiss the one underneath.
- **Admin list screens:** `useListQuery()` keeps `page` / `q` (search) / filters in the URL;
  `<PageControls>` is the count + 10/20/30 size picker + `<Pagination>` strip.
- **Layout:** a page is `<PageWrapper>` (renders `TopBlock` nav + `Content` card). List pages
  follow `src/components/admin/Classifications.tsx`: `<Text titleH4>` title → filters →
  `<Table configDesktop={{ itemGridCols }} breakpoints={useBreakpoints()}>` → `<PageControls>`.
- **Data:** SWR through **one** axios instance — `src/api/v2.ts` (`apiV2`) → the drugbin-cf Worker
  (`REACT_APP_API_URL`, `/api/v1/*`). The old `src/api/index.ts` legacy-dashboard client is gone
  (drugbin-cf docs/18): Statistici / Gestionare / Documente now run on `/api/v1/manage/*`.
- **Hooks:** `useBreakpoints`, `usePagination`, `useDialog`, `useToggle`, `useData`.
- **Absolute imports** from `src` (`baseUrl: src`). No `../../..`.
- **Language:** all user-facing strings in Romanian, matching the tone of the existing screens.

## How to work on this repo

**Skills — invoke before touching UI, not after:**

- `superpowers:brainstorming` — before **any** feature, behaviour change, or new screen. Explore
  intent and requirements first; do not go straight to code.
- `impeccable:impeccable` and the `taste-skill:*` family — for visual direction, redesigns, polish,
  and "make this feel like a real product" work. They set the aesthetic POV.
- `web-design-guidelines` — review the UI code for accessibility / UX / responsive correctness
  before calling a piece of work done.
- `artifact-design` — whenever the deliverable is a design pitch, mockup, or comparison artifact.
- `superpowers:writing-plans` + `superpowers:subagent-driven-development` — for multi-step work;
  spec → plan → task-by-task execution with review between tasks. (The Clasificări approval
  rework was built this way — spec + plan live in the `drugbin-cf` repo under
  `docs/superpowers/`.)
- This is a **CRA 5 + React 18** SPA, **not Next.js** — Next.js-specific guideline skills do not
  apply; use the React / frontend / design skills above.

**Follow the app's own system design.** The existing UI kit (`src/components/ui/`), the
`src/common/styles/` tokens, the `TopBlock` / `PageWrapper` chrome, and the list-screen pattern in
`src/components/admin/Classifications.tsx` are the source of truth. Extend that system; never
reinvent it or drop in a look that ignores it. Match the incumbent screens' density, spacing, and
tone.

**This is a SaaS product.** When proposing any in-app solution or screen, frame the options as
recognised SaaS design patterns — data-grid with bulk actions, review queue, status board, card
gallery, dashboard + side drawer, segmented status filters, sticky action bars, empty/loading
states — not bespoke one-off layouts.

**Refactoring / redesign requests → propose 5 variants first.** Never jump straight to code for a
"redesign this" or "refactor this screen" ask. Present **5 distinct directions** (each a real SaaS
design direction, with trade-offs and a recommendation), get a pick, then plan and implement.

**Commit per unit of work.** Commit — and push — each time a coherent piece is finished (one
component, one screen section, one fix), not in one large batch at the end. The husky pre-commit
hook is broken (expects yarn); run `npm run types-check` yourself, then
`git commit --no-verify`.

## Two roles

Sign-in (`/login`, email + password) hits `POST /api/v1/auth/login` on the Worker and returns a
`role`. See `src/common/state/auth.state.ts`, `src/common/hooks/auth.ts`.

- **admin** → `/admin/{spitale,roboti,clasificari}` — the admin console. Talks to the Worker
  (`apiV2` / `src/common/hooks/admin.ts`). Same chrome as the rest of the app: `PageWrapper` +
  a role-aware `TopBlock` nav.
- **hospital** → **Statistici** (`/`), **Gestionare** (`/gestionare`, its own classifications
  list), **Documente** (`/documents/*`, procese verbale) — all on the Worker (`apiV2`,
  `/api/v1/manage/*`; hooks `dashboard.ts` / `documents.ts`), plus **Profil** (`/profil`).

`TopBlock` (`src/components/layout/TopBlock/`) renders the admin nav or the hospital nav depending
on `useAuthState().role`.

## Commands

```bash
npm install --legacy-peer-deps   # react-scripts 5 pins TS 4.x; MUI needs @emotion/*
npm start                        # http://localhost:3000
npm run types-check              # tsc --noEmit
npm run shots                    # playwright screenshots of the admin console (needs npm start running)
npm run deploy                   # build + wrangler deploy  -> app.drugbin.ro   (drugbin-app)
npm run deploy:dev               # build (dev API) + deploy  -> app.dev.drugbin.ro (drugbin-app-dev)
```

Local Worker: put `REACT_APP_API_URL=http://localhost:8787` in `.env.development.local` and run
`npm run dev` in the `drugbin-cf` repo.

## Deploy

Cloudflare Workers static assets. The Worker **and** its `app[.dev].drugbin.ro` custom domain are
declared in `wrangler.jsonc` (`routes` + `custom_domain: true`) — no Terraform. Deploy the matching
`drugbin-cf` API env first (`drugbin-cf/docs/17`).
