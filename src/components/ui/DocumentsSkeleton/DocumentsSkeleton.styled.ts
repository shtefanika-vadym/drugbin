import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_004_PX, WDS_SIZE_008_PX, WDS_SIZE_016_PX } from 'common/style/size'
import styled from 'styled-components'

export const Row = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  padding: ${WDS_SIZE_008_PX};
`
export const NameWrapper = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
`

export const IconWrpper = styled.div`
  width: 280px;
  ${flex({ gap: WDS_SIZE_016_PX })};
`
