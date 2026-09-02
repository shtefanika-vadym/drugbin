import { CollectionsList } from 'components/collections/CollectionsList'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

/** "Colectări" — the hospital's own drop-off sessions, tenant-scoped by the session token. */
export const CollectionsPage = () => (
  <PageWrapper>
    <CollectionsList basePath='/colectari' />
  </PageWrapper>
)
