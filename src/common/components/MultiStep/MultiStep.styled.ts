import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'

export const Dot = styled.div<{ isActive: boolean }>`
  height: 12px;
  width: 12px;
  background-color: ${({ isActive }) => (isActive ? '#2949a6' : 'white')};
  border: ${({ isActive }) => (isActive ? 'unset' : '1px solid #a3a6ad;')};
  border-radius: 50%;
`

export const Line = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 1px;
  border: ${({ isActive }) => (isActive ? '1px solid #2949a6' : '1px solid #a3a6ad')};
  transition: width 0.3s ease-in-out;
`

export const StepperWrapper = styled.div`
  ${flex({ gap: '8px', alignItems: 'center' })};
`
