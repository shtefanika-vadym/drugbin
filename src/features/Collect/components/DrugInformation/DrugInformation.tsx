import type { ChangeEvent, FC } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { AutocompleteInput } from 'common/components/AutocompleteInput/AutocompleteInput'
import { Button } from 'common/components/Button/Button'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'

import { DROPDOWN_VALUES } from 'features/AddNew/constants/mockData'
import { Camera } from 'features/Collect/components/Camera/Camera'
import { SwitchButton } from 'features/Collect/components/SwitchButton/SwitchButton'
import { SET_DATA_DRUG, SET_DRUGS_SIZE, SET_NEW_DRUG } from 'features/Collect/slices/recycleSlice'

import {
  AddNewWrapper,
  ButtonWrapper,
  DrugInformationWrapper,
  Error,
  FormWrapper,
  InputWrapper,
  MultiFormWrapper,
} from './DrugInformation.styled'

interface IProps {
  setActiveStep: (step: any) => void
}

export const DrugInformation: FC<IProps> = ({ setActiveStep }) => {
  const dispatch = useAppDispatch()
  const { collectData, drugsSize } = useAppSelector((state) => state.recycleReducer)
  const [error, setError] = useState<string>('')

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

    if (lastDrug.drugName.name && lastDrug.quantity > 0) {
      dispatch(SET_DRUGS_SIZE(drugsSize + 1))
      dispatch(SET_NEW_DRUG())
    }
    lastDrug.drugName.name ? setError('') : setError('Please fill the last drug name')
  }

  const handleGoBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
  }

  const handleSubmit = useCallback(() => {
    const lastDrug = collectData.drugList[drugsSize - 1]
    if (lastDrug.drugName.name !== '' && lastDrug.quantity > 0) {
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
    } else {
      setError('Please fill the last drug name')
    }
  }, [collectData.drugList])

  return (
    <DrugInformationWrapper>
      <SwitchButton />
      <MultiFormWrapper>
        <Camera />
        {Array.from({ length: drugsSize }, (_, i) => (
          <FormWrapper key={i}>
            <InputWrapper>
              <AutocompleteInput
                name='name'
                value={collectData?.drugList[i]?.drugName}
                placeholder='EX: Ibuprofen'
                label='Drug name *'
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
            {/* <InputWrapper>
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
            </InputWrapper> */}
          </FormWrapper>
        ))}
      </MultiFormWrapper>
      <AddNewWrapper>
        <Button variant='secondary' onClick={handleAddNewDrugForm}>
          Add new drug
        </Button>
        {error && <Error>{error}</Error>}
      </AddNewWrapper>
      <ButtonWrapper>
        <Button variant='empty' onClick={handleGoBack}>
          Go back
        </Button>
        <Button onClick={handleSubmit}>Continue</Button>
      </ButtonWrapper>
    </DrugInformationWrapper>
  )
}
