import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { grid } from 'common/style/mixins/grid.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const ContentRecycleBox = styled.div`
  border: 1px solid #f2f2f7;
  border-radius: 8px;
  height: 88px;
  ${grid({ gridTemplateColumns: '3fr 2fr 1fr 1fr' })};
  align-items: center;
  padding: 0 24px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.03);
  cursor: pointer;

  :hover {
    border: 1px solid #2949a6;
  }
`

export const Name = styled.p`
  ${textVariant('subheading')};
  color: #000611;
`

export const Text = styled.p`
  ${textVariant('bodyM')};
  color: #01102e;
`

export const CotentWrapper = styled.div`
  ${flex({ direction: 'column', gap: '16px' })}
`
