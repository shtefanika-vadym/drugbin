import { WDS_BREAKPOINT_DESKTOP_S } from 'common/constants/breakpoint'
import { WDS_COLOR_BLUE_100, WDS_COLOR_WHITE } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import {
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_064_PX,
  WDS_SIZE_080_PX,
} from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: WDS_SIZE_024_PX,
  })};
  width: 100%;
  background: ${WDS_COLOR_WHITE};
  border-bottom: 1px solid ${WDS_COLOR_BLUE_100};
  position: relative;
  padding: ${WDS_SIZE_016_PX} ${WDS_SIZE_080_PX};
  box-sizing: border-box;

  @media (min-width: ${WDS_BREAKPOINT_DESKTOP_S}) {
    ${flex({ gap: WDS_SIZE_064_PX })};
    margin: 0 auto;
  }
`
