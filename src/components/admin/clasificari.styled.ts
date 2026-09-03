import {
  WDS_COLOR_GREY,
  WDS_COLOR_GREY_100,
  WDS_COLOR_WHITE,
  WDS_COLOR_WHITE_100,
} from 'common/styles/colors'
import { border } from 'common/styles/mixins/border.mixin'
import { ellipsis } from 'common/styles/mixins/elipsis.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { grid } from 'common/styles/mixins/grid.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_001_PX,
  WDS_SIZE_004_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_224_PX,
} from 'common/styles/size'
import { WDS_Z_INDEX_OVER_CONTENT } from 'common/styles/tokens/layers'
import styled from 'styled-components'

/** Layout for the image-forward "Galerie" view of the Clasificări screen. */

export const GalleryGrid = styled.div`
  ${grid({
    gridTemplateColumns: `repeat(auto-fill, minmax(${WDS_SIZE_224_PX}, 1fr))`,
    columnGap: WDS_SIZE_016_PX,
    rowGap: WDS_SIZE_016_PX,
  })};
`

export const GalleryCard = styled.article`
  ${flex({ direction: 'column' })};
  position: relative;
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_012_PX};
  overflow: hidden;
  background: ${WDS_COLOR_WHITE};
`

export const GalleryPhoto = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  aspect-ratio: 16 / 10;
  background: ${WDS_COLOR_WHITE_100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const GalleryBadge = styled.div`
  position: absolute;
  top: ${WDS_SIZE_008_PX};
  left: ${WDS_SIZE_008_PX};
`

export const GalleryBody = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
  padding: ${WDS_SIZE_012_PX};
`

export const GalleryName = styled.div`
  ${ellipsis({ webkitLineClamp: 1, whiteSpace: 'nowrap' })};
`

export const GalleryFoot = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between', gap: WDS_SIZE_008_PX })};
  margin-top: ${WDS_SIZE_004_PX};
`

export const GalleryActions = styled.div`
  ${flex({ gap: WDS_SIZE_008_PX })};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX} ${WDS_SIZE_012_PX};

  & > * {
    flex: 1;
  }
`

/** Inline failure line under a gallery card's action bar (approve / withdraw error). */
export const GalleryError = styled.div`
  padding: 0 ${WDS_SIZE_012_PX} ${WDS_SIZE_012_PX};
`

/** Bulk-selection bar shown above the dense "Tabel" view when rows are selected. */
export const BulkBar = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
  position: sticky;
  top: 0;
  z-index: ${WDS_Z_INDEX_OVER_CONTENT};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_WHITE_100};
`

/** Pushes the "Anulează" / feedback text to the far end of the bulk bar. */
export const BulkSpacer = styled.div`
  margin-left: auto;
`

/** Checkbox wrapper inside the leading table cell — click here must not navigate the row. */
export const CheckCell = styled.label`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  cursor: pointer;
`

/** The "Durată" column header rendered as a sort control. */
export const SortTh = styled.button`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_004_PX })};
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
`

/** Transient "N aprobate, M eșuate" feedback line in the bulk bar. */
export const BulkNote = styled.span`
  color: ${WDS_COLOR_GREY};
`

/* ------------------------------------------------------------------ header + toolbar */

/** "Sincronizat" freshness label sitting next to the refresh control in the header. */
export const SyncedText = styled.span`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
`

/** Right-hand header group: freshness label, refresh, divider, "Simulează". */
export const UtilityCluster = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
`

/** Thin separator between the refresh control and the "Simulează" action. */
export const VDivider = styled.div`
  width: ${WDS_SIZE_001_PX};
  align-self: stretch;
  min-height: ${WDS_SIZE_016_PX};
  background: ${WDS_COLOR_GREY_100};
`

/** The filter row — a card visually detached from the header. */
export const Toolbar = styled.div`
  ${flex({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: WDS_SIZE_012_PX,
    flexWrap: 'wrap',
  })};
  padding: ${WDS_SIZE_012_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_012_PX};
  background: ${WDS_COLOR_WHITE_100};
`

/** Category / confidence selects, sort control and the view toggle, right-aligned in the toolbar. */
export const FilterCluster = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX, flexWrap: 'wrap' })};
`

/** "Galerie" / "Tabel" button pair. */
export const ViewToggle = styled.div`
  ${flex({ gap: WDS_SIZE_004_PX })};
`

/** "Durată ↑/↓/—" sort toggle rendered as a bordered button. */
export const SortButton = styled.button`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_004_PX })};
  ${textVariant('bodyXS')};
  background: ${WDS_COLOR_WHITE};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX};
  cursor: pointer;
`
