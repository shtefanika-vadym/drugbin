import { CollectAll } from 'components/history/CollectAll/CollectAll'
import { HistoryHeader } from 'components/history/HistoryHeader'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'
import { useState } from 'react'

export const HistoryAllPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [debouncedState, setDebouncedState] = useState('')

  return (
    <PageWrapper>
      <HistoryHeader setDebouncedState={setDebouncedState} />
      <CollectAll />
    </PageWrapper>
  )
}
