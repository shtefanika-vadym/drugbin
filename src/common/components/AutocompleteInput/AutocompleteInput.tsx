import type { FC } from 'react'
import { useMemo, useState } from 'react'
import Select from 'react-select'

import { useDebounce } from 'usehooks-ts'

import { useDrugQuery } from 'features/AddNew/store/api/addApi'

import { Content, Label, customStyles } from './AutoComplete.styled'

interface AutocompleteInputProps {
  name: string
  type?: string
  placeholder: string
  label?: string
  value?: {
    name: string
    drugId: number
  }
  onSelect?: (selectedOption: any) => void
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({
  name,
  placeholder,
  label,
  onSelect,
  value,
}) => {
  const [inputValue, setInputValue] = useState<string>('')

  const debouncedValue = useDebounce(inputValue, 300)

  const handleInputChange = (props: string) => {
    setInputValue(props)
  }

  const { data } = useDrugQuery(debouncedValue.toLowerCase())

  const options = useMemo(
    () =>
      data?.map((element: any) => {
        return {
          value: element?.name,
          name: element?.name,
          drugId: element?.id,
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

  const valueObj = {
    value: value?.name,
    name: value?.name,
    drugId: value?.drugId,
  }

  return (
    <Content>
      <Label>{label}</Label>
      <Select
        name={name}
        value={valueObj.name && valueObj}
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
