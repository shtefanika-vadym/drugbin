import {
  deleteClassification,
  postReclassify,
  useClassification,
  useImageBlob,
} from 'common/hooks/admin'
import { ReclassifyResponse } from 'common/types/manage.types'
import { useAuthState } from 'common/state/auth.state'
import { WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { CopyText } from 'components/ui/CopyText/CopyText'
import { Tabs } from 'components/ui/Tabs/Tabs'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CorrectionForm } from './CorrectionForm'
import { DefinitionList } from './dialog.styled'
import { BackRow, Image, Layout, Sections } from './detail.styled'
import { TimingBreakdown } from './TimingBreakdown'
import { categoryLabel, confidenceLabel, fmtDateTime } from './format'

const num = (n: number | null | undefined) => (n == null ? '—' : n.toFixed(3))

/** An identifier cell: click-to-copy when present, em dash when not. */
const idCell = (value: string | null | undefined) =>
  value ? <CopyText value={value}>{value}</CopyText> : '—'

const TABS = [
  { id: 'detalii' as const, label: 'Detalii' },
  { id: 'actiuni' as const, label: 'Acțiuni' },
]

interface ClassificationDetailProps {
  /** Route the "back" button and post-delete redirect target. */
  basePath?: string
}

export const ClassificationDetail: React.FC<ClassificationDetailProps> = ({
  basePath = '/admin/clasificari',
}) => {
  const { imageId = '' } = useParams()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const role = useAuthState((s) => s.role)
  const { detail, isLoading, isError, mutate } = useClassification(imageId)
  const { url, failed } = useImageBlob(imageId)

  const [tab, setTab] = useState<'detalii' | 'actiuni'>('detalii')
  const [rerun, setRerun] = useState<ReclassifyResponse | null>(null)
  const [rerunErr, setRerunErr] = useState('')
  const [busy, setBusy] = useState(false)

  const remove = useCallback(async () => {
    const ok = await confirm({
      title: 'Ștergi definitiv această clasificare?',
      description:
        'Se șterg înregistrarea, corecțiile, ambele imagini, vectorul din index și cache-ul. ' +
        'Acțiunea nu poate fi anulată.',
      confirmLabel: 'Șterge clasificarea',
      danger: true,
      action: () => deleteClassification(imageId),
    })
    if (ok) navigate(basePath)
  }, [confirm, imageId, navigate, basePath])

  const reclassify = useCallback(async () => {
    setBusy(true)
    setRerunErr('')
    try {
      setRerun(await postReclassify(imageId))
    } catch (e: any) {
      setRerunErr(e?.response?.data?.message || 'Reclasificarea a eșuat.')
    } finally {
      setBusy(false)
    }
  }, [imageId])

  if (isLoading || !detail) {
    return (
      <Text variant='bodyM' color={WDS_COLOR_GREY}>
        {isError ? 'Se procesează clasificarea… pagina se actualizează automat.' : 'Se încarcă…'}
      </Text>
    )
  }

  const c = detail.classification

  return (
    <Sections>
      <BackRow>
        <Button variant='secondary' size='XS' onClick={() => navigate(basePath)}>
          ← Înapoi
        </Button>
        <Text variant='bodyS' color={WDS_COLOR_GREY}>
          {fmtDateTime(c.createdAt)} · {c.machineId}
        </Text>
      </BackRow>

      <Layout>
        <div>
          {url ? (
            <Image src={url} alt='' />
          ) : (
            <Text variant='bodyS' color={WDS_COLOR_GREY}>
              {failed ? 'Imaginea nu este disponibilă.' : 'Se încarcă imaginea…'}
            </Text>
          )}
        </div>

        <Sections>
          <Tabs items={TABS} active={tab} onChange={setTab} />

          {tab === 'detalii' && (
            <>
              <DashboardCard title='Rezultat'>
                <DefinitionList>
                  <dt>Nivel</dt>
                  <dd>{c.tier}</dd>
                  <dt>Încredere</dt>
                  <dd>{confidenceLabel(c.confidence)}</dd>
                  <dt>Nume</dt>
                  <dd>{c.drugName || '—'}</dd>
                  <dt>Ambalaj</dt>
                  <dd>{c.drugPackage || '—'}</dd>
                  <dt>Concentrație</dt>
                  <dd>{c.drugConcentration || '—'}</dd>
                  <dt>Prescripție</dt>
                  <dd>{c.drugPrescription || '—'}</dd>
                  <dt>ATC</dt>
                  <dd>{c.drugAtc || '—'}</dd>
                  <dt>Categorie</dt>
                  <dd>{categoryLabel(c.drugCategory)}</dd>
                  <dt>Model embed</dt>
                  <dd>{c.embedModel || '—'}</dd>
                  <dt>Model vision</dt>
                  <dd>{c.visionModel || '—'}</dd>
                  <dt>Scor potrivire</dt>
                  <dd>{num(c.matchScore)}</dd>
                  <dt>Marjă</dt>
                  <dd>{num(c.matchMargin)}</dd>
                  <dt>Request ID</dt>
                  <dd>{idCell(c.requestId)}</dd>
                  <dt>Cloudflare Ray ID</dt>
                  <dd>{idCell(c.cfRayId)}</dd>
                  <dt>Gateway log</dt>
                  <dd>{idCell(c.gatewayLogId)}</dd>
                </DefinitionList>
              </DashboardCard>

              <DashboardCard title='Durata pe etape'>
                <TimingBreakdown steps={detail.steps} total={c.latencyTotalMs} />
              </DashboardCard>
            </>
          )}

          {tab === 'actiuni' && (
            <>
              <DashboardCard title='Corecție'>
                <CorrectionForm
                  imageId={imageId}
                  corrections={detail.corrections}
                  onSaved={mutate}
                />
              </DashboardCard>

              <DashboardCard title='Reclasificare'>
                <Text variant='bodyS' color={WDS_COLOR_GREY}>
                  Rulează din nou nivelul 1 + 2 pe imaginea stocată. Nu suprascrie înregistrarea.
                </Text>
                <div>
                  <Button variant='secondary' disabled={busy} onClick={reclassify}>
                    Reclasifică
                  </Button>
                </div>
                {rerunErr && (
                  <Text variant='bodyXS' color={WDS_COLOR_RED}>
                    {rerunErr}
                  </Text>
                )}
                {rerun && (
                  <>
                    <DefinitionList>
                      <dt>Inițial</dt>
                      <dd>{confidenceLabel(rerun.original.confidence)}</dd>
                      <dt>Nivelul 1</dt>
                      <dd>
                        {rerun.rerun.tier1.hit
                          ? `potrivire (scor ${num(rerun.rerun.tier1.score)})`
                          : 'fără potrivire'}
                      </dd>
                      <dt>Nivelul 2</dt>
                      <dd>
                        {rerun.rerun.tier2.model} · {confidenceLabel(rerun.rerun.tier2.confidence)}
                      </dd>
                    </DefinitionList>
                    <TimingBreakdown steps={rerun.rerun.steps} />
                  </>
                )}
              </DashboardCard>

              {role === 'admin' && (
                <DashboardCard title='Zonă periculoasă'>
                  <Text variant='bodyS' color={WDS_COLOR_GREY}>
                    Șterge definitiv clasificarea: înregistrarea, corecțiile, ambele imagini,
                    vectorul din index și cache-ul. Nu poate fi anulată.
                  </Text>
                  <div>
                    <Button variant='danger' onClick={remove}>
                      Șterge clasificarea
                    </Button>
                  </div>
                </DashboardCard>
              )}
            </>
          )}
        </Sections>
      </Layout>
    </Sections>
  )
}
