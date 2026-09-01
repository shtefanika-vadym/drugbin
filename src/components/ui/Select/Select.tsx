import { attachAsterisk } from 'common/utils/stringUtils'
import { WDS_COLOR_BLACK } from 'common/styles/colors'
import React, { SelectHTMLAttributes } from 'react'
import { Text } from '../Text/Text'
import { Container, StyledSelect } from './Select.styled'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  isError?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label = '', isError = false, required, children, ...rest }, ref) => {
    return (
      <Container>
        {label && (
          <Text variant='bodyS' color={WDS_COLOR_BLACK}>
            {required ? attachAsterisk(label) : label}
          </Text>
        )}
        <StyledSelect ref={ref} isError={isError} required={required} {...rest}>
          {children}
        </StyledSelect>
      </Container>
    )
  },
)

Select.displayName = 'Select'
