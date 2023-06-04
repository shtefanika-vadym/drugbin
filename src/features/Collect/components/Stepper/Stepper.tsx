import type { FC, ReactNode } from 'react'

import { MultiStep } from 'common/components/MultiStep/MultiStep'

import { Description, StepperHeader, StepperWrapper, Tag, Title } from './Stepper.styled'

interface IStepper {
  title: string
  description?: string
  tag: string
  children: ReactNode
  activeStep: number
}

export const Stepper: FC<IStepper> = ({ title, description, tag, children, activeStep }) => {
  return (
    <StepperWrapper>
      <StepperHeader>
        <MultiStep activeStep={activeStep} />
        <Title>{title}</Title>
        <Description>{description}</Description>
      </StepperHeader>
      <Tag>{tag}</Tag>
      <div>{children}</div>
    </StepperWrapper>
  )
}
