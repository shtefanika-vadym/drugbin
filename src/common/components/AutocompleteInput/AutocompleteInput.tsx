import type { FC } from 'react'
import { useMemo, useState } from 'react'
import Select from 'react-select'

import { useDebounce } from 'usehooks-ts'

import { useDrugQuery } from 'features/AddNew/store/api/addApi'

import { Content, Label, customStyles } from './AutoComplete.styled'

interface AutocompleteInputProps {
  name: string
  type: string
  placeholder: string
  label?: string
  onSelect?: (selectedOption: any) => void
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({
  name,
  placeholder,
  type,
  label,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState<string>('')

  const debouncedValue = useDebounce(inputValue, 300)

  const handleInputChange = (props: string) => {
    setInputValue(props)
  }

  const { data } = useDrugQuery({ type: type.toLowerCase(), query: debouncedValue.toLowerCase() })

  const options = useMemo(
    () =>
      data?.map((element: any) => {
        return {
          label: `${element.name} (${element.barcode})`,
          value: `${element.name} (${element.barcode})`,
          name: element.name,
          id: element.id,
          barcode: element.barcode,
        }
      }),
    [data],
  )

  const getOptionLabel = (option: any) => {
    return option.name
  }

  const handleOnChange = (props: any) => {
    onSelect(props)
  }

  return (
    <Content>
      <Label>{label}</Label>
      <Select
        name={name}
        placeholder={placeholder}
        styles={customStyles}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleOnChange}
        getOptionLabel={getOptionLabel}
      />
    </Content>
  )
}
