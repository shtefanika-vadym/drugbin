import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_50,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_GREEN,
  WDS_COLOR_GREY,
  WDS_COLOR_GREY_100,
  WDS_COLOR_ORANGE,
  WDS_COLOR_WHITE,
  WDS_COLOR_WHITE_100,
} from 'common/styles/colors'
import { border } from 'common/styles/mixins/border.mixin'
import { ellipsis } from 'common/styles/mixins/elipsis.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { grid } from 'common/styles/mixins/grid.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { StatusTone } from 'components/admin/StatusTag.styled'
import { SelectMenu } from 'components/ui/SelectMenu/SelectMenu'
import { SELECT_MENU_HEIGHT } from 'components/ui/SelectMenu/SelectMenu.styled'
import {
  WDS_SIZE_001_PX,
  WDS_SIZE_002_PX,
  WDS_SIZE_004_PX,
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_014_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_040_PX,
  WDS_SIZE_176_PX,
  WDS_SIZE_224_PX,
} from 'common/styles/size'
import { WDS_Z_INDEX_OVER_CONTENT } from 'common/styles/tokens/layers'
import styled from 'styled-components'

/* ------------------------------------------------------------------ header + toolbar */

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

/** The filter row — one horizontal strip, visually detached from the header. */
export const Toolbar = styled.div`
  ${flex({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: WDS_SIZE_012_PX,
    flexWrap: 'wrap',
  })};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_012_PX};
  background: ${WDS_COLOR_WHITE_100};
`

/** Segmented status filter — Toate / Neaprobate / Aprobate, each with a count. */
export const Segmented = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_002_PX })};
  height: ${SELECT_MENU_HEIGHT};
  padding: 0 ${WDS_SIZE_002_PX};
  background: ${WDS_COLOR_WHITE};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_010_PX};
`

export const SegmentedItem = styled.button<{ $active: boolean }>`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_006_PX })};
  ${textVariant('bodyXS')};
  cursor: pointer;
  height: calc(${SELECT_MENU_HEIGHT} - ${WDS_SIZE_008_PX});
  padding: 0 ${WDS_SIZE_010_PX};
  border-radius: ${WDS_SIZE_006_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: 'transparent' })};
  background: ${({ $active }) => ($active ? WDS_COLOR_WHITE_100 : 'transparent')};
  border-color: ${({ $active }) => ($active ? WDS_COLOR_GREY_100 : 'transparent')};
  color: ${({ $active }) => ($active ? WDS_COLOR_BLACK : WDS_COLOR_GREY)};
`

export const SegCount = styled.span<{ $active: boolean }>`
  ${textVariant('bodyXS')};
  padding: 0 ${WDS_SIZE_006_PX};
  border-radius: ${WDS_SIZE_006_PX};
  background: ${({ $active }) => ($active ? WDS_COLOR_BLUE_50 : WDS_COLOR_WHITE_100)};
  color: ${({ $active }) => ($active ? WDS_COLOR_BLUE_300 : WDS_COLOR_GREY)};
`

/** Category / confidence selects, sort control and the view toggle, right-aligned in the toolbar. */
export const FilterCluster = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX, flexWrap: 'wrap' })};
`

/** A toolbar filter dropdown — the shared `SelectMenu`, width-capped for the toolbar. */
export const ToolbarFilter = styled(SelectMenu)`
  width: ${WDS_SIZE_176_PX};
`

/** Compact segmented toggle for "Galerie" / "Tabel" — same language as the status filter. */
export const ViewToggle = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_002_PX })};
  height: ${SELECT_MENU_HEIGHT};
  padding: 0 ${WDS_SIZE_002_PX};
  background: ${WDS_COLOR_WHITE};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_010_PX};
`

export const ViewToggleItem = styled.button<{ $active: boolean }>`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_004_PX })};
  ${textVariant('bodyXS')};
  cursor: pointer;
  height: calc(${SELECT_MENU_HEIGHT} - ${WDS_SIZE_008_PX});
  padding: 0 ${WDS_SIZE_010_PX};
  border-radius: ${WDS_SIZE_006_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: 'transparent' })};
  background: ${({ $active }) => ($active ? WDS_COLOR_WHITE_100 : 'transparent')};
  border-color: ${({ $active }) => ($active ? WDS_COLOR_GREY_100 : 'transparent')};
  color: ${({ $active }) => ($active ? WDS_COLOR_BLACK : WDS_COLOR_GREY)};

  svg {
    width: ${WDS_SIZE_014_PX};
    height: ${WDS_SIZE_014_PX};
  }
