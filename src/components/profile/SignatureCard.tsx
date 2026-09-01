import {
  deleteHospitalSignature,
  putHospitalSignature,
  useSignatureBlob,
} from 'common/hooks/hospital'
import { SignatureMeta } from 'common/types/manage.types'
import { WDS_COLOR_GREEN, WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Text } from 'components/ui/Text/Text'
import { fmtDateTime } from 'components/admin/format'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  Column,
  DisclaimerBox,
  HiddenFileInput,
  Hint,
  InlineActions,
  SignatureEmpty,
  SignaturePreview,
} from './profile.styled'

const MAX_BYTES = 256 * 1024
const ACCEPTED = ['image/png', 'image/jpeg']

const apiMsg = (e: any, fallback: string) => e?.response?.data?.message || fallback

interface Props {
  signature: SignatureMeta
  onChange: () => void
}

export const SignatureCard: React.FC<Props> = ({ signature, onChange }) => {
  const confirm = useConfirm()
  const inputRef = useRef<HTMLInputElement>(null)

  const [version, setVersion] = useState(0)
  const [signatoryName, setSignatoryName] = useState(signature.signatoryName ?? '')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  useEffect(() => {
    setSignatoryName(signature.signatoryName ?? '')
  }, [signature.signatoryName, signature.updatedAt])

  const previewUrl = useSignatureBlob(signature.present, version)

  const upload = useCallback(
    async (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        setMsg({ text: 'Semnătura trebuie să fie o imagine PNG sau JPEG.', error: true })
        return
      }
      if (file.size > MAX_BYTES) {
        setMsg({ text: 'Imaginea semnăturii nu poate depăși 256 KB.', error: true })
        return
      }
      setBusy(true)
      setMsg(null)
      try {
        await putHospitalSignature(file, signatoryName.trim())
        setVersion((v) => v + 1)
        onChange()
        setMsg({ text: 'Semnătura a fost salvată.' })
      } catch (e) {
        setMsg({ text: apiMsg(e, 'Încărcarea semnăturii a eșuat.'), error: true })
      } finally {
        setBusy(false)
      }
    },
    [onChange, signatoryName],
  )

  const onPick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0]
      e.currentTarget.value = ''
      if (file) upload(file)
    },
    [upload],
  )

  const saveName = useCallback(async () => {
    if (!previewUrl) return
    setBusy(true)
    setMsg(null)
    try {
      const blob = await (await fetch(previewUrl)).blob()
      await putHospitalSignature(blob, signatoryName.trim())
      setVersion((v) => v + 1)
      onChange()
      setMsg({ text: 'Numele semnatarului a fost actualizat.' })
    } catch (e) {
      setMsg({ text: apiMsg(e, 'Actualizarea a eșuat.'), error: true })
    } finally {
      setBusy(false)
    }
  }, [onChange, previewUrl, signatoryName])

  const remove = useCallback(async () => {
    const ok = await confirm({
      title: 'Ștergi semnătura?',
      description:
        'Procesele verbale generate de acum vor avea un câmp gol de semnat. Cele deja trimise ' +
        'păstrează semnătura inclusă în PDF.',
      confirmLabel: 'Șterge semnătura',
      danger: true,
      action: () => deleteHospitalSignature(),
    })
    if (ok) {
      setVersion((v) => v + 1)
      onChange()
      setMsg({ text: 'Semnătura a fost ștearsă.' })
    }
  }, [confirm, onChange])

  const nameDirty = signatoryName.trim() !== (signature.signatoryName ?? '')

  return (
    <Column>
      <Hint>
        Se adaugă automat în procesul verbal, la „Am predat”. Dacă nu este setată, PV-ul are un câmp
        gol pe care îl semnezi de mână.
      </Hint>

      {signature.present && previewUrl ? (
        <SignaturePreview src={previewUrl} alt='Semnătura curentă' />
      ) : (
        <SignatureEmpty>Nicio semnătură încărcată</SignatureEmpty>
      )}

      {signature.present && signature.updatedAt && (
        <Text variant='bodyXS' color={WDS_COLOR_GREY}>
          Actualizată la {fmtDateTime(signature.updatedAt)}
        </Text>
      )}

      <LabeledInput
        label='Nume semnatar (opțional)'
        placeholder='Ex: Farm. Ionescu Maria'
        value={signatoryName}
        onChange={(e) => setSignatoryName(e.target.value)}
      />

      {msg && (
        <Text variant='bodyXS' color={msg.error ? WDS_COLOR_RED : WDS_COLOR_GREEN}>
          {msg.text}
        </Text>
      )}

      <InlineActions>
        <Button
          variant='secondary'
          size='XS'
          disabled={busy}
          onClick={() => inputRef.current?.click()}>
          {signature.present ? 'Înlocuiește imaginea' : 'Încarcă imaginea'}
        </Button>
        {signature.present && nameDirty && (
          <Button size='XS' disabled={busy} onClick={saveName}>
            Salvează numele
          </Button>
        )}
        {signature.present && (
          <Button variant='danger' size='XS' disabled={busy} onClick={remove}>
            Șterge semnătura
          </Button>
        )}
      </InlineActions>

      <HiddenFileInput ref={inputRef} type='file' accept='image/png,image/jpeg' onChange={onPick} />

      <DisclaimerBox>
        Imaginea este un facsimil, nu o semnătură electronică calificată. Dacă ai nevoie de o
        semnătură cu valoare legală, tipărește PV-ul și semnează-l olograf sau folosește un
        instrument extern de semnare.
      </DisclaimerBox>
    </Column>
  )
}
