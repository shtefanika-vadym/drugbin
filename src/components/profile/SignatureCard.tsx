import {
  deleteHospitalSignature,
  putHospitalSignature,
  useSignatureBlob,
} from 'common/hooks/hospital'
import { SignatureMeta } from 'common/types/manage.types'
import { WDS_COLOR_BLUE_500, WDS_COLOR_GREY } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { Text } from 'components/ui/Text/Text'
import { fmtDateTime } from 'components/admin/format'
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import {
  Column,
  DisclaimerBox,
  DrawPadFrame,
  HiddenFileInput,
  InlineActions,
  LinkButton,
  MessageBox,
  SignaturePreview,
} from './profile.styled'

const MAX_BYTES = 256 * 1024
const ACCEPTED = ['image/png', 'image/jpeg']
const PAD_HEIGHT = 180

const apiMsg = (e: any, fallback: string) => e?.response?.data?.message || fallback

/** Flatten the transparent pen strokes onto white so the preview and the PV read cleanly. */
const onWhite = (src: HTMLCanvasElement): HTMLCanvasElement => {
  const out = document.createElement('canvas')
  out.width = src.width
  out.height = src.height
  const ctx = out.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, out.width, out.height)
    ctx.drawImage(src, 0, 0)
  }
  return out
}

interface Props {
  signature: SignatureMeta
  onChange: () => void
}

export const SignatureCard: React.FC<Props> = ({ signature, onChange }) => {
  const confirm = useConfirm()
  const inputRef = useRef<HTMLInputElement>(null)
  const padRef = useRef<SignatureCanvas>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const [mode, setMode] = useState<'view' | 'edit'>(signature.present ? 'view' : 'edit')
  const [version, setVersion] = useState(0)
  const [padWidth, setPadWidth] = useState(0)
  const [padEmpty, setPadEmpty] = useState(true)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null)

  const previewUrl = useSignatureBlob(signature.present, version)

  // Size the canvas backing store to its CSS box so pen coordinates line up (signature_pad maps
  // clientX/Y straight onto canvas pixels). Re-measure on container resize.
  useLayoutEffect(() => {
    if (mode !== 'edit') return
    const el = frameRef.current
    if (!el || typeof ResizeObserver === 'undefined') {
      if (el) setPadWidth(el.clientWidth)
      return
    }
    const ro = new ResizeObserver(() => setPadWidth(el.clientWidth))
    ro.observe(el)
    setPadWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [mode])

  const startEdit = useCallback(() => {
    setMsg(null)
    setPadEmpty(true)
    setMode('edit')
  }, [])

  const clearPad = useCallback(() => {
    padRef.current?.clear()
    setPadEmpty(true)
  }, [])

  const save = useCallback(async () => {
    const pad = padRef.current
    if (!pad || pad.isEmpty()) return
    setBusy(true)
    setMsg(null)
    try {
      const blob: Blob | null = await new Promise((resolve) =>
        onWhite(pad.getCanvas()).toBlob(resolve, 'image/png'),
      )
      if (!blob) throw new Error('toBlob failed')
      await putHospitalSignature(blob)
      setVersion((v) => v + 1)
      onChange()
      setMsg({ text: 'Semnătura a fost salvată.' })
      setMode('view')
    } catch (e) {
      setMsg({ text: apiMsg(e, 'Salvarea semnăturii a eșuat.'), error: true })
    } finally {
      setBusy(false)
    }
  }, [onChange])

  const uploadFile = useCallback(
    async (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        setMsg({ text: 'Imaginea trebuie să fie PNG sau JPEG.', error: true })
        return
      }
      if (file.size > MAX_BYTES) {
        setMsg({ text: 'Imaginea nu poate depăși 256 KB.', error: true })
        return
      }
      setBusy(true)
      setMsg(null)
      try {
        await putHospitalSignature(file)
        setVersion((v) => v + 1)
        onChange()
        setMsg({ text: 'Semnătura a fost salvată.' })
        setMode('view')
      } catch (e) {
        setMsg({ text: apiMsg(e, 'Încărcarea imaginii a eșuat.'), error: true })
      } finally {
        setBusy(false)
      }
    },
    [onChange],
  )

  const onPick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0]
      e.currentTarget.value = ''
      if (file) uploadFile(file)
    },
    [uploadFile],
  )

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
      setMode('edit')
      setPadEmpty(true)
    }
  }, [confirm, onChange])

  // A fresh mount with no signature should already be in edit mode; keep them in sync if the
  // signature disappears from under us (e.g. deleted in another tab and revalidated).
  useEffect(() => {
    if (!signature.present) setMode('edit')
  }, [signature.present])

  return (
    <Column>
      {mode === 'view' && signature.present ? (
        <>
          {previewUrl && <SignaturePreview src={previewUrl} alt='Semnătura curentă' />}
          {signature.updatedAt && (
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              Actualizată la {fmtDateTime(signature.updatedAt)}
            </Text>
          )}
          {msg && <MessageBox tone={msg.error ? 'error' : 'ok'}>{msg.text}</MessageBox>}
          <InlineActions>
            <Button variant='secondary' size='XS' disabled={busy} onClick={startEdit}>
              Schimbă semnătura
            </Button>
            <Button variant='danger' size='XS' disabled={busy} onClick={remove}>
              Șterge semnătura
            </Button>
          </InlineActions>
        </>
      ) : (
        <>
          <DrawPadFrame ref={frameRef}>
            {padWidth > 0 && (
              <SignatureCanvas
                key={padWidth}
                ref={padRef}
                penColor={WDS_COLOR_BLUE_500}
                clearOnResize={false}
                canvasProps={{ width: padWidth, height: PAD_HEIGHT }}
                onEnd={() => setPadEmpty(padRef.current?.isEmpty() ?? true)}
              />
            )}
          </DrawPadFrame>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            Desenează semnătura cu mouse-ul sau cu degetul.
          </Text>

          {msg && <MessageBox tone={msg.error ? 'error' : 'ok'}>{msg.text}</MessageBox>}

          <InlineActions>
            <Button size='XS' disabled={busy || padEmpty} onClick={save}>
              Salvează semnătura
            </Button>
            <Button variant='secondary' size='XS' disabled={busy} onClick={clearPad}>
              Șterge
            </Button>
            {signature.present && (
              <Button variant='secondary' size='XS' disabled={busy} onClick={() => setMode('view')}>
                Renunță
              </Button>
            )}
          </InlineActions>

          <LinkButton disabled={busy} onClick={() => inputRef.current?.click()}>
            Încarcă o imagine în loc
          </LinkButton>
          <HiddenFileInput
            ref={inputRef}
            type='file'
            accept='image/png,image/jpeg'
            onChange={onPick}
          />
        </>
      )}

      <DisclaimerBox>
        Imaginea este un facsimil, nu o semnătură electronică calificată. Dacă ai nevoie de o
        semnătură cu valoare legală, tipărește PV-ul și semnează-l olograf sau folosește un
        instrument extern de semnare.
      </DisclaimerBox>
    </Column>
  )
}
