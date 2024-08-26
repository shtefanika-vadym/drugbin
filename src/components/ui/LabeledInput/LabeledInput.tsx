import React, { InputHTMLAttributes } from 'react'
import { useToggle } from 'usehooks-ts'
import { Eye, EyeSlash } from '../Icon'
import { Text } from '../Text/Text'
import {
  Container,
  Input,
  ShowPasswordButton,
  StyledInput,
  StyledLabel,
} from './LabeledInput.styled'
import { attachAsterisk } from 'common/utils/stringUtils'

export interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isError?: boolean
}

export const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>((props, ref) => {
  const {
    className,
    isError = false,
    label = '',
    type = 'text',
    disabled = false,
    placeholder,
    ...rest
  } = props
  const [showPassword, toggleShowPassword] = useToggle(false)

  const parsedLabel = rest.required ? attachAsterisk(label) : label

  return (
    <Container>
      <StyledLabel disabled={disabled}>
        <Text variant='bodyS'>{parsedLabel}</Text>
      </StyledLabel>
      <StyledInput isError={isError}>
        <Input
          ref={ref}
          className={className}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {type === 'password' && (
          <ShowPasswordButton onClick={toggleShowPassword}>
            {showPassword ? <EyeSlash /> : <Eye />}
          </ShowPasswordButton>
        )}
      </StyledInput>
    </Container>
  )
})

LabeledInput.displayName = 'LabeledInput'
