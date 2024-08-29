import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_080_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Page = styled.div`
  ${flex({ direction: 'column', alignItems: 'center' })};
`

export const Main = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX, alignItems: 'center' })};
  padding: ${WDS_SIZE_024_PX} ${WDS_SIZE_080_PX};
  box-sizing: border-box;
  width: 100%;
`
