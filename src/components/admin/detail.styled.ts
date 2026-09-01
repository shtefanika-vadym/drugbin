import { WDS_COLOR_GREY_100, WDS_COLOR_WHITE_100 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_032_PX,
} from 'common/styles/size'
import styled from 'styled-components'

export const Sections = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_032_PX })};
`

export const BackRow = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_016_PX })};
`

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  gap: ${WDS_SIZE_024_PX};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const Image = styled.img`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: ${WDS_SIZE_012_PX};
  border: 1px solid ${WDS_COLOR_GREY_100};
  background: ${WDS_COLOR_WHITE_100};
  display: block;
`

export const CheckboxRow = styled.label`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX })};
  cursor: pointer;
`
