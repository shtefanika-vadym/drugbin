import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { FormikHelpers } from 'formik'
import { Formik } from 'formik'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { AutocompleteInput } from 'common/components/AutocompleteInput/AutocompleteInput'
import { Button } from 'common/components/Button/Button'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'
import { RadioButton } from 'common/components/RadioButton/RadioButton'

import { ADD_NEW_LABEL, ADD_NEW_PLACEHOLDER } from 'features/AddNew/constants/constatns'
import { DROPDOWN_VALUES, RADIO_BUTTON_VALUE } from 'features/AddNew/constants/mockData'
import { useCreateProductMutation } from 'features/AddNew/store/api/addApi'
import { validationSchema } from 'features/AddNew/validation/validationSchema'

import {
  ButtonWrapper,
  ContentAddNew,
  Error,
  InputWrapper,
  RadioButtonWrapper,
  RadioLabel,
  Title,
} from './AddNew.styled'
import type { IForm } from './AddNew.type'

export const AddNew = () => {
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
    <HeaderWrapper>
      <Formik
        initialValues={{ type: 'RX', name: '', quantity: 1, pack: 'Pack' }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}>
        {({ values, handleChange, handleSubmit, setFieldValue, errors }) => {
          return (
            <ContentAddNew onSubmit={handleSubmit}>
              <Title>{ADD_NEW_LABEL.TITLE}</Title>
              <RadioButtonWrapper>
                <RadioLabel>{ADD_NEW_LABEL.TYPE}</RadioLabel>
                {RADIO_BUTTON_VALUE.map((element: any) => {
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
                  placeholder={ADD_NEW_PLACEHOLDER.NAME}
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
                placeholder={ADD_NEW_PLACEHOLDER.PACK}
                label={ADD_NEW_LABEL.PACK}
                selectedOptions={values.pack}
                options={DROPDOWN_VALUES}
                callbackOnChange={(value) => {
                  setFieldValue('pack', value)
                }}
              />
              <InputWrapper>
                <Input
                  name='quantity'
                  type='number'
                  label={ADD_NEW_LABEL.QUANTITY}
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
    </HeaderWrapper>
  )
}
