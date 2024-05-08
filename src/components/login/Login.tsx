import loginImage from 'common/assets/images/login.png'
import { useAuth } from 'common/hooks/auth'
import { WDS_COLOR_RED } from 'common/style/colors'
import { AuthProps } from 'common/types/auth'
import { Button } from 'components/ui/Button/Button'
import { Input } from 'components/ui/Input/Input'
import { Text } from 'components/ui/Text/Text'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ButtonWrapper, Container, InputWrapper, LeftSide, RightSide, Title } from './Login.styled'

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>()

  const { signIn } = useAuth()

  const onSubmit: SubmitHandler<AuthProps> = useCallback(
    (data: AuthProps) => {
      const { email, password } = data
      signIn({ email, password })
    },
    [signIn],
  )

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <LeftSide>
        <Title>Autentificare</Title>
        <InputWrapper>
          <Input
            name='email'
            label='Adresă de e-mail'
            placeholder='Introduceți adresa de e-mail'
            {...register('email', {
              required: 'Adresa de email este necesară.',
              pattern: {
                value: emailPattern,
                message: 'Adresa de email introdusă nu este validă.',
              },
            })}
          />
          {errors.email && (
            <Text variant='bodyXS' color={WDS_COLOR_RED}>
              {errors.email.message}
            </Text>
          )}
        </InputWrapper>
        <InputWrapper>
          <Input
            type='password'
            name='password'
            label='Parolă'
            placeholder='Introduceți parola'
            {...register('password', {
              required: 'Parola este necesară.',
            })}
          />
          {errors.password && (
            <Text variant='bodyXS' color={WDS_COLOR_RED}>
              {errors.password.message}
            </Text>
          )}
        </InputWrapper>
        <ButtonWrapper>
          <Button type='submit' variant='primaryFull'>
            Login
          </Button>
        </ButtonWrapper>
      </LeftSide>
      <RightSide src={loginImage} alt='login' />
    </Container>
  )
}
