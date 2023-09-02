import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const NavigateListWrapper = styled.div`
  ${flex({ gap: '14px' })}
`

export const Tab = styled.button<{ isActive: boolean }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${textVariant('subheading')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #2949A6' : '2px solid transparent')};
  color: ${({ isActive }) => (isActive ? '#212121' : '#A3A6AD')};
  padding: 3px 12px;
`
