import { postCorrection } from 'common/hooks/admin'
import { CorrectionRow } from 'common/types/manage.types'
import { WDS_COLOR_GREEN, WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Select } from 'components/ui/Select/Select'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { Actions, Form } from './dialog.styled'
import { CheckboxRow } from './detail.styled'
import { categoryLabel } from './format'

const CATEGORIES = [1, 2, 3, 4, 5, 6, 7]

export const CorrectionForm: React.FC<{
  imageId: string
  corrections: CorrectionRow[]
  onSaved: () => void
}> = ({ imageId, corrections, onSaved }) => {
  const [category, setCategory] = useState<number | ''>('')
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [promote, setPromote] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  const submit = useCallback(async () => {
    if (category === '') return
    setBusy(true)
    setMsg(null)
    try {
      await postCorrection(imageId, {
        correctedBy: 'pharmacist',
        category,
        name: name.trim() || undefined,
        note: note.trim() || undefined,
        promote,
      })
      setMsg({ text: promote ? 'Corecție înregistrată și promovată în index.' : 'Corecție înregistrată.' })
      setCategory('')
      setName('')
      setNote('')
      setPromote(false)
      onSaved()
    } catch (e: any) {
      setMsg({ text: e?.response?.data?.message || 'Eroare la salvare.', error: true })
    } finally {
      setBusy(false)
    }
  }, [imageId, category, name, note, promote, onSaved])

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
      <LabeledInput label='Nume (opțional)' placeholder='Ex: Nurofen Forte 400mg' value={name} onChange={(e) => setName(e.target.value)} />
      <LabeledInput label='Notă (opțional)' value={note} onChange={(e) => setNote(e.target.value)} />
      <CheckboxRow>
        <input type='checkbox' checked={promote} onChange={(e) => setPromote(e.target.checked)} />
        <Text variant='bodyS'>Promovează înregistrarea corectată în index</Text>
      </CheckboxRow>
      {msg && (
        <Text variant='bodyXS' color={msg.error ? WDS_COLOR_RED : WDS_COLOR_GREEN}>
          {msg.text}
        </Text>
      )}
      <Actions>
        <Button disabled={busy || category === ''} onClick={submit}>
          Salvează corecția
        </Button>
      </Actions>
      {corrections.length > 0 && (
        <Text variant='bodyXS' color={WDS_COLOR_GREY}>
          {corrections.length} corecție(i) anterioară(e).
        </Text>
      )}
    </Form>
  )
}
