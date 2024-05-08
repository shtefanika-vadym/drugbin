import { WDS_COLOR_BLUE_100, WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import {
  WDS_SIZE_004_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_026_PX,
} from 'common/style/size'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_008_PX })};
`

export const PaginationContainer = styled.div`
  ${flex({ direction: 'row-reverse' })};
  margin-block-start: ${WDS_SIZE_016_PX};
`

export const Tile = styled.button<{ active?: boolean }>`
  all: unset;
  ${border({ width: '1px', color: WDS_COLOR_BLUE_400 })};
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  background-color: transparent;
  border-radius: ${WDS_SIZE_004_PX};
  width: ${WDS_SIZE_024_PX};
  height: ${WDS_SIZE_026_PX};
  padding: unset;
  cursor: pointer;

  ${({ active, disabled }) => {
    if (active) {
      return css`
        color: ${WDS_COLOR_BLUE_400};
        ${border({ width: '1px', color: WDS_COLOR_BLUE_400 })}
      `
    }
    if (disabled) {
      return css`
        ${border({ width: '1px', color: active ? WDS_COLOR_BLUE_400 : WDS_COLOR_GREY })};
        background-color: ${WDS_COLOR_BLUE_100};
        color: ${WDS_COLOR_GREY};
        cursor: not-allowed;
      `
    }
    return css`
      color: ${WDS_COLOR_GREY};
      ${border({ width: '1px', color: active ? WDS_COLOR_BLUE_400 : WDS_COLOR_GREY })};

      &:hover {
        color: ${WDS_COLOR_BLUE_400};
      }
    `
  }}

  svg {
    &.rotate {
      transform: rotate(90deg);
    }
  }
`
