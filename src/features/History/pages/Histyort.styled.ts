import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_024_PX } from 'common/style/size'

export const ContentHistory = styled.div`
  ${flex({ direction: 'column', gap: '40px' })};
  width: 1285px;
  max-width: 1285px;
  padding: ${WDS_SIZE_024_PX};
  border-radius: 16px;
  background: white;
`
export const TitleWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })};
`

export const Title = styled.p`
  ${textVariant('titleH4')}
`

export const InputWrapper = styled.div`
  ${flex({ gap: '8px' })}
`
export const BoxWrapper = styled.div`
  ${flex({ direction: 'column', gap: '16px' })}
`

export const TableWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })}
`