`

/* ------------------------------------------------------------------ shared cells */

/** Small bordered pill for the disposal category, used in both views. */
export const CatChip = styled.span`
  width: max-content;
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
  background: ${WDS_COLOR_WHITE_100};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_006_PX};
  padding: ${WDS_SIZE_002_PX} ${WDS_SIZE_008_PX};
`

/** Confidence as a coloured dot + label (table + gallery foot). */
export const Confidence = styled.span`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_006_PX })};
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
`

const CONF_DOT_COLOR: Record<StatusTone, string> = {
  ok: WDS_COLOR_GREEN,
  warn: WDS_COLOR_ORANGE,
  danger: WDS_COLOR_ORANGE,
  muted: WDS_COLOR_GREY_100,
}

export const ConfDot = styled.span<{ $tone: StatusTone }>`
  width: ${WDS_SIZE_006_PX};
  height: ${WDS_SIZE_006_PX};
  border-radius: 50%;
  background: ${({ $tone }) => CONF_DOT_COLOR[$tone]};
`

/** Monospace-aligned numeric (duration, timings) so columns line up. */
export const Numeric = styled.span`
  font-variant-numeric: tabular-nums;
`

/* ------------------------------------------------------------------ Galerie view */

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
  overflow: hidden;
  cursor: pointer;
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  border-radius: ${WDS_SIZE_012_PX};
  background: ${WDS_COLOR_WHITE};

  &:hover,
  &:focus-visible {
    border-color: ${WDS_COLOR_BLUE_300};
  }

  &:focus-visible {
    outline: none;
  }
`

export const GalleryPhoto = styled.div`
  position: relative;
  flex: none;
  width: 100%;
  /* 10 / 16 — bulletproof fixed ratio so every card's photo is identical height. */
  padding-top: 62.5%;
  overflow: hidden;
  background: ${WDS_COLOR_WHITE_100};
  color: ${WDS_COLOR_GREY_100};

  img,
  svg {
    position: absolute;
    inset: 0;
    margin: auto;
  }

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
  ${flex({ direction: 'column', alignItems: 'flex-start', gap: WDS_SIZE_006_PX })};
  flex: 1;
  padding: ${WDS_SIZE_012_PX};
`

/** Two-line clamped drug name — reserves the height so cards align whatever the name length. */
export const GalleryName = styled.div`
  min-height: ${WDS_SIZE_040_PX};

  & > * {
    ${ellipsis({ display: '-webkit-box', webkitBoxOrient: 'vertical', webkitLineClamp: 2 })};
  }
`

/** ATC + package, one muted line under the name. */
export const GalleryMeta = styled.div`
  ${ellipsis({ webkitLineClamp: 1, whiteSpace: 'nowrap' })};
  width: 100%;
`

export const GalleryFoot = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between', gap: WDS_SIZE_008_PX })};
  width: 100%;
  margin-top: auto;
  padding-top: ${WDS_SIZE_006_PX};
`

export const GalleryWhen = styled.span`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
  white-space: nowrap;
`

/**
 * Review / approve actions — hidden at rest, slid up over the card foot on hover or keyboard
 * focus, as in the approved design pitch.
 */
export const GalleryActions = styled.div`
  ${flex({ gap: WDS_SIZE_008_PX })};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX} ${WDS_SIZE_012_PX};
  background: ${WDS_COLOR_WHITE};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100, variant: 'top' })};
  transform: translateY(100%);
  transition: transform 0.16s ease;

  ${GalleryCard}:hover &,
  ${GalleryCard}:focus-within & {
    transform: translateY(0);
  }

  & > * {
    flex: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/** Inline failure line under a gallery card's action bar (approve error). */
export const GalleryError = styled.div`
  padding: 0 ${WDS_SIZE_012_PX} ${WDS_SIZE_012_PX};
`

/* ------------------------------------------------------------------ Tabel view */

/** Bulk-selection bar shown above the dense "Tabel" view when rows are selected. */
export const BulkBar = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
  position: sticky;
  top: 0;
  z-index: ${WDS_Z_INDEX_OVER_CONTENT};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_BLUE_300 })};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_BLUE_50};
`

/** Pushes the "Anulează" / feedback text to the far end of the bulk bar. */
export const BulkSpacer = styled.div`
  margin-left: auto;
`

/** Transient "N aprobate, M eșuate" feedback line in the bulk bar. */
export const BulkNote = styled.span`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
`

/** Checkbox wrapper inside the leading table cell — click here must not navigate the row. */
export const CheckCell = styled.label`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  cursor: pointer;
`

/** Drug name + ATC stacked in the "Medicament" cell. */
export const DrugCell = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_002_PX })};
  min-width: 0;
`
