import { postApprove, postUnapprove, useImageBlob } from 'common/hooks/admin'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import { ClassificationRow } from 'common/types/manage.types'
import { Button } from 'components/ui/Button/Button'
import { Empty } from 'components/ui/Empty/Empty'
import { Text } from 'components/ui/Text/Text'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { STATUS_TONE, categoryLabel, confidenceLabel, fmtMs, statusLabel } from './format'
import { StatusTag } from './StatusTag'
import {
  GalleryActions,
  GalleryBadge,
  GalleryBody,
  GalleryCard,
  GalleryFoot,
  GalleryGrid,
  GalleryName,
  GalleryPhoto,
} from './clasificari.styled'

interface Props {
  items: ClassificationRow[]
  /** Card actions navigate to `${linkPrefix}/${imageId}` — the classification detail. */
  linkPrefix: string
  /** `admin` principals only — hospital principals see the cards without approve controls. */
  canApprove: boolean
  isLoading?: boolean
  /** Called after an approve / unapprove succeeds so the list can re-fetch. */
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
  const approved = c.status === 'approved'

  const toggle = async () => {
    setBusy(true)
    try {
      if (approved) await postUnapprove(c.imageId)
      else await postApprove(c.imageId)
      onChanged()
    } finally {
      setBusy(false)
    }
  }

  return (
    <GalleryCard>
      <GalleryPhoto>{url ? <img src={url} alt='' loading='lazy' /> : null}</GalleryPhoto>
      <GalleryBadge>
        <StatusTag tone={STATUS_TONE[c.status] ?? 'muted'}>{statusLabel(c.status)}</StatusTag>
      </GalleryBadge>
      <GalleryBody>
        <GalleryName>
          <Text variant='bodyM'>{c.drugName || '—'}</Text>
        </GalleryName>
        <Text variant='bodyXS' color={WDS_COLOR_GREY}>
          {`${c.drugAtc || '—'} · ${categoryLabel(c.drugCategory)}`}
        </Text>
        <GalleryFoot>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            {confidenceLabel(c.confidence)}
          </Text>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            {fmtMs(c.latencyTotalMs)}
          </Text>
        </GalleryFoot>
      </GalleryBody>
      <GalleryActions>
        <Button
          variant='secondary'
          size='XS'
          onClick={() => navigate(`${linkPrefix}/${c.imageId}`)}>
          Revizuiește
        </Button>
        {canApprove && (
          <Button size='XS' disabled={busy} onClick={toggle}>
            {approved ? 'Retrage' : 'Aprobă'}
          </Button>
        )}
      </GalleryActions>
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
