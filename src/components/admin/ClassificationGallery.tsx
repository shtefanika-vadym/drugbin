import { postApprove, useImageBlob } from 'common/hooks/admin'
import { WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { ClassificationRow } from 'common/types/manage.types'
import { Button } from 'components/ui/Button/Button'
import { Empty } from 'components/ui/Empty/Empty'
import { Skeleton } from 'components/ui/Skeleton/Skeleton'
import { Text } from 'components/ui/Text/Text'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CONFIDENCE_TONE,
  STATUS_TONE,
  categoryLabel,
  confidenceLabel,
  fmtDate,
  fmtMs,
  fmtTime,
  packageLabel,
  statusLabel,
} from './format'
import { StatusTag } from './StatusTag'
import {
  CatChip,
  ConfDot,
  Confidence,
  GalleryActions,
  GalleryBadge,
  GalleryBody,
  GalleryCard,
  GalleryError,
  GalleryFoot,
  GalleryGrid,
  GalleryMeta,
  GalleryName,
  GalleryPhoto,
  GalleryWhen,
} from './clasificari.styled'

/** Faint blister-pack mark shown when a card has no archived photo (or it failed to load). */
const PhotoGlyph = () => (
  <svg width='40' height='40' viewBox='0 0 48 48' fill='none' aria-hidden='true'>
    <rect x='6' y='11' width='36' height='26' rx='4' stroke='currentColor' strokeWidth='2' />
    <circle cx='16' cy='20' r='3' fill='currentColor' />
    <circle cx='24' cy='20' r='3' fill='currentColor' />
    <circle cx='32' cy='20' r='3' fill='currentColor' />
    <circle cx='16' cy='28' r='3' fill='currentColor' />
    <circle cx='24' cy='28' r='3' fill='currentColor' />
    <circle cx='32' cy='28' r='3' fill='currentColor' />
  </svg>
)

interface Props {
  items: ClassificationRow[]
  /** Card actions navigate to `${linkPrefix}/${imageId}` — the classification detail. */
  linkPrefix: string
  /** `admin` principals only — hospital principals see the cards without approve controls. */
  canApprove: boolean
  isLoading?: boolean
  /** Called after an approve succeeds so the list can re-fetch. */
  onChanged: () => void
}

interface CardProps {
  c: ClassificationRow
  linkPrefix: string
  canApprove: boolean
  onChanged: () => void
}

const GalleryItem: React.FC<CardProps> = ({ c, linkPrefix, canApprove, onChanged }) => {
  const navigate = useNavigate()
  const { url } = useImageBlob(c.imageId)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [imgBroken, setImgBroken] = useState(false)
  const approved = c.status === 'approved'

  const approve = async () => {
    setBusy(true)
    setError('')
    try {
      await postApprove(c.imageId)
      onChanged()
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Aprobarea a eșuat.')
    } finally {
      setBusy(false)
    }
  }

  const showImg = url && !imgBroken

  return (
    <GalleryCard>
      <GalleryPhoto>
        {showImg ? (
          <img src={url} alt='' loading='lazy' onError={() => setImgBroken(true)} />
        ) : (
          <PhotoGlyph />
        )}
      </GalleryPhoto>
      <GalleryBadge>
        <StatusTag tone={STATUS_TONE[c.status] ?? 'muted'}>{statusLabel(c.status)}</StatusTag>
      </GalleryBadge>
      <GalleryBody>
        <GalleryName>
          <Text variant='bodyM'>{c.drugName || '—'}</Text>
        </GalleryName>
        <GalleryMeta>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            {[c.drugAtc, packageLabel(c.drugPackage)].filter(Boolean).join(' · ') || '—'}
          </Text>
        </GalleryMeta>
        <CatChip>{categoryLabel(c.drugCategory)}</CatChip>
        <GalleryFoot>
          <Confidence>
            <ConfDot $tone={CONFIDENCE_TONE[c.confidence] ?? 'muted'} />
            {confidenceLabel(c.confidence)}
          </Confidence>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            {fmtMs(c.latencyTotalMs)}
          </Text>
        </GalleryFoot>
        <GalleryWhen>
          {fmtDate(c.createdAt)} · {fmtTime(c.createdAt)}
        </GalleryWhen>
      </GalleryBody>
      <GalleryActions>
        <Button
          variant='secondary'
          size='XS'
          onClick={() => navigate(`${linkPrefix}/${c.imageId}`)}>
          Revizuiește
        </Button>
        {canApprove && !approved && (
          <Button size='XS' disabled={busy} onClick={approve}>
            Aprobă
          </Button>
        )}
      </GalleryActions>
      {error && (
        <GalleryError>
          <Text variant='bodyXS' color={WDS_COLOR_RED}>
            {error}
          </Text>
        </GalleryError>
      )}
    </GalleryCard>
  )
}

/**
 * Image-forward card grid for the Clasificări list. Each card shows the archived photo, a status
 * badge, the drug identity and timing, plus review / approve actions.
 */
export const ClassificationGallery: React.FC<Props> = ({
  items,
  linkPrefix,
  canApprove,
  isLoading,
  onChanged,
}) => {
  if (isLoading && items.length === 0) {
    return (
      <GalleryGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <GalleryCard key={i}>
            <GalleryPhoto />
            <GalleryBody>
              <Skeleton height='20px' width='70%' />
              <Skeleton height='16px' width='45%' />
              <Skeleton height='16px' width='60%' />
            </GalleryBody>
          </GalleryCard>
        ))}
      </GalleryGrid>
    )
  }
  if (!isLoading && items.length === 0) return <Empty description='Nicio clasificare.' />
  return (
    <GalleryGrid>
      {items.map((c) => (
        <GalleryItem
          key={c.imageId}
          c={c}
          linkPrefix={linkPrefix}
          canApprove={canApprove}
          onChanged={onChanged}
        />
      ))}
    </GalleryGrid>
  )
}
