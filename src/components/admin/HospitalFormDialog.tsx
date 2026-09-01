import { createHospital } from 'common/hooks/admin'
import { WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { CityField } from './CityField'
import { Actions, Description, Form } from './dialog.styled'
import { Secret } from './SecretDialog'

const EMPTY = { name: '', loginEmail: '', city: '', address: '' }
const apiMsg = (e: any, fallback: string) => e?.response?.data?.message || fallback

export const HospitalFormDialog: React.FC<{
  close: () => void
  onCreated: (s: Secret) => void
}> = ({ close, onCreated }) => {
  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const res = await createHospital({
        name: form.name.trim(),
        loginEmail: form.loginEmail.trim(),
        city: form.city.trim() || undefined,
        address: form.address.trim() || undefined,
      })
      onCreated({
        title: 'Spital creat',
        context: `Autentificare: ${res.loginEmail}`,
        label: 'Parolă',
        value: res.password,
      })
    } catch (e) {
      setError(apiMsg(e, 'Nu s-a putut crea spitalul.'))
    } finally {
      setBusy(false)
    }
  }, [form, onCreated])

  return (
    <Form>
      <Text variant='titleH4'>Spital nou</Text>
      <Description>Se generează o parolă de autentificare, afișată o singură dată.</Description>
      <LabeledInput
        label='Nume'
        required
        placeholder='Ex: Spitalul Județean de Urgență Suceava'
        value={form.name}
        onChange={set('name')}
      />
      <LabeledInput
        label='Email'
        type='email'
        required
        placeholder='Ex: spital@suceava.ro'
        value={form.loginEmail}
        onChange={set('loginEmail')}
      />
      <CityField value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} />
      <LabeledInput
        label='Adresă'
        placeholder='Ex: B-dul 1 Decembrie 1918, nr. 21'
        value={form.address}
        onChange={set('address')}
      />
      {error && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          {error}
        </Text>
      )}
      <Actions>
        <Button variant='secondary' onClick={close}>
          Anulare
        </Button>
        <Button disabled={busy || !form.name.trim() || !form.loginEmail.trim()} onClick={submit}>
          Creează
        </Button>
      </Actions>
    </Form>
  )
}
