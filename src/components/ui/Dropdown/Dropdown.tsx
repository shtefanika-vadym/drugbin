import type { FC } from 'react'
import { useRef, useCallback } from 'react'

import arrowDonwIcon from 'common/assets/arrow-down.svg'
import arrowUpIcon from 'common/assets/arrow-up.svg'

import useOnClickOutside from 'common/hooks/useOnClickOutside'
import useToggle from 'common/hooks/useToggle'

import {
  Container,
  DropdownWrapper,
  Label,
  DropdownList,
  Option,
  Select,
  Icon,
} from './Dropdown.styled'
import type { DropdownProps } from './Dropdown.types'

export const Dropdown: FC<DropdownProps> = ({
  placeholder,
  label,
  selectedOptions,
  callbackOnChange,
  options,
}) => {
  const [showDropdown, toggleShowDropdown] = useToggle(false)

  const handleClose = useCallback(() => {
    if (showDropdown) toggleShowDropdown(false)
  }, [showDropdown])

  const handleChange = useCallback((option: string) => {
    callbackOnChange(option)
    toggleShowDropdown(false)
  }, [])

  const containerRef = useRef(null)
  useOnClickOutside(containerRef, handleClose)

  return (
    <Container ref={containerRef}>
      <Label>{label}</Label>
      <DropdownWrapper onClick={() => toggleShowDropdown(!showDropdown)}>
        {selectedOptions ? selectedOptions : placeholder}
        {showDropdown ? <Icon src={arrowUpIcon} /> : <Icon src={arrowDonwIcon} />}
      </DropdownWrapper>
      {showDropdown && (
        <DropdownList>
          <Select>
            {options.map((option: string) => (
              <Option
                key={option}
                onClick={() => handleChange(option)}
                isActive={selectedOptions === option}>
                {option}
              </Option>
            ))}
          </Select>
        </DropdownList>
      )}
    </Container>
  )
}
