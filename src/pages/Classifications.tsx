import { Classifications } from 'components/admin/Classifications'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

/**
 * "Identificări" — the flat, un-grouped list of the hospital's own identifications, tenant-scoped
 * by the session token. Kept alongside "Colectări" because the backend still allows
 * `collection_id = NULL` (drugbin-cf `COLLECTION_ID_REQUIRED = false`), so every historical record
 * and every pre-firmware-adoption robot classification belongs to no collection at all — this page
 * is the only door to them.
 */
export const ClassificationsPage = () => (
  <PageWrapper>
    <Classifications basePath='/clasificari' showSimulate={false} title='Identificări' />
  </PageWrapper>
)
