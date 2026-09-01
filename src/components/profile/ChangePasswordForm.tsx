import { changeHospitalPassword } from 'common/hooks/hospital'
import { WDS_COLOR_GREEN, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Text } from 'components/ui/Text/Text'
import { FormEvent, useCallback, useState } from 'react'
import { FormColumn, Hint } from './profile.styled'

const MIN_LENGTH = 12

const errText = (e: any): string => {
  const status = e?.response?.status
  if (status === 422) return 'Parola actuală este greșită sau cea nouă este identică.'
  if (status === 429) return 'Prea multe încercări. Reîncearcă mai târziu.'
  if (status === 400) return `Parola nouă trebuie să aibă cel puțin ${MIN_LENGTH} caractere.`
  return e?.response?.data?.message || 'Schimbarea parolei a eșuat.'
}

const EMPTY = { current: '', next: '', confirm: '' }

export const ChangePasswordForm = () => {
  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setMsg(null)
  }

  const localError = (): string | null => {
    if (!form.current || !form.next) return 'Completează parola actuală și pe cea nouă.'
    if (form.next.length < MIN_LENGTH)
      return `Parola nouă trebuie să aibă cel puțin ${MIN_LENGTH} caractere.`
    if (form.next === form.current) return 'Parola nouă trebuie să fie diferită de cea actuală.'
    if (form.next !== form.confirm) return 'Confirmarea nu coincide cu parola nouă.'
    return null
  }

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const invalid = localError()
      if (invalid) {
        setMsg({ text: invalid, error: true })
        return
      }
      setBusy(true)
      setMsg(null)
      try {
        await changeHospitalPassword(form.current, form.next)
        setForm(EMPTY)
        setMsg({
          text: 'Parola a fost schimbată. Sesiunile deja deschise rămân active până expiră.',
        })
      } catch (err) {
        setMsg({ text: errText(err), error: true })
      } finally {
        setBusy(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form],
  )

  return (
    <FormColumn onSubmit={submit}>
      <Hint>
        Parola inițială a fost emisă de administrator. O poți schimba oricând cu una aleasă de tine
        (minimum {MIN_LENGTH} caractere).
      </Hint>
      <LabeledInput
        type='password'
        label='Parola actuală'
        autoComplete='current-password'
        value={form.current}
        onChange={set('current')}
        required
      />
      <LabeledInput
        type='password'
        label='Parola nouă'
        autoComplete='new-password'
        value={form.next}
        onChange={set('next')}
        required
      />
      <LabeledInput
        type='password'
        label='Confirmă parola nouă'
        autoComplete='new-password'
        value={form.confirm}
        onChange={set('confirm')}
        required
      />
      {msg && (
        <Text variant='bodyXS' color={msg.error ? WDS_COLOR_RED : WDS_COLOR_GREEN}>
          {msg.text}
        </Text>
      )}
      <div>
        <Button type='submit' size='XS' disabled={busy}>
          Schimbă parola
        </Button>
      </div>
    </FormColumn>
  )
}
