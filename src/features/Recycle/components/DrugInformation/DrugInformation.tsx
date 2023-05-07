import type { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { AutocompleteInput } from 'common/components/AutocompleteInput/AutocompleteInput'
import { Button } from 'common/components/Button/Button'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'

import { DROPDOWN_VALUES } from 'features/AddNew/constants/mockData'
import { SET_DATA_DRUG, SET_DRUGS_SIZE, SET_NEW_DRUG } from 'features/Recycle/slices/recycleSlice'

import {
  DrugInformationWrapper,
  FormWrapper,
  InputWrapper,
  MultiFormWrapper,
} from './DrugInformation.styled'

export const DrugInformation = () => {
  const dispatch = useAppDispatch()
  const { collectData, drugsSize } = useAppSelector((state) => state.recycleReducer)

  console.log('collectData', collectData)

  const handleChangeDropdown = (value: string, key: number) => {
    const name = 'pack'
    dispatch(SET_DATA_DRUG({ name, value, key }))
  }

  const handleChange = (values: ChangeEvent<HTMLInputElement>, key: number) => {
    const { name, value } = values.target
    dispatch(SET_DATA_DRUG({ name, value, key }))
  }

  const handleOnSelect = (value: any, key: number) => {
    const name = 'drugName'
    dispatch(SET_DATA_DRUG({ name, value, key }))
  }

  const handleAddNewDrugForm = () => {
    const lastDrug = collectData.drugList[drugsSize - 1]

    if (lastDrug.name && lastDrug.quantity > 0) {
      dispatch(SET_DRUGS_SIZE(drugsSize + 1))
      dispatch(SET_NEW_DRUG())
    }
  }

  return (
    <DrugInformationWrapper>
      <MultiFormWrapper>
        {Array.from({ length: drugsSize }, (_, i) => (
          <FormWrapper key={i}>
            <InputWrapper>
              <AutocompleteInput
                name='name'
                value={collectData?.drugList[i]?.drugName}
                placeholder='EX: Ibuprofen'
                label='Name *'
                onSelect={(e) => handleOnSelect(e, i)}
              />
            </InputWrapper>
            <Dropdown
              name='pack'
              placeholder='Pack'
              label='Package type *'
              selectedOptions={collectData?.drugList[i]?.pack}
              options={DROPDOWN_VALUES}
              callbackOnChange={(e) => handleChangeDropdown(e, i)}
            />
            <InputWrapper>
              <Input
                name='quantity'
                type='number'
                label='Quantity *'
                value={collectData?.drugList[i]?.quantity}
                onChange={(e) => handleChange(e, i)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='expirationDate'
                label='Expiration date'
                value={collectData?.drugList[i]?.expirationDate}
                onChange={(e) => handleChange(e, i)}
                placeholder='EX: 16/12/2020'
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='lot'
                label='LOT number'
                value={collectData?.drugList[i]?.lot}
                onChange={(e) => handleChange(e, i)}
                placeholder='EX: M9080158'
              />
            </InputWrapper>
          </FormWrapper>
        ))}
      </MultiFormWrapper>
      <Button variant='secondary' onClick={handleAddNewDrugForm}>
        Add new drug
      </Button>
    </DrugInformationWrapper>
  )
}
