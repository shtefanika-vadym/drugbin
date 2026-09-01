import { Button } from 'components/ui/Button/Button'
import { RestoreIcon } from 'components/ui/Icon'
import { Spinner } from 'components/ui/Spinner/Spinner'
import { useCallback, useState } from 'react'

interface Props {
  /** Fire a fresh request and repopulate the table. May return a promise. */
  onRefresh: () => void | Promise<unknown>
}

/** Manual "reîmprospătează" control for the admin list screens. */
export const RefreshButton: React.FC<Props> = ({ onRefresh }) => {
  const [busy, setBusy] = useState(false)

  const handle = useCallback(async () => {
    if (busy) return
    setBusy(true)
    try {
      await onRefresh()
    } finally {
      setBusy(false)
    }
  }, [busy, onRefresh])

  return (
    <Button
      variant='secondary'
      size='S-round'
      onClick={handle}
      disabled={busy}
      aria-label='Reîmprospătează'
      title='Reîmprospătează'>
      {busy ? <Spinner size={16} /> : <RestoreIcon width={16} height={16} />}
    </Button>
  )
}
