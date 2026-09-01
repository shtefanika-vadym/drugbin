import { deleteHospital, rotateHospitalCredentials, setHospitalStatus, updateHospital } from 'common/hooks/admin'
import { Hospital } from 'common/types/manage.types'
import { WDS_COLOR_GREEN, WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Tabs } from 'components/ui/Tabs/Tabs'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { CityField } from './CityField'
import { AccessRow, AccessRowHead, Actions, Description, Form, TabPanel } from './dialog.styled'
import { Secret } from './SecretDialog'
import { StatusTag } from './StatusTag'
import { fmtDate } from './format'

const apiMsg = (e: any, fallback: string) => e?.response?.data?.message || fallback

const TABS = [
  { id: 'detalii' as const, label: 'Detalii' },
  { id: 'acces' as const, label: 'Acces' },
]

interface Props {
  hospital: Hospital
  close: () => void
  onChanged: (h: Hospital) => void
  onDeleted: () => void
  onSecret: (s: Secret) => void
}

export const HospitalDetailDialog: React.FC<Props> = ({ hospital, close, onChanged, onDeleted, onSecret }) => {
  const confirm = useConfirm()
  const [tab, setTab] = useState<'detalii' | 'acces'>('detalii')
  const [form, setForm] = useState({
    name: hospital.name,
    loginEmail: hospital.loginEmail,
    city: hospital.city ?? '',
    address: hospital.address ?? '',
    contactEmail: hospital.contactEmail ?? '',
  })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const dirty =
    form.name !== hospital.name ||
    form.loginEmail !== hospital.loginEmail ||
    form.city !== (hospital.city ?? '') ||
    form.address !== (hospital.address ?? '') ||
    form.contactEmail !== (hospital.contactEmail ?? '')

  const save = useCallback(async () => {
    setBusy(true)
    setMsg(null)
    try {
      onChanged(
        await updateHospital(hospital.id, {
          name: form.name.trim(),
          loginEmail: form.loginEmail.trim(),
          city: form.city.trim() || null,
          address: form.address.trim() || null,
          contactEmail: form.contactEmail.trim() || null,
        }),
      )
      setMsg({ text: 'Modificări salvate.' })
    } catch (e) {
      setMsg({ text: apiMsg(e, 'Salvarea a eșuat.'), error: true })
    } finally {
      setBusy(false)
    }
  }, [form, hospital.id, onChanged])

  const rotate = useCallback(async () => {
    let res: Awaited<ReturnType<typeof rotateHospitalCredentials>> | undefined
    const ok = await confirm({
      title: 'Rotești parola?',
      description: 'Se generează o parolă nouă, afișată o singură dată. Cea veche se dezactivează imediat.',
      confirmLabel: 'Rotește parola',
      action: async () => {
        res = await rotateHospitalCredentials(hospital.id)
      },
    })
    if (ok && res) {
      onSecret({
        title: 'Parolă regenerată',
        context: `Autentificare: ${res.loginEmail}`,
        label: 'Parolă nouă',
        value: res.password,
      })
    }
  }, [confirm, hospital.id, onSecret])

  const toggleStatus = useCallback(async () => {
    const suspending = hospital.status === 'active'
    let updated: Hospital | undefined
    const ok = await confirm({
      title: suspending ? 'Suspenzi contul?' : 'Reactivezi contul?',
      description: suspending
        ? 'Spitalul nu se va mai putea autentifica până la reactivare.'
        : 'Spitalul va putea din nou să se autentifice.',
      confirmLabel: suspending ? 'Suspendă' : 'Reactivează',
      danger: suspending,
      action: async () => {
        updated = await setHospitalStatus(hospital.id, suspending ? 'suspended' : 'active')
      },
    })
    if (ok && updated) onChanged(updated)
  }, [confirm, hospital.id, hospital.status, onChanged])

  const remove = useCallback(async () => {
    const ok = await confirm({
      title: `Ștergi spitalul „${hospital.name}”?`,
      description:
        'Roboții asignați devin neasignați (nu se șterg). Autentificarea spitalului nu va mai ' +
        'funcționa. Istoricul clasificărilor se păstrează. Acțiunea nu poate fi anulată.',
      confirmLabel: 'Șterge spitalul',
      danger: true,
      action: () => deleteHospital(hospital.id),
    })
    if (ok) onDeleted()
  }, [confirm, hospital.id, hospital.name, onDeleted])

  const active = hospital.status === 'active'

  return (
    <Form>
      <Text variant='titleH4'>{hospital.name}</Text>
      <Description>
        {active ? <StatusTag tone='ok'>Activ</StatusTag> : <StatusTag tone='danger'>Suspendat</StatusTag>}
        {'  '}· {hospital.machineCount} roboți · creat {fmtDate(hospital.createdAt)}
      </Description>

      <Tabs items={TABS} active={tab} onChange={setTab} />

      {tab === 'detalii' && (
        <TabPanel>
          <LabeledInput label='Nume' value={form.name} onChange={set('name')} />
          <LabeledInput label='Email' type='email' value={form.loginEmail} onChange={set('loginEmail')} />
          <CityField value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} />
          <LabeledInput label='Adresă' value={form.address} onChange={set('address')} />
          <LabeledInput label='Email de contact' type='email' value={form.contactEmail} onChange={set('contactEmail')} />
          {msg && (
            <Text variant='bodyXS' color={msg.error ? WDS_COLOR_RED : WDS_COLOR_GREEN}>
              {msg.text}
            </Text>
          )}
          <Actions>
            <Button variant='secondary' onClick={close}>
              Închide
            </Button>
            <Button disabled={busy || !dirty} onClick={save}>
              Salvează
            </Button>
          </Actions>
        </TabPanel>
      )}

      {tab === 'acces' && (
        <TabPanel>
          <AccessRow>
            <AccessRowHead>
              <Text variant='subheading'>Parolă de autentificare</Text>
            </AccessRowHead>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              Se generează o parolă nouă, afișată o singură dată. Cea veche se dezactivează imediat.
            </Text>
            <div>
              <Button variant='secondary' disabled={busy} onClick={rotate}>
                Rotește parola
              </Button>
            </div>
          </AccessRow>

          <AccessRow>
            <AccessRowHead>
              <Text variant='subheading'>Stare cont</Text>
              {active ? <StatusTag tone='ok'>Activ</StatusTag> : <StatusTag tone='danger'>Suspendat</StatusTag>}
            </AccessRowHead>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              {active
                ? 'Un cont suspendat nu se poate autentifica.'
                : 'Reactivează pentru a permite autentificarea.'}
            </Text>
            <div>
              <Button variant='secondary' disabled={busy} onClick={toggleStatus}>
                {active ? 'Suspendă contul' : 'Reactivează contul'}
              </Button>
            </div>
          </AccessRow>

          <AccessRow>
            <AccessRowHead>
              <Text variant='subheading'>Șterge spitalul</Text>
            </AccessRowHead>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              Roboții asignați devin neasignați (nu se șterg). Istoricul clasificărilor se păstrează.
            </Text>
            <div>
              <Button variant='danger' disabled={busy} onClick={remove}>
                Șterge spitalul
              </Button>
            </div>
          </AccessRow>

          {msg?.error && (
            <Text variant='bodyXS' color={WDS_COLOR_RED}>
              {msg.text}
            </Text>
          )}

          <Actions>
            <Button variant='secondary' onClick={close}>
              Închide
            </Button>
          </Actions>
        </TabPanel>
      )}
    </Form>
  )
}
