import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { FormikHelpers } from 'formik'
import { Formik } from 'formik'

import { RadioButton } from 'components/ui/RadioButton/RadioButton'

import { DROPDOWN_VALUES, RADIO_BUTTON_VALUE } from 'components/drugEntry/mockData'
import { useCreateProductMutation } from 'api/addApi'
import { validationSchema } from 'schema/validationSchema'

import {
  ButtonWrapper,
  ContentAddNew,
  Error,
  InputWrapper,
  RadioButtonWrapper,
  RadioLabel,
  Title,
} from './DrugEntry.styled'
import type { IForm } from './DrugEntry.type'
import { AutocompleteInput } from 'components/ui/AutocompleteInput/AutocompleteInput'
import { Dropdown } from 'components/ui/Dropdown/Dropdown'
import { Input } from 'components/ui/Input/Input'
import { Button } from 'components/ui/Button/Button'

export const DrugEntry = () => {
  const navigate = useNavigate()

  const [drugId, setDrugId] = useState<number>()

  const [addNewProduct] = useCreateProductMutation()

  const handleSubmit = async (values: IForm, { resetForm }: FormikHelpers<IForm>) => {
    const productDetails = {
      name: values.name,
      type: values.type.toLowerCase(),
      quantity: values.quantity,
      pack: values.pack.toLowerCase(),
      drugId: drugId,
    }
    await addNewProduct(productDetails)
    resetForm()
  }

  const handleBackButton = () => {
    navigate(-1)
  }

  return (
    <Formik
      initialValues={{ type: 'RX', name: '', quantity: 1, pack: 'Pack' }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}>
      {({ values, handleChange, handleSubmit, setFieldValue, errors }) => {
        return (
          <ContentAddNew onSubmit={handleSubmit}>
            <Title>Entry new drug</Title>
            <RadioButtonWrapper>
              <RadioLabel>Choose type of drug</RadioLabel>
              {RADIO_BUTTON_VALUE.map((element) => {
                return (
                  <RadioButton
                    name='type'
                    value={element.value}
                    id={element.id}
                    checked={element.value === values.type}
                    onChange={handleChange}>
                    {element.value}
                  </RadioButton>
                )
              })}
            </RadioButtonWrapper>
            <InputWrapper>
              <AutocompleteInput
                name='name'
                type={values.type}
                placeholder='EX: Olanzapine'
                label='Name or ID'
                onSelect={(value) => {
                  setDrugId(value.id)
                  setFieldValue('name', value.name)
                }}
              />
              {errors.name && <Error>{errors.name}</Error>}
            </InputWrapper>
            <Dropdown
              name='pack'
              placeholder='EX: Pack'
              label='Package type'
              selectedOptions={values.pack}
              options={DROPDOWN_VALUES}
              callbackOnChange={(value: any) => {
                setFieldValue('pack', value)
              }}
            />
            <InputWrapper>
              <Input
                name='quantity'
                type='number'
                label='Quantity'
                value={values.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <Error>{errors.quantity}</Error>}
            </InputWrapper>
            <ButtonWrapper>
              <Button>Save&Recycle</Button>
              <Button variant='secondary' onClick={handleBackButton}>
                Cancel
              </Button>
            </ButtonWrapper>
          </ContentAddNew>
        )
      }}
    </Formik>
  )
}
