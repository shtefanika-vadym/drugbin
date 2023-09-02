import type { FC } from 'react'

import { Dot, Line, StepperWrapper } from './MultiStep.styled'

interface IMultiStep {
  activeStep: number
}

// TODO --> FIND BETTER APPROACH
export const MultiStep: FC<IMultiStep> = ({ activeStep }) => {
  return (
    <StepperWrapper>
      <Dot isActive={true} />
      <Line isActive={activeStep >= 2 && true} />
      <Dot isActive={activeStep >= 2 && true} />
      <Line isActive={activeStep >= 3 && true} />
      <Dot isActive={activeStep >= 3 && true} />
    </StepperWrapper>
  )
}
