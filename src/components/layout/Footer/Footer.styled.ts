import { WDS_BREAKPOINT_DESKTOP_M, WDS_BREAKPOINT_DESKTOP_S } from 'common/constants/breakpoint'
import { WDS_SIZE_080_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.footer`
  @media (min-width: ${WDS_BREAKPOINT_DESKTOP_S}) {
    padding-inline: ${WDS_SIZE_080_PX};
    max-width: ${WDS_BREAKPOINT_DESKTOP_M};
    margin: 0 auto;
  }
`
