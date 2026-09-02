import { simulateClassification, useMachines } from 'common/hooks/admin'
import { WDS_COLOR_GREEN, WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { Select } from 'components/ui/Select/Select'
import { Text } from 'components/ui/Text/Text'
import { UploadIcon } from 'components/ui/Icon'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Actions,
  Description,
  Form,
  HiddenFileInput,
  UploadPreview,
  UploadZone,
} from './dialog.styled'

const apiMsg = (e: any, fallback: string) => e?.response?.data?.message || fallback

interface Props {
  close: () => void
  /** Fired after a successful run so the list revalidates. */
  onDone: () => void
}

/** Touch device with no mouse: offer the camera. A laptop gets the file picker only. */
const prefersCamera = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

export const SimulateDialog: React.FC<Props> = ({ close, onDone }) => {
  const navigate = useNavigate()
  const { machines } = useMachines({ pageSize: 200 })
  const galleryRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const isMobile = useMemo(prefersCamera, [])

  const [machineId, setMachineId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  const pick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files?.[0]
    if (f) {
      setFile(f)
      setError('')
    }
  }, [])

  const run = useCallback(async () => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const res = await simulateClassification(file, machineId || undefined)
      onDone()
      const id = res.meta?.image_id
      if (!id) {
        setError('Clasificarea nu a produs o înregistrare.')
        setBusy(false)
        return
      }
      // The row is written synchronously by /simulate, so the detail page is ready immediately.
      close()
      navigate(`/admin/clasificari/${id}`)
    } catch (e) {
      setError(apiMsg(e, 'Simularea a eșuat. Cheile providerilor pot lipsi (nivelul 1–2).'))
      setBusy(false)
    }
  }, [file, machineId, onDone, close, navigate])

  return (
    <Form>
      <Text variant='titleH4'>Simulează o clasificare</Text>
      <Description>
        Încarcă o poză ca și cum ar fi trimisă de un robot din farmacie. Rulează pipeline-ul real
        (niveluri, arhivare, audit) și se deschide pagina cu detaliile.
      </Description>

      <Select
        label='Robot'
        value={machineId}
        disabled={busy}
        onChange={(e) => setMachineId(e.target.value)}>
        <option value=''>— anonim —</option>
        {machines.map((m) => (
          <option key={m.machineId} value={m.machineId}>
            {m.label} — {m.hospitalName || 'neasignat'}
          </option>
        ))}
      </Select>

      <UploadZone type='button' disabled={busy} onClick={() => galleryRef.current?.click()}>
        {previewUrl ? (
          <UploadPreview src={previewUrl} alt='previzualizare' />
        ) : (
          <UploadIcon width={40} height={40} />
        )}
        <Text variant='bodyS' color={WDS_COLOR_GREY}>
          {file ? file.name : isMobile ? 'Alege din galerie' : 'Selectează o imagine'}
        </Text>
      </UploadZone>
      <HiddenFileInput ref={galleryRef} type='file' accept='image/*' onChange={pick} />

      {isMobile && (
        <>
          <Button
            variant='secondary'
            type='button'
            disabled={busy}
            onClick={() => cameraRef.current?.click()}>
            Fă o poză
          </Button>
          <HiddenFileInput
            ref={cameraRef}
            type='file'
            accept='image/*'
            capture='environment'
            onChange={pick}
          />
        </>
      )}

      {error && (
        <Text variant='bodyXS' color={WDS_COLOR_RED}>
          {error}
        </Text>
      )}
      {busy && (
        <Text variant='bodyXS' color={WDS_COLOR_GREEN}>
          Se clasifică… poate dura câteva secunde.
        </Text>
      )}

      <Actions>
        <Button variant='secondary' onClick={close} disabled={busy}>
          Anulare
        </Button>
        <Button onClick={run} disabled={busy || !file}>
          Clasifică
        </Button>
      </Actions>
    </Form>
  )
}
