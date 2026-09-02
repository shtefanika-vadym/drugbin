import { CollectionsList } from 'components/collections/CollectionsList'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

/** Admin console "Colectări" — every hospital's drop-off sessions, with a hospital filter. */
export const AdminCollectionsPage = () => (
  <PageWrapper>
    <CollectionsList basePath='/admin/colectari' adminScope />
  </PageWrapper>
)
