import { createMachine, useHospitals } from 'common/hooks/admin'
import { WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Select } from 'components/ui/Select/Select'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { Actions, Description, Form } from './dialog.styled'
import { Secret } from './SecretDialog'

const apiMsg = (e: any, fallback: string) => e?.response?.data?.message || fallback

export const RobotFormDialog: React.FC<{
  close: () => void
  onCreated: (s: Secret) => void
}> = ({ close, onCreated }) => {
  const { hospitals } = useHospitals({ pageSize: 200 })
  const [form, setForm] = useState({ label: '', site: '', hospitalId: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const res = await createMachine({
        label: form.label.trim(),
        site: form.site.trim() || undefined,
        hospitalId: form.hospitalId || undefined,
      })
      onCreated({ title: 'Robot creat', label: 'Cheie dispozitiv', value: res.key })
    } catch (e) {
      setError(apiMsg(e, 'Nu s-a putut crea robotul.'))
    } finally {
      setBusy(false)
    }
  }, [form, onCreated])

  return (
    <Form>
      <Text variant='titleH4'>Robot nou</Text>
      <Description>Se generează o cheie de dispozitiv, afișată o singură dată.</Description>
      <LabeledInput
        label='Etichetă'
        required
        placeholder='Ex: Colector farmacie etaj 1'
        value={form.label}
        onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
      />
      <LabeledInput
        label='Locație (notă)'
        placeholder='Ex: Farmacia centrală'
        value={form.site}
        onChange={(e) => setForm((f) => ({ ...f, site: e.target.value }))}
      />
      <Select
        label='Spital'
        value={form.hospitalId}
        onChange={(e) => setForm((f) => ({ ...f, hospitalId: e.target.value }))}>
        <option value=''>— neasignat —</option>
        {hospitals.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}
      </Select>
      {error && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          {error}
        </Text>
      )}
      <Actions>
        <Button variant='secondary' onClick={close}>
          Anulare
        </Button>
        <Button disabled={busy || !form.label.trim()} onClick={submit}>
          Creează
        </Button>
      </Actions>
    </Form>
  )
}
