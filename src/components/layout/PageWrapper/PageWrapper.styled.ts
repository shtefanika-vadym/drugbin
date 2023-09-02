import { WDS_BREAKPOINT_DESKTOP_S, WDS_BREAKPOINT_DESKTOP_M } from 'common/constants/breakpoint'
import { WDS_COLOR_WHITE } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_016_PX, WDS_SIZE_024_PX } from 'common/style/size'
import styled from 'styled-components'

export const Page = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`

export const Main = styled.div`
  flex-grow: 1;
  padding: ${WDS_SIZE_016_PX} ${WDS_SIZE_024_PX};
  border-radius: ${WDS_SIZE_016_PX};
  margin: 0 20px;

  @media (min-width: ${WDS_BREAKPOINT_DESKTOP_S}) {
    padding: ${WDS_SIZE_024_PX};
    width: 100%;
    max-width: ${WDS_BREAKPOINT_DESKTOP_M};
    margin: 0 auto;
  }
  background-color: ${WDS_COLOR_WHITE};
`
