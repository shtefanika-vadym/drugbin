import type { FC } from 'react'
import { ButtoWrapper, Text, TextBold, VerbalTitle, VerbalWrapper } from './VerbalProcess.styled'
import { Button } from 'components/ui/Button/Button'

interface IProps {
  setActiveStep: (step: any) => void
}

export const VerbalProcess: FC<IProps> = ({ setActiveStep }) => {
  const handleAgree = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
  }
  const handleCancel = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
  }
  return (
    <VerbalWrapper>
      <VerbalTitle>Verbal Process</VerbalTitle>
      <Text>
        Your privacy is important to us. It is DrugBin's policy to respect your privacy regarding
        any information we may collect from you across our website, and other sites we own and
        operate.
      </Text>
      <Text>
        We only ask for personal information when we truly need it to provide a service to you. We
        collect it by fair and lawful means, with your knowledge and consent. We also let you know
        why we’re collecting it and how it will be used.
      </Text>
      <Text>
        We only retain collected information for as long as necessary to provide you with your
        requested service. What data we store, we’ll protect within commercially acceptable means to
        prevent loss and theft, as well as unauthorized access, disclosure, copying, use or
        modification.
      </Text>
      <Text>
        We don’t share any personally identifying information publicly or with third-parties, except
        when required to by law.
      </Text>
      <TextBold>In order to finish this process, you have to agree with this.</TextBold>
      <ButtoWrapper>
        <Button variant='secondary' onClick={handleCancel}>
          No, cancel
        </Button>
        <Button onClick={handleAgree}>Yes, I agree</Button>
      </ButtoWrapper>
    </VerbalWrapper>
  )
}
