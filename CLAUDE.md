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
  follow `src/components/management/Management.tsx` exactly: `<Text titleH4>` title → search `Input`
  → `<Table configDesktop={{ itemGridCols }} breakpoints={useBreakpoints()}>` → `Pagination`.
- **Data:** SWR through an axios instance. `src/api/index.ts` (`api`) → the legacy dashboard
  backend (`REACT_APP_DRUGBIN_API_BASE_URL`, `/recycle`, `/documents`, `/statistics`).
  `src/api/v2.ts` (`apiV2`) → the drugbin-cf Worker (`REACT_APP_API_URL`, `/api/v1/*`).
- **Hooks:** `useBreakpoints`, `usePagination`, `useDialog`, `useToggle`, `useData`.
- **Absolute imports** from `src` (`baseUrl: src`). No `../../..`.
- **Language:** all user-facing strings in Romanian, matching the tone of the existing screens.

## Two roles

Sign-in (`/login`, email + password) hits `POST /api/v1/auth/login` on the Worker and returns a
`role`. See `src/common/state/auth.state.ts`, `src/common/hooks/auth.ts`.

- **admin** → `/admin/{spitale,roboti,clasificari}` — the admin console. Talks to the Worker
  (`apiV2` / `src/common/hooks/admin.ts`). Same chrome as the rest of the app: `PageWrapper` +
  a role-aware `TopBlock` nav.
- **hospital** → the original dashboard: **Statistici** (`/`), **Gestionare** (`/gestionare`),
  **Documente** (`/documents/*`) — served by the legacy backend (`api`).

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
