import type { InputHTMLAttributes } from 'react'
import React, { useCallback, useState } from 'react'

import eyeDisableIcom from 'common/assets/icons/eye-disable.svg'
import eyeIcon from 'common/assets/icons/eye.svg'
import minusIcon from 'common/assets/icons/minus.svg'
import plusIcon from 'common/assets/icons/plus-add.svg'

import {
  Container,
  ContainerWrapper,
  CustomButton,
  Icon,
  IconButton,
  ShowPasswordButton,
  StyledInput,
  StyledLabel,
} from './Input.styled'

export interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  valid?: boolean
}

const useToggle = (initialState: boolean = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState)
  const toggle = useCallback((): void => setState((state) => !state), [])
  return [state, toggle]
}

export const Input = React.forwardRef<HTMLInputElement, LabeledInputProps>((props, ref) => {
  const { valid = true, label = '', type = 'text', disabled = false, placeholder, ...rest } = props
  const [showPassword, toggleShowPassword] = useToggle(false)

  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <ContainerWrapper>
        <Container valid={valid}>
          <StyledInput
            valid={valid}
            ref={ref}
            type={showPassword ? 'text' : type}
            placeholder={placeholder || label}
            disabled={disabled}
            {...rest}
          />
          {type === 'password' && (
            <ShowPasswordButton onClick={toggleShowPassword}>
              {showPassword ? <Icon src={eyeIcon} /> : <Icon src={eyeDisableIcom} />}
            </ShowPasswordButton>
          )}
        </Container>
        {type === 'number' && (
          <CustomButton>
            <IconButton>
              <Icon src={minusIcon} />
            </IconButton>
            <IconButton>
              <Icon src={plusIcon} />
            </IconButton>
          </CustomButton>
        )}
      </ContainerWrapper>
    </>
  )
})
