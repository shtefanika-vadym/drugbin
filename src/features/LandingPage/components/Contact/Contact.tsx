import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Formik } from 'formik'

import location from 'features/LandingPage/assets/location.svg'
import email from 'features/LandingPage/assets/mail.svg'
import phone from 'features/LandingPage/assets/phone.svg'

import { validationSchema } from 'schema/validationSchema'
import { CONTACT_SECTION } from 'features/LandingPage/constants/constants'
import { useContactMutation } from 'features/LandingPage/store/api/landingApi'

import {
  ContactDetails,
  ContactWrapper,
  Error,
  FormContact,
  Icon,
  InputWrapper,
  LeftSide,
  RightSide,
  SubTitle,
  Title,
} from './Contact.styled'
import { Input } from 'components/ui/Input/Input'
import { Textarea } from 'components/ui/Textarea/Textarea'
import { Button } from 'components/ui/Button/Button'
import Spinner from 'components/ui/Spinner/Spinner'

interface IContact {
  id: string
}

export const Contact: FC<IContact> = ({ id }) => {
  const [contact, { isLoading }] = useContactMutation()
  const { t } = useTranslation()

  const handleSubmit = (values: any, { resetForm }: any) => {
    contact(values)
    resetForm()
  }
  return (
    <ContactWrapper id={id}>
      <LeftSide>
        <Title>{t('landing_page.contact_title')}</Title>
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
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}>
          {({ values, handleChange, handleSubmit, errors }) => {
            return (
              <FormContact onSubmit={handleSubmit}>
                <InputWrapper>
                  <Input
                    name='name'
                    placeholder='EX: John Doe'
                    label='Name'
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && <Error>{errors.name}</Error>}
                </InputWrapper>
                <InputWrapper>
                  <Input
                    name='email'
                    placeholder='EX: johndoe@gmail.com'
                    label='Email'
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && <Error>{errors.email}</Error>}
                </InputWrapper>
                <Textarea
                  name='message'
                  value={values.message}
                  onChange={handleChange}
                  label='Message'
                />
                <div>
                  <Button type='submit'>
                    {isLoading ? <Spinner isLoading={isLoading} /> : t('button.send')}
                  </Button>
                </div>
              </FormContact>
            )
          }}
        </Formik>
      </RightSide>
    </ContactWrapper>
  )
}
