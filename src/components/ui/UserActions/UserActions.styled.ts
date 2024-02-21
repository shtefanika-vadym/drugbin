import { WDS_COLOR_BLUE_100, WDS_COLOR_WHITE } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import {
    WDS_SIZE_008_PX,
    WDS_SIZE_012_PX,
    WDS_SIZE_016_PX
} from 'common/style/size'
import styled from 'styled-components'

export const Menu = styled.div`
  background: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_016_PX};
  width: 215px;
  box-shadow: 0px 4px 20px 0px rgba(19, 20, 22, 0.08);
  left: unset;
  top: unset;
  position: absolute;

  ${flex({ direction: 'column', gap: WDS_SIZE_012_PX })};
`

export const MenuActions = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX })};
  cursor: pointer;
`

export const Border = styled.div`
  border-bottom: 1px solid ${WDS_COLOR_BLUE_100};
`
