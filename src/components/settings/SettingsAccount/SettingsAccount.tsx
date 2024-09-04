import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/ui/Button/Button'
import { LabeledInput } from 'components/ui/LabeledInput'
import { ValidationMessage } from 'components/ui/ValidationMessage'
import { SubmitHandler, useForm } from 'react-hook-form'
import { editSchema } from 'schema/login.schema'
import { SettingsHeader } from '../SettingsHeader/SettingsHeader'
import { Container } from './SettingsAccount.styled'

type EditAccountForm = {
  name: string
  email: string
  password: string
}

export const SettingsAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAccountForm>({
    resolver: yupResolver(editSchema),
  })

  const onSubmit: SubmitHandler<EditAccountForm> = (data) => {
    console.log('data', data)
  }

  return (
    <div>
      <SettingsHeader title='Contul meu' description='Modifică informațiile tale personale' />
      <Container onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput
          {...register('name')}
          label='Nume'
          placeholder='Ex: Spitalul Judetean Suceava'
          required
        />
        <ErrorMessage
          errors={errors}
          name='name'
          render={({ message }) => <ValidationMessage>{message}</ValidationMessage>}
        />
        <LabeledInput
          {...register('email')}
          label='Adresa de email'
          placeholder='Ex: wade.warren@gmail.com'
          required
        />
        <ErrorMessage
          errors={errors}
          name='email'
          render={({ message }) => <ValidationMessage>{message}</ValidationMessage>}
        />
        <LabeledInput {...register('password')} type='password' label='Parolă veche' required />
        <LabeledInput {...register('password')} type='password' label='Parolă nouă' required />
        <ErrorMessage
          errors={errors}
          name='password'
          render={({ message }) => <ValidationMessage>{message}</ValidationMessage>}
        />
        <Button type='submit' size='XS'>
          Salvează
        </Button>
      </Container>
    </div>
  )
}
