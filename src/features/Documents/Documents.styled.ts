import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_024_PX } from 'common/style/size'

export const ContentDocuments = styled.div`
  ${flex({ direction: 'column', gap: '40px' })};
  width: 1285px;
  max-width: 1285px;
  padding: ${WDS_SIZE_024_PX};
  border-radius: 16px;
  background: white;
`

export const Title = styled.p`
  ${textVariant('titleH4')};
`
