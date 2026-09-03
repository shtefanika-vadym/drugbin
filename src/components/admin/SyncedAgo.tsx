import { WDS_COLOR_GREY } from 'common/styles/colors'
import { Text } from 'components/ui/Text/Text'
import { useEffect, useState } from 'react'
import { fmtAgo } from './format'

/** "Sincronizat acum 12 sec" — re-renders every second so the age keeps counting up. */
export const SyncedAgo: React.FC<{ at: number }> = ({ at }) => {
  const [, tick] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => tick((n) => n + 1), 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <Text variant='bodyXS' color={WDS_COLOR_GREY}>
      Sincronizat {fmtAgo(at)}
    </Text>
  )
}
