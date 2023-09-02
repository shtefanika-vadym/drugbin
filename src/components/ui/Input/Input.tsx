import React from 'react'

import eyeDisableIcom from 'common/assets/eye-disable.svg'
import eyeIcon from 'common/assets/eye.svg'
// import minusIcon from 'common/assets/minus.svg'
// import plusIcon from 'common/assets/plus-add.svg'
import searchIcon from 'common/assets/search.svg'

// import { Button } from 'common/components/Button/Button'
import useToggle from 'common/hooks/useToggle'

import {
  Container,
  ContainerWrapper,
  Icon,
  ShowPasswordButton,
  StyledInput,
  StyledLabel,
} from './Input.styled'
import type { LabeledInputProps } from './Input.type'

// TODO --> REFACTORING
export const Input = React.forwardRef<HTMLInputElement, LabeledInputProps>((props, ref) => {
  const { valid = true, label = '', type = 'text', disabled = false, placeholder, ...rest } = props
  const [showPassword, toggleShowPassword] = useToggle(false)

  return (
    <div>
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
          {type === 'search' && <Icon src={searchIcon} />}
        </Container>
        {/* {type === 'number' && (
          <CustomButton>
            <Button variant='empty' size='S-square'>
              <Icon src={minusIcon} />
            </Button>
            <Button variant='empty' size='S-square'>
              <Icon src={plusIcon} />
            </Button>
          </CustomButton>
        )} */}
      </ContainerWrapper>
    </div>
  )
})
