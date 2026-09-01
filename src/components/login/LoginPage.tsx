import loginImage from 'common/assets/images/login.png'
import { useAuth } from 'common/hooks/auth'
import { Button } from 'components/ui/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ButtonWrapper, Container, FormWrapper, LeftSide, RightSide, Title } from './LoginPage.styled'
import { loginSchema } from 'schema/login.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import { ValidationMessage } from 'components/ui/ValidationMessage'
import { LabeledInput } from 'components/ui/LabeledInput'
import { Text } from 'components/ui/Text/Text'
import { WDS_COLOR_RED } from 'common/styles/colors'

type AuthForm = {
  email: string
  password: string
}

export const LoginPage = () => {
  const { signIn, signInState } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<AuthForm> = ({ email, password }) => {
    signIn(email, password)
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <LeftSide>
        <FormWrapper>
          <Title>Autentificare</Title>
          <LabeledInput
            {...register('email')}
            label='Adresa de email'
            placeholder='Ex: spital@exemplu.ro'
            required
          />
          <ErrorMessage
            errors={errors}
            name='email'
            render={({ message }) => <ValidationMessage>{message}</ValidationMessage>}
          />
          <LabeledInput
            {...register('password')}
            type='password'
            label='Parolă'
            placeholder='Parola primită de la administrator'
            required
          />
          <ErrorMessage
            errors={errors}
            name='password'
            render={({ message }) => <ValidationMessage>{message}</ValidationMessage>}
          />
          <ButtonWrapper>
            <Button type='submit' variant='primaryFull' disabled={signInState.isLoading}>
              Autentificare
            </Button>
            {signInState.hasError && (
              <Text variant='bodyS' color={WDS_COLOR_RED}>
                Autentificare eșuată. Verifică datele sau contactează administratorul.
              </Text>
            )}
          </ButtonWrapper>
        </FormWrapper>
      </LeftSide>
      <RightSide src={loginImage} alt='login' />
    </Container>
  )
}
