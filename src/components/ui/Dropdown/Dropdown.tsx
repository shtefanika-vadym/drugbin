import arrowDonwIcon from 'common/assets/arrow-down.svg'
import arrowUpIcon from 'common/assets/arrow-up.svg'
import useToggle from 'common/hooks/useToggle'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import {
  Container,
  DropdownList,
  DropdownWrapper,
  Icon,
  Label,
  Option,
  Select,
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
  }, [showDropdown, toggleShowDropdown])

  const handleChange = useCallback((option: string) => {
    callbackOnChange(option)
    toggleShowDropdown(false)
  }, [callbackOnChange, toggleShowDropdown])

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
