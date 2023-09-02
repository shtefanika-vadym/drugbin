import type { ChangeEvent, FC, FormEvent, MouseEvent } from 'react'
import { useCallback, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { PrivacyBox } from 'features/Collect/components/PrivacyBox/PrivacyBox'
import { SET_DATA } from 'features/Collect/slices/recycleSlice'

import { isEmail, isStringNotEmpty } from 'common/utils/stringUtils'
import {
  Error,
  FormWrapper,
  InputWrapper,
  PersonalInfromationWrapper,
} from './PersonalInfromation.styled'
import { Input } from 'components/ui/Input/Input'
import { Button } from 'components/ui/Button/Button'

interface IProps {
  setActiveStep: (step: any) => void
}

export const PersonalInfromation: FC<IProps> = ({ setActiveStep }) => {
  const dispatch = useAppDispatch()
  const { collectData } = useAppSelector((state) => state.recycleReducer)
  const { firstName, lastName, email } = collectData

  const [errors, setErrors] = useState<{ firstName: string; lastName: string; email: string }>({
    firstName: '',
    lastName: '',
    email: '',
  })

  const handleChange = (props: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = props.target
    dispatch(SET_DATA({ name: name, value: value }))
  }

  const handleSubmit = useCallback(
    (event: FormEvent | MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
      event?.preventDefault()
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstName: firstName === '' ? 'Please fill in your first name' : '',
        lastName: lastName === '' ? 'Please fill in your last name' : '',
        email: email === null || email === '' ? '' : isEmail(email) ? '' : 'Email is not valid.',
      }))

      const isFirstNameValid = isStringNotEmpty(firstName)
      const isLastNameValid = isStringNotEmpty(lastName)
      const isEmailValide = email === null || email === '' ? true : isEmail(email) ? true : false

      if (isFirstNameValid && isLastNameValid && isEmailValide) {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
      }
    },
    [firstName, lastName, email],
  )

  return (
    <PersonalInfromationWrapper>
      <PrivacyBox />
      <FormWrapper>
        <InputWrapper>
          <Input
            name='firstName'
            label='Name *'
            value={firstName}
            onChange={handleChange}
            placeholder='EX: John'
          />
          {errors.firstName && <Error>{errors.firstName}</Error>}
        </InputWrapper>
        <InputWrapper>
          <Input
            name='lastName'
            label='Surname *'
            value={lastName}
            onChange={handleChange}
            placeholder='EX: Doe'
          />
          {errors.lastName && <Error>{errors.lastName}</Error>}
        </InputWrapper>
        <InputWrapper>
          <Input
            type='email'
            name='email'
            label='E-mail address (optional)'
            value={email}
            onChange={handleChange}
            placeholder='EX: Doe'
          />
          {errors.email && <Error>{errors.email}</Error>}
        </InputWrapper>
      </FormWrapper>
      <Button onClick={handleSubmit}>Continue</Button>
    </PersonalInfromationWrapper>
  )
}
