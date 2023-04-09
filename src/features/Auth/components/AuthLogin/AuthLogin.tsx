import { Formik } from 'formik'

import loginImg from 'common/assets/images/login.png'

import { Button } from 'common/components/Button/Button'
import { Input } from 'common/components/Input/Input'

import { AUTH_LOGIN_SCHEMA } from 'features/Auth/schemas/authLoginSchema'

import {
  ContentLogin,
  RightSide,
  LeftSide,
  InputWrapper,
  Error,
  Forgot,
  Title,
  ButtonWrapper,
  NewAccount,
  Span,
} from './AuthLogin.styled'

const AuthLogin = () => {
  const handleSubmit = (values: any) => {
    console.log('value', values)
  }
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={AUTH_LOGIN_SCHEMA}>
      {({ handleChange, handleSubmit, errors }) => (
        <ContentLogin onSubmit={handleSubmit}>
          <LeftSide>
            <Title>Login</Title>
            <InputWrapper>
              <Input
                name='email'
                label='E-mail address'
                placeholder='EX: Johndoe@gmial.com'
                onChange={handleChange}
              />
              {errors.email && <Error>{errors.email}</Error>}
            </InputWrapper>
            <InputWrapper>
              <Input
                type='password'
                name='password'
                label='Password'
                placeholder='Password'
                onChange={handleChange}
              />
              {errors.password && <Error>{errors.password}</Error>}
              <Forgot>Forgot your password?</Forgot>
            </InputWrapper>

            <ButtonWrapper>
              <Button type='submit' variant='primaryFull'>
                Login
              </Button>
              <NewAccount>
                Don't have an account?<Span> Sign Up</Span>
              </NewAccount>
            </ButtonWrapper>
          </LeftSide>
          <RightSide src={loginImg} />
        </ContentLogin>
      )}
    </Formik>
  )
}

export default AuthLogin
