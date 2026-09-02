import { changeHospitalPassword } from 'common/hooks/hospital'
import { Button } from 'components/ui/Button/Button'
import { CheckIcon } from 'components/ui/Icon'
import { LabeledInput } from 'components/ui/LabeledInput'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { FormColumn, MessageBox, ReqDot, ReqItem, ReqList } from './profile.styled'

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

  const reqs = useMemo(
    () => [
      { label: `Cel puțin ${MIN_LENGTH} caractere`, done: form.next.length >= MIN_LENGTH },
      {
        label: 'Diferită de parola actuală',
        done: form.next.length > 0 && form.next !== form.current,
      },
      {
        label: 'Confirmarea coincide',
        done: form.confirm.length > 0 && form.next === form.confirm,
      },
    ],
    [form],
  )

  const canSubmit = !busy && !!form.current && reqs.every((r) => r.done)

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!canSubmit) return
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
    [form, canSubmit],
  )

  return (
    <FormColumn onSubmit={submit}>
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

      <ReqList>
        {reqs.map((r) => (
          <ReqItem key={r.label} done={r.done}>
            {r.done ? <CheckIcon /> : <ReqDot />}
            {r.label}
          </ReqItem>
        ))}
      </ReqList>

      {msg && <MessageBox tone={msg.error ? 'error' : 'ok'}>{msg.text}</MessageBox>}

      <div>
        <Button type='submit' size='XS' disabled={!canSubmit}>
          Schimbă parola
        </Button>
      </div>
    </FormColumn>
  )
}
