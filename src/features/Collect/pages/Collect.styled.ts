import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'

export const ButtonWrapper = styled.div`
  width: 100%;
  ${flex({ justifyContent: 'space-between', alignItems: 'flex-end', alignContent: 'flex-end' })}
`

export const RecycleWrapper = styled.div`
  width: 100%;
  ${flex({ direction: 'column', gap: '24px' })};
`
