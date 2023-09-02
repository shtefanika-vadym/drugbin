import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_016_PX, WDS_SIZE_024_PX } from 'common/style/size'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
`

export const Title = styled.p`
  ${textVariant('titleH4')};
  margin-bottom: ${WDS_SIZE_024_PX};
`
