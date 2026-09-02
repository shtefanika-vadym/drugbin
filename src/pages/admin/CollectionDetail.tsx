import { ClassificationDetail } from 'components/admin/ClassificationDetail'
import { CollectionDetail } from 'components/collections/CollectionDetail'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'
import { useParams } from 'react-router-dom'

/** Admin console "Colectări" → one drop-off session, any hospital. */
export const AdminCollectionDetailPage = () => (
  <PageWrapper>
    <CollectionDetail basePath='/admin/colectari' />
  </PageWrapper>
)

/** One identification drilled into from a collection — "Înapoi" returns to that collection. */
export const AdminCollectionItemDetailPage = () => {
  const { collectionId = '' } = useParams()
  return (
    <PageWrapper>
      <ClassificationDetail basePath={`/admin/colectari/${collectionId}`} />
    </PageWrapper>
  )
}
