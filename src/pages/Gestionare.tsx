import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'
import { Classifications } from 'components/admin/Classifications'

/**
 * "Gestionare" — the hospital's own classifications list. Same component as the admin console's
 * "Clasificări", tenant-scoped by the session token (docs/18.01). No "Simulează" (admin only).
 */
export const GestionarePage = () => (
  <PageWrapper>
    <Classifications basePath='/gestionare' showSimulate={false} title='Gestionare intrări' />
  </PageWrapper>
)
