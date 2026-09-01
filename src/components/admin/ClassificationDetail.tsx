import {
  deleteClassification,
  postReclassify,
  useClassification,
  useImageBlob,
} from 'common/hooks/admin'
import { ReclassifyResponse } from 'common/types/manage.types'
import { WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { Button } from 'components/ui/Button/Button'
import { useConfirm } from 'components/ui/ConfirmProvider/ConfirmProvider'
import { Tabs } from 'components/ui/Tabs/Tabs'
import { Text } from 'components/ui/Text/Text'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CorrectionForm } from './CorrectionForm'
import { DefinitionList } from './dialog.styled'
import { BackRow, Image, Layout, Sections } from './detail.styled'
import { TimingBreakdown } from './TimingBreakdown'
import { categoryLabel, fmtDateTime } from './format'

const num = (n: number | null | undefined) => (n == null ? '—' : n.toFixed(3))

const TABS = [
  { id: 'detalii' as const, label: 'Detalii' },
  { id: 'actiuni' as const, label: 'Acțiuni' },
]

export const ClassificationDetail = () => {
  const { imageId = '' } = useParams()
  const navigate = useNavigate()
  const confirm = useConfirm()
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
    if (ok) navigate('/admin/clasificari')
  }, [confirm, imageId, navigate])

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
        <Button variant='secondary' size='XS' onClick={() => navigate('/admin/clasificari')}>
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
                  <dt>Tier</dt>
                  <dd>{c.tier}</dd>
                  <dt>Încredere</dt>
                  <dd>{c.confidence}</dd>
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
                  <dt>Gateway log</dt>
                  <dd>{c.gatewayLogId || '—'}</dd>
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
                  Rulează din nou tier 1 + 2 pe imaginea stocată. Nu suprascrie înregistrarea.
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
                      <dt>Original</dt>
                      <dd>{rerun.original.confidence}</dd>
                      <dt>Tier 1</dt>
                      <dd>
                        {rerun.rerun.tier1.hit
                          ? `potrivire (scor ${num(rerun.rerun.tier1.score)})`
                          : 'fără potrivire'}
                      </dd>
                      <dt>Tier 2</dt>
                      <dd>
                        {rerun.rerun.tier2.model} · {rerun.rerun.tier2.confidence}
                      </dd>
                    </DefinitionList>
                    <TimingBreakdown steps={rerun.rerun.steps} />
                  </>
                )}
              </DashboardCard>

              <DashboardCard title='Zonă periculoasă'>
                <Text variant='bodyS' color={WDS_COLOR_GREY}>
                  Șterge definitiv clasificarea: înregistrarea, corecțiile, ambele imagini, vectorul
                  din index și cache-ul. Nu poate fi anulată.
                </Text>
                <div>
                  <Button variant='danger' onClick={remove}>
                    Șterge clasificarea
                  </Button>
                </div>
              </DashboardCard>
            </>
          )}
        </Sections>
      </Layout>
    </Sections>
  )
}
