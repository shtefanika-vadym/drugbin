# drugbin

The DrugBin dashboard SPA — CRA 5 + React 18, styled-components, MUI (charts), zustand, SWR.
Conventions: **`CLAUDE.md`**.

## Two roles, two backends

Sign in at `/login` with email + password → `POST /api/v1/auth/login` on the `drugbin-cf` Worker →
a session JWT in `localStorage` (`src/common/state/auth.state.ts`). The `role` decides the nav
(`src/components/layout/TopBlock/`) and what you see:

- **admin** (`ADMIN_EMAIL` in `drugbin-cf`) → the console — **Spitale** (`/admin/spitale`),
  **Roboți** (`/admin/roboti`), **Clasificări** (`/admin/clasificari`, per-step timings, archived
  image, corrections, re-run). Same chrome (`PageWrapper` + `TopBlock`) and UI kit as the rest of
  the app; data from the Worker (`src/api/v2.ts` / `src/common/hooks/admin.ts`).
- **hospital** → the original dashboard: **Statistici** (`/`), **Gestionare** (`/gestionare`),
  **Documente** (`/documents/*`) — served by the **legacy backend** (`src/api/index.ts`).

### API base URLs

| Env var | Client | Serves |
|---|---|---|
| `REACT_APP_API_URL` | `src/api/v2.ts` | the `drugbin-cf` Worker — auth, `/api/v1/admin/*`, `/api/v1/manage/*` |
| `REACT_APP_DRUGBIN_API_BASE_URL` | `src/api/index.ts` | the legacy dashboard backend — `/recycle`, `/documents`, `/statistics`, … |

The legacy backend is a separate project (see `drugbin-cf/docs/16` "What does not move here"). If
you don't run it, the Statistici/Gestionare/Documente pages simply show empty states.

## Develop

```bash
npm install --legacy-peer-deps      # react-scripts 5 peers want TS 4.x
npm start                           # http://localhost:3000 (Worker -> https://api.dev.drugbin.ro)
```

To hit a local `wrangler dev` of the Worker, create `.env.development.local`:

```
REACT_APP_API_URL=http://localhost:8787
```

## Deploy

Cloudflare Workers static assets. The Worker **and its custom domain** live in `wrangler.jsonc`
(`routes` with `custom_domain: true`) — no Terraform step, same as `drugbin-landing` → `drugbin.ro`.

Hostname convention (one `drugbin.ro` zone; see `drugbin-cf/docs/09`):

| | Worker | Domain | `REACT_APP_API_URL` |
|---|---|---|---|
| prod | `drugbin-app` | `app.drugbin.ro` | `api.drugbin.ro` |
| dev | `drugbin-app-dev` | `app.dev.drugbin.ro` | `api.dev.drugbin.ro` |

```bash
npm run deploy         # prod  -> app.drugbin.ro
npm run deploy:dev     # dev   -> app.dev.drugbin.ro
```

The `drugbin-cf` API for the target env must be deployed first (it owns `/api/v1/auth/login`) —
see `drugbin-cf/docs/17` "Standing it up".
