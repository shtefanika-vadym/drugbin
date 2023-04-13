import React, { useCallback, useMemo, useRef, useState } from 'react'

import { useDebounce } from 'usehooks-ts'

import { Input } from 'common/components/Input/Input'

import { useDrugQuery } from 'features/AddNew/store/api/addApi'

import { Container, DropdownStyle, Option, Select } from './AutoComplete.styled'

interface AutocompleteInputProps {
  name: string
  placeholder: string
  label?: string
  onSelect: (selectedOption: string) => void
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ placeholder, label, onSelect }) => {
  const [value, setValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const containerRef = useRef(null)

  const { data } = useDrugQuery(value)

  const options = useMemo(
    () =>
      data?.map((element: any) => {
        return element.name
      }),
    [data],
  )

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  const debouncedValue = useDebounce(value, 300)

  useMemo(() => {
    if (debouncedValue === '') {
      setFilteredOptions(options || [])
    } else {
      const matchingOption = options?.find((option: any) =>
        option.toLowerCase().startsWith(debouncedValue.toLowerCase()),
      )
      if (matchingOption) {
        const filtered = options?.filter((option: any) =>
          option.toLowerCase().includes(debouncedValue.toLowerCase()),
        )
        setFilteredOptions(filtered)
      } else {
        setFilteredOptions([])
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [debouncedValue, options])

  const handleSelectOption = useCallback((option: string) => {
    setValue(option)
    onSelect(option)
    setFilteredOptions([])
  }, [])

  return (
    <Container ref={containerRef}>
      <Input
        placeholder={placeholder}
        label={label}
        name='name'
        type='text'
        value={value}
        onChange={handleInputChange}
      />
      {filteredOptions.length > 0 && (
        <DropdownStyle>
          <Select>
            {filteredOptions.map((option) => (
              <Option key={option} onClick={() => handleSelectOption(option)}>
                {option}
              </Option>
            ))}
          </Select>
        </DropdownStyle>
      )}
    </Container>
  )
}

export default AutocompleteInput
