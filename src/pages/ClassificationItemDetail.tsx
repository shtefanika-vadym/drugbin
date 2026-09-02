import { ClassificationDetail } from 'components/admin/ClassificationDetail'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'

/** One identification opened from "Identificări" — "Înapoi" returns to the flat list. */
export const ClassificationItemDetailPage = () => (
  <PageWrapper>
    <ClassificationDetail basePath='/clasificari' />
  </PageWrapper>
)
