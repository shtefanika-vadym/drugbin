import { flex } from 'common/style/mixins/flex.mixin'
import styled from 'styled-components'

export const Container = styled.div`
  width: fit-content;
`

export const ButtonWrapper = styled.div`
  ${flex({ direction: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap', gap: '16px' })};
`
