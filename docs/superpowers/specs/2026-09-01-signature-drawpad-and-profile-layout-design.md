# Signature draw-pad, `signatoryName` removal, profile-page layout

Date: 2026-09-01
Repos: `drugbin` (SPA), `drugbin-cf` (Worker + D1)

## Goal

1. Remove the "Nume semnatar" (`signatoryName`) concept from the API, the DB, and the PV renderer.
2. Replace the signature **file upload** with a **draw-it-yourself pad** (mouse + touch), keeping a
   small "upload an image instead" fallback.
3. Remove the admin-side signature endpoints entirely — a hospital owns its own signature.
4. Rework the `/profil` page layout and fix the horizontal + vertical scrollbars it shows.

## 1 — `drugbin-cf`: drop `signatoryName`

### DB

- `src/db/schema.ts` — delete `signatoryName: text('signatory_name')` from the `hospital` table;
  fix the block comment.
- `npm run db:generate` → `migrations/0004_*.sql` containing
  `ALTER TABLE \`hospital\` DROP COLUMN \`signatory_name\`;`
- Applied to dev + prod D1 by `.github/actions/deploy-env` (`wrangler d1 migrations apply
drugbin-<env>-audit --remote`) before `wrangler deploy`.

### Code

- `src/db/queries.ts`
  - `hospitalView` — drop `signatoryName` from the destructure and the returned `signature` object
    (`{ present, updatedAt }`).
  - `setHospitalSignature` — `values: { signatureKey: string }`.
  - `clearHospitalSignature` — drop `signatoryName: null` from `.set(...)`.
- `src/lib/signature.ts` — delete `cleanSignatoryName`; `storeSignature` loses the `signatoryName`
  parameter and returns `{ present, updatedAt }`.
- `src/routes/hospital.ts` — PUT `/signature` body schema is `z.object({ image })` only; the handler
  drops the `cleanSignatoryName` call; `meta()` returns `{ present, updatedAt }`.
- `src/schema/hospital.ts` — `SignatureMetaSchema` loses `signatoryName`.
- `src/lib/pv.ts` — `renderInputFor` stops passing `signatoryName`.
- `src/lib/pdf/verbal-process.ts` — drop `signatoryName` from `PvRenderInput`; line ~154 becomes
  `const signatory = input.hospitalName;` (the fallback that already existed).
- `npm run openapi:generate` to refresh `openapi/openapi.yaml`.
- `test/hospital.test.ts`, `test/pdf.test.ts` — drop `signatoryName` fields/assertions.

## 2 — `drugbin-cf`: remove admin signature endpoints

- `src/routes/admin-hospitals.ts` — delete `getSignatureRoute`, `putSignatureRoute`,
  `deleteSignatureRoute` and their `.openapi(...)` handlers; drop the now-unused imports
  (`validateSignature`, `storeSignature`, `removeSignature`, `cleanSignatoryName`).
- `test/hospital.test.ts` — delete the `/api/v1/admin/hospitals/{id}/signature` describe blocks.
- The admin-console SPA never called these — no frontend change.
- Hospitals that already have an admin-set signature keep it; they manage it from their own profile.
  R2 cleanup for deleted hospitals is already best-effort elsewhere — nothing to add.

`PUT|GET|DELETE /api/v1/hospital/signature` stay. A drawn signature is exported to a PNG blob and
goes through the unchanged `validateSignature` (PNG/JPEG, ≤ 256 KB, ≤ 2000 px).

## 3 — `drugbin` SPA: draw pad

### Dependency

`react-signature-canvas` + `@types/react-signature-canvas` (installed with `--legacy-peer-deps`).
Wraps `signature_pad` (mature, mouse + touch, small). If peer deps fight, fall back to
`signature_pad` directly.

### `src/common/hooks/hospital.ts`

- `putHospitalSignature(image: Blob)` — drop the `signatoryName` arg.
- `SignatureMeta` in `src/common/types/manage.types.ts` — drop `signatoryName`.

### `src/components/profile/SignatureCard.tsx`

State machine: **view** (a signature exists) ⇄ **edit** (drawing).

- view: `SignaturePreview` + "Actualizată la …" + `Schimbă semnătura` (→ edit) + `Șterge` (confirm).
- edit (also the initial state when no signature): a bordered, full-width `<canvas>`, ~3:1 aspect,
  HiDPI-corrected (`canvas.width = offsetWidth * dpr` on mount + `ResizeObserver`). Actions:
  - `Șterge` — `ref.clear()`
  - `Salvează` — disabled while `ref.isEmpty()`; fill white, `canvas.toBlob(png)` →
    `putHospitalSignature(blob)` → `onChange()`; on success go to view
  - `Renunță` — back to view (only when a signature already exists)
  - `încarcă o imagine în loc` — tertiary text button → hidden `<input type=file accept=image/png,image/jpeg>`
    → the same size/type guard + `putHospitalSignature`
- The `Nume semnatar` input is gone. Facsimile disclaimer stays.

## 4 — `drugbin` SPA: layout + scrollbar

### Scrollbar (bug I introduced in the last redesign)

`SignatureEmpty` is `width: 100%` + a `1px` border with no `box-sizing` and the app has no global
`* { box-sizing: border-box }` → a 2 px horizontal overflow on `/profil`, which also brings up the
vertical bar. Fix: `box-sizing: border-box` on `SignatureEmpty`, the draw-pad wrapper, and `Card`;
audit every padded/bordered block in `profile.styled.ts`.

### Layout

- Cap `ProfileGrid` at ~920 px, left-aligned (matching `src/components/admin/detail.styled.ts`), so
  the right side is not a wide empty gutter.
- Cards fill the ~600 px content column; the form, the canvas and the preview share one width token
  so their left edges align.
- Each card title gets a one-line description beneath it; the helper sentences move out of the card
  body into that line.
- Tighten `PageHead` / `Sections` spacing.
- Keep Parolă and Semnătură stacked (the draw pad makes the signature card tall — side-by-side would
  look lopsided).

## Verification

- `drugbin-cf`: `npm run check` (typecheck + openapi:check + contract + docs) and `npm test`.
- `drugbin`: `npm run types-check`, `eslint`, static preview screenshot of both card states.

## Deploy order

1. `drugbin-cf` — push; its pipeline runs the D1 migration `--remote` then deploys dev + prod.
2. `drugbin` — `npm run deploy:dev` then `npm run deploy`.
