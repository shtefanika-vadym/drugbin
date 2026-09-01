import { assignMachine, deleteMachine, rotateMachineKey, setMachineStatus, useHospitals } from 'common/hooks/admin'
import { Machine } from 'common/types/manage.types'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { Select } from 'components/ui/Select/Select'
import { Tabs } from 'components/ui/Tabs/Tabs'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { AccessRow, AccessRowHead, Actions, Description, Form, TabPanel } from './dialog.styled'
import { Secret } from './SecretDialog'
import { StatusTag } from './StatusTag'
import { fmtDate, fmtRelative } from './format'

const TABS = [
  { id: 'detalii' as const, label: 'Detalii' },
  { id: 'acces' as const, label: 'Acces' },
]

interface Props {
  machine: Machine
  close: () => void
  onChanged: (m: Machine) => void
  onDeleted: () => void
  onSecret: (s: Secret) => void
}

export const RobotDetailDialog: React.FC<Props> = ({ machine, close, onChanged, onDeleted, onSecret }) => {
  const confirm = useConfirm()
  const { hospitals } = useHospitals({ pageSize: 200 })
  const [tab, setTab] = useState<'detalii' | 'acces'>('detalii')
  const [busy, setBusy] = useState(false)

  const assign = useCallback(
    async (hospitalId: string) => {
      setBusy(true)
      try {
        onChanged(await assignMachine(machine.machineId, hospitalId || null))
      } finally {
        setBusy(false)
      }
    },
    [machine.machineId, onChanged],
  )

  const rotate = useCallback(async () => {
    let res: Awaited<ReturnType<typeof rotateMachineKey>> | undefined
    const ok = await confirm({
      title: 'Rotești cheia dispozitivului?',
      description: 'Se generează o cheie nouă, afișată o singură dată. Cea veche se dezactivează imediat.',
      confirmLabel: 'Rotește cheia',
      action: async () => {
        res = await rotateMachineKey(machine.machineId)
      },
    })
    if (ok && res) onSecret({ title: 'Cheie regenerată', label: 'Cheie dispozitiv', value: res.key })
  }, [confirm, machine.machineId, onSecret])

  const toggleEnabled = useCallback(async () => {
    const disabling = machine.enabled
    let updated: Machine | undefined
    const ok = await confirm({
      title: disabling ? 'Dezactivezi robotul?' : 'Activezi robotul?',
      description: disabling
        ? 'Robotul va fi refuzat la /api/v1/classify până la reactivare.'
        : 'Robotul va putea din nou să trimită clasificări.',
      confirmLabel: disabling ? 'Dezactivează' : 'Activează',
      danger: disabling,
      action: async () => {
        updated = await setMachineStatus(machine.machineId, !machine.enabled)
      },
    })
    if (ok && updated) onChanged(updated)
  }, [confirm, machine.machineId, machine.enabled, onChanged])

  const remove = useCallback(async () => {
    const ok = await confirm({
      title: `Ștergi robotul „${machine.label}”?`,
      description:
        'Cheia dispozitivului nu va mai funcționa. Istoricul clasificărilor se păstrează. ' +
        'Acțiunea nu poate fi anulată.',
      confirmLabel: 'Șterge robotul',
      danger: true,
      action: () => deleteMachine(machine.machineId),
    })
    if (ok) onDeleted()
  }, [confirm, machine.machineId, machine.label, onDeleted])

  return (
    <Form>
      <Text variant='titleH4'>{machine.label}</Text>
      <Description>
        {machine.enabled ? <StatusTag tone='ok'>Activ</StatusTag> : <StatusTag tone='danger'>Dezactivat</StatusTag>}
        {'  '}· creat {fmtDate(machine.createdAt)} · ultima activitate {fmtRelative(machine.lastSeenAt)}
      </Description>

      <Tabs items={TABS} active={tab} onChange={setTab} />

      {tab === 'detalii' && (
        <TabPanel>
          <Select label='Spital' value={machine.hospitalId ?? ''} disabled={busy} onChange={(e) => assign(e.target.value)}>
            <option value=''>— neasignat —</option>
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </Select>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            ID: {machine.machineId}
          </Text>
          <Actions>
            <Button variant='secondary' onClick={close}>
              Închide
            </Button>
          </Actions>
        </TabPanel>
      )}

      {tab === 'acces' && (
        <TabPanel>
          <AccessRow>
            <AccessRowHead>
              <Text variant='subheading'>Cheie dispozitiv</Text>
              <StatusTag tone={machine.hasKey ? 'ok' : 'muted'}>{machine.hasKey ? 'configurată' : 'lipsă'}</StatusTag>
            </AccessRowHead>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              Se generează o cheie nouă, afișată o singură dată. Cea veche se dezactivează imediat.
            </Text>
            <div>
              <Button variant='secondary' disabled={busy} onClick={rotate}>
                Rotește cheia
              </Button>
            </div>
          </AccessRow>

          <AccessRow>
            <AccessRowHead>
              <Text variant='subheading'>Stare robot</Text>
              {machine.enabled ? <StatusTag tone='ok'>Activ</StatusTag> : <StatusTag tone='danger'>Dezactivat</StatusTag>}
            </AccessRowHead>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              Un robot dezactivat este refuzat la /api/v1/classify.
            </Text>
            <div>
              <Button variant='secondary' disabled={busy} onClick={toggleEnabled}>
                {machine.enabled ? 'Dezactivează robotul' : 'Activează robotul'}
              </Button>
            </div>
          </AccessRow>

          <AccessRow>
            <AccessRowHead>
              <Text variant='subheading'>Șterge robotul</Text>
            </AccessRowHead>
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              Cheia dispozitivului nu va mai funcționa. Istoricul clasificărilor se păstrează.
            </Text>
            <div>
              <Button variant='danger' disabled={busy} onClick={remove}>
                Șterge robotul
              </Button>
            </div>
          </AccessRow>

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
