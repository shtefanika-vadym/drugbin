import type { FC, ReactNode } from 'react'

import { useAppSelector } from 'store/hooks'

import {
  Description,
  StepperHeader,
  StepperWrapper,
  Tag,
  Text,
  TextBold,
  Title,
  VerbalTitle,
  VerbalWrapper,
} from './Stepper.styled'

interface IStepper {
  title: string
  description?: string
  tag: string
  children: ReactNode
}

export const Stepper: FC<IStepper> = ({ title, description, tag, children }) => {
  const { isVerbalProcessOpen } = useAppSelector((state) => state.recycleReducer)

  return (
    <StepperWrapper>
      {isVerbalProcessOpen ? (
        <VerbalWrapper>
          <VerbalTitle>Verbal Process</VerbalTitle>
          <Text>
            Your privacy is important to us. It is DrugBin's policy to respect your privacy
            regarding any information we may collect from you across our website, and other sites we
            own and operate.
          </Text>
          <Text>
            We only ask for personal information when we truly need it to provide a service to you.
            We collect it by fair and lawful means, with your knowledge and consent. We also let you
            know why we’re collecting it and how it will be used.
          </Text>
          <Text>
            We only retain collected information for as long as necessary to provide you with your
            requested service. What data we store, we’ll protect within commercially acceptable
            means to prevent loss and theft, as well as unauthorized access, disclosure, copying,
            use or modification.
          </Text>
          <Text>
            We don’t share any personally identifying information publicly or with third-parties,
            except when required to by law.
          </Text>
          <TextBold>In order to finish this process, you have to agree with this.</TextBold>
        </VerbalWrapper>
      ) : (
        <>
          <StepperHeader>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Tag>{tag}</Tag>
          </StepperHeader>
          <div>{children}</div>
        </>
      )}
    </StepperWrapper>
  )
}
