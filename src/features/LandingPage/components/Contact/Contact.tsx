import type { FC } from 'react'

import location from 'features/LandingPage/assets/location.svg'
import email from 'features/LandingPage/assets/mail.svg'
import phone from 'features/LandingPage/assets/phone.svg'

import { Button } from 'common/components/Button/Button'
import { Input } from 'common/components/Input/Input'
import { Textarea } from 'common/components/Textarea/Textarea'

import { CONTACT_SECTION } from 'features/LandingPage/constants/constants'

import {
  ContactDetails,
  ContactWrapper,
  Icon,
  LeftSide,
  RightSide,
  SubTitle,
  Title,
} from './Contact.styled'

interface IContact {
  id: string
}

export const Contact: FC<IContact> = ({ id }) => {
  return (
    <ContactWrapper id={id}>
      <LeftSide>
        <Title>{CONTACT_SECTION.TITLE}</Title>
        <ContactDetails>
          <Icon src={email} />
          <SubTitle>{CONTACT_SECTION.EMAIL}</SubTitle>
        </ContactDetails>
        <ContactDetails>
          <Icon src={phone} />
          <SubTitle>{CONTACT_SECTION.PHONE}</SubTitle>
        </ContactDetails>
        <ContactDetails>
          <Icon src={location} />
          <SubTitle>{CONTACT_SECTION.LOCATION}</SubTitle>
        </ContactDetails>
      </LeftSide>
      <RightSide>
        <Input placeholder='EX: John Doe' label='Name' />
        <Input placeholder='EX: johndoe@gmail.com' label='Email' />
        <Textarea label='Message' />
        <div>
          <Button>Send</Button>
        </div>
      </RightSide>
    </ContactWrapper>
  )
}
