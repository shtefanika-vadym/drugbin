import { postApprove } from 'common/hooks/admin'
import { ClassificationRow, CorrectionRow } from 'common/types/manage.types'
import { WDS_COLOR_GREEN, WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Select } from 'components/ui/Select/Select'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { Actions, Form } from './dialog.styled'
import { categoryLabel } from './format'

const CATEGORIES = [1, 2, 3, 4, 5, 6, 7]

/**
 * Review + approve a pending classification. The reviewer confirms (or corrects) the category and
 * name, then approves — approval is final, so this form is only rendered for `pending` rows.
 */
export const CorrectionForm: React.FC<{
  imageId: string
  classification: ClassificationRow
  corrections: CorrectionRow[]
  onApproved: () => void
}> = ({ imageId, classification, corrections, onApproved }) => {
  const [category, setCategory] = useState<number | ''>(classification.drugCategory ?? '')
  const [name, setName] = useState(classification.drugName ?? '')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  const submit = useCallback(async () => {
    if (category === '') return
    setBusy(true)
    setMsg(null)
    try {
      const { indexed } = await postApprove(imageId, {
        category,
        name: name.trim() || undefined,
        note: note.trim() || undefined,
      })
      setMsg({ text: indexed ? 'Clasificare aprobată și indexată.' : 'Clasificare aprobată.' })
      setNote('')
      onApproved()
    } catch (e: any) {
      setMsg({ text: e?.response?.data?.message || 'Eroare la salvare.', error: true })
    } finally {
      setBusy(false)
    }
  }, [imageId, category, name, note, onApproved])

  return (
    <Form>
      <Select
        label='Categorie corectă'
        value={category}
        onChange={(e) => setCategory(e.target.value ? Number(e.target.value) : '')}>
        <option value=''>alege…</option>
        {CATEGORIES.map((n) => (
          <option key={n} value={n}>
            {categoryLabel(n)}
          </option>
        ))}
      </Select>
      <LabeledInput
        label='Nume (opțional)'
        placeholder='Ex: Nurofen Forte 400mg'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LabeledInput label='Notă (opțional)' value={note} onChange={(e) => setNote(e.target.value)} />
      {msg && (
        <Text variant='bodyXS' color={msg.error ? WDS_COLOR_RED : WDS_COLOR_GREEN}>
          {msg.text}
        </Text>
      )}
      <Actions>
        <Button disabled={busy || category === ''} onClick={submit}>
          Aprobă și indexează
        </Button>
      </Actions>
      <Text variant='bodyXS' color={WDS_COLOR_GREY}>
        Aprobarea este definitivă — nu poate fi retrasă.
        {corrections.length > 0 && ` ${corrections.length} corecție(i) anterioară(e).`}
      </Text>
    </Form>
  )
}
