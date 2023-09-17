import { CollectHistory } from 'components/history/CollectHistory/CollectHistory'
import { HistoryHeader } from 'components/history/HistoryHeader'
import { PageWrapper } from 'components/layout/PageWrapper/PageWrapper'
import { useState } from 'react'

export const HistoryCollectPage = () => {
  const [debouncedState, setDebouncedState] = useState('')

  return (
    <PageWrapper>
      <HistoryHeader setDebouncedState={setDebouncedState} />
      <CollectHistory searchValue={debouncedState} />
    </PageWrapper>
  )
}
