import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_040_PX, WDS_SIZE_080_PX } from 'common/style/size'

export const Content = styled.div`
  ${flex({ justifyContent: 'center' })};
  padding: ${WDS_SIZE_040_PX} ${WDS_SIZE_080_PX};
`
