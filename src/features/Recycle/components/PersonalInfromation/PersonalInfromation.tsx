import type { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { Input } from 'common/components/Input/Input'

import { PrivacyBox } from 'features/Recycle/components/PrivacyBox/PrivacyBox'
import { SET_DATA } from 'features/Recycle/slices/recycleSlice'

import { FormWrapper, InputWrapper, PersonalInfromationWrapper } from './PersonalInfromation.styled'

export const PersonalInfromation = () => {
  const dispatch = useAppDispatch()
  const { collectData } = useAppSelector((state) => state.recycleReducer)

  const handleChange = (props: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = props.target
    dispatch(SET_DATA({ name: name, value: value }))
  }

  return (
    <PersonalInfromationWrapper>
      <PrivacyBox />
      <FormWrapper>
        <InputWrapper>
          <Input
            name='firstName'
            label='Name'
            value={collectData.firstName}
            onChange={handleChange}
            placeholder='EX: John'
          />
          {/* {errors.name && <Error>{errors.name}</Error>} */}
        </InputWrapper>
        <InputWrapper>
          <Input
            name='lastName'
            label='Surname'
            value={collectData.lastName}
            onChange={handleChange}
            placeholder='EX: Doe'
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type='email'
            name='email'
            label='E-mail address'
            value={collectData.email}
            onChange={handleChange}
            placeholder='EX: Doe'
          />
        </InputWrapper>
      </FormWrapper>
    </PersonalInfromationWrapper>
  )
}
