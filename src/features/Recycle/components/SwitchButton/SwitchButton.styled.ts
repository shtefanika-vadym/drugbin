import styled from 'styled-components'

import { grid } from 'common/style/mixins/grid.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const SwitchButtonContent = styled.div`
  width: 100%;
  background-color: #f0f2f4;
  border-radius: 8px;
  padding: 2px;
  ${grid({ gridTemplateColumns: '1fr 1fr' })};
`

export const Selected = styled.div<{ isActive: boolean }>`
  text-align: center;
  ${textVariant('bodyS')};
  padding: 6px;
  background-color: ${({ isActive }) => isActive && '#ffffff'};
  border-radius: 7px;
  ${({ isActive }) =>
    isActive && 'box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)'};
`
