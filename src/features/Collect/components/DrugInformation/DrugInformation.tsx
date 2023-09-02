import type { ChangeEvent, FC } from 'react'
import { useCallback, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { DROPDOWN_VALUES } from 'components/drugEntry/mockData'
import { Camera } from 'features/Collect/components/Camera/Camera'
import { SwitchButton } from 'features/Collect/components/SwitchButton/SwitchButton'
import {
  DELETE_DRUG_BY_ID,
  SET_DATA_DRUG,
  SET_DRUGS_SIZE,
  SET_NEW_DRUG,
} from 'features/Collect/slices/recycleSlice'

import type { SelectValue } from 'features/Collect/interface/CollectInterface'
import {
  AddNewWrapper,
  ButtonWrapper,
  Delete,
  DrugInformationWrapper,
  Error,
  FormWrapper,
  InputWrapper,
  Label,
  LabelWrapper,
  MultiFormWrapper,
} from './DrugInformation.styled'
import { AutocompleteInput } from 'components/ui/AutocompleteInput/AutocompleteInput'
import { Dropdown } from 'components/ui/Dropdown/Dropdown'
import { Input } from 'components/ui/Input/Input'
import { Button } from 'components/ui/Button/Button'

interface IProps {
  setActiveStep: (step: any) => void
}

export const DrugInformation: FC<IProps> = ({ setActiveStep }) => {
  const dispatch = useAppDispatch()
  const { collectData, drugsSize } = useAppSelector((state) => state.recycleReducer)
  const [error, setError] = useState<string>('')

  const handleChangeDropdown = useCallback((value: string, key: number) => {
    const name = 'pack'
    dispatch(SET_DATA_DRUG({ name, value, key }))
  }, [])

  const handleChange = useCallback((values: ChangeEvent<HTMLInputElement>, key: number) => {
    const { name, value } = values.target
    dispatch(SET_DATA_DRUG({ name, value, key }))
  }, [])

  const handleOnSelect = useCallback((value: SelectValue, key: number) => {
    const name = 'drugName'
    dispatch(SET_DATA_DRUG({ name, value, key }))
  }, [])

  const handleAddNewDrugForm = useCallback(() => {
    const lastDrug = collectData.drugList[drugsSize - 1]

    if (lastDrug.drugName.name && lastDrug.quantity > 0) {
      dispatch(SET_DRUGS_SIZE(drugsSize + 1))
      dispatch(SET_NEW_DRUG())
    }
    lastDrug.drugName.name ? setError('') : setError('Please fill the last drug name')
  }, [collectData])

  const handleGoBack = useCallback(() => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
  }, [])

  const handleSubmit = useCallback(() => {
    const lastDrug = collectData.drugList[drugsSize - 1]
    if (lastDrug.drugName.name !== '' && lastDrug.quantity > 0) {
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
    } else {
      setError('Please fill the last drug name')
    }
  }, [collectData.drugList])

  const handleDeleteDrug = useCallback((id: number) => {
    dispatch(DELETE_DRUG_BY_ID(id))
  }, [])

  return (
    <DrugInformationWrapper>
      <SwitchButton />
      <MultiFormWrapper>
        <Camera />
        {Array.from({ length: drugsSize }, (_, i) => (
          <FormWrapper key={i}>
            <InputWrapper>
              <LabelWrapper>
                <Label>Drug name *</Label>
                {drugsSize > 1 && <Delete onClick={() => handleDeleteDrug(i)}>Delete</Delete>}
              </LabelWrapper>
              <AutocompleteInput
                name='name'
                value={collectData?.drugList[i]?.drugName}
                placeholder='EX: Ibuprofen'
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
