import { WDS_COLOR_GREY_100, WDS_COLOR_WHITE, WDS_COLOR_WHITE_100 } from 'common/styles/colors'
import { border } from 'common/styles/mixins/border.mixin'
import { ellipsis } from 'common/styles/mixins/elipsis.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { grid } from 'common/styles/mixins/grid.mixin'
import {
  WDS_SIZE_001_PX,
  WDS_SIZE_004_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_224_PX,
} from 'common/styles/size'
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
