import { Formik } from 'formik'

import { Input } from 'common/components/Input/Input'

import { validationSchemaStep } from 'features/AddNew/validation/validationSchema'
import { PrivacyBox } from 'features/Recycle/components/PrivacyBox/PrivacyBox'

import {
  Error,
  FormWrapper,
  InputWrapper,
  PersonalInfromationWrapper,
} from './PersonalInfromation.styled'

export const PersonalInfromation = () => {
  const handleSubmit = () => {}
  return (
    <PersonalInfromationWrapper>
      <PrivacyBox />
      <Formik
        initialValues={{ name: '', surname: '', email: '' }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchemaStep}>
        {({ values, handleChange, errors }) => {
          return (
            <FormWrapper>
              <InputWrapper>
                <Input
                  name='name'
                  label='Name'
                  value={values.name}
                  onChange={handleChange}
                  placeholder='EX: John'
                />
                {errors.name && <Error>{errors.name}</Error>}
              </InputWrapper>
              <InputWrapper>
                <Input
                  name='surname'
                  label='Surname'
                  value={values.surname}
                  onChange={handleChange}
                  placeholder='EX: Doe'
                />
                {errors.surname && <Error>{errors.surname}</Error>}
              </InputWrapper>
              <InputWrapper>
                <Input
                  type='email'
                  name='email'
                  label='E-mail address'
                  value={values.email}
                  onChange={handleChange}
                  placeholder='EX: Doe'
                />
                {errors.email && <Error>{errors.email}</Error>}
              </InputWrapper>
            </FormWrapper>
          )
        }}
      </Formik>
    </PersonalInfromationWrapper>
  )
}
