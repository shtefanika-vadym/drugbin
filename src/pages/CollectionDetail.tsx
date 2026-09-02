import { ClassificationDetail } from 'components/admin/ClassificationDetail'
import { CollectionDetail } from 'components/collections/CollectionDetail'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'
import { useParams } from 'react-router-dom'

/** "Colectări" → one drop-off session (hospital view, tenant-scoped by the session token). */
export const CollectionDetailPage = () => (
  <PageWrapper>
    <CollectionDetail basePath='/colectari' />
  </PageWrapper>
)

/** One identification drilled into from a collection — "Înapoi" returns to that collection. */
export const CollectionItemDetailPage = () => {
  const { collectionId = '' } = useParams()
  return (
    <PageWrapper>
      <ClassificationDetail basePath={`/colectari/${collectionId}`} />
    </PageWrapper>
  )
}
