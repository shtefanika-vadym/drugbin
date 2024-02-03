import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_024_PX } from 'common/style/size'
import styled from 'styled-components'

export const Page = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX, alignItems: 'center' })};
`

export const Main = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX, alignItems: 'center' })};
  box-sizing: border-box;
  width: 100%;
  padding: 0 80px;
`
