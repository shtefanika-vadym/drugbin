import { Button } from 'components/ui/Button/Button'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { Actions, Description, Form } from './dialog.styled'

interface Props {
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => Promise<void> | void
  close: () => void
}

/** Generic "are you sure" body for `useDialog`, mirroring components/ui/Dialog/ActionDialog. */
export const ConfirmDialog: React.FC<Props> = ({ title, description, confirmLabel = 'Confirmă', onConfirm, close }) => {
  const [busy, setBusy] = useState(false)

  const handle = useCallback(async () => {
    setBusy(true)
    try {
      await onConfirm()
      close()
    } finally {
      setBusy(false)
    }
  }, [onConfirm, close])

  return (
    <Form>
      <Text variant='titleH4'>{title}</Text>
      <Description>{description}</Description>
      <Actions>
        <Button variant='secondary' onClick={close}>
          Anulare
        </Button>
        <Button disabled={busy} onClick={handle}>
          {confirmLabel}
        </Button>
      </Actions>
    </Form>
  )
}
