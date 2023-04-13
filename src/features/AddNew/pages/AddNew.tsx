import { useNavigate } from 'react-router-dom'

import type { FormikHelpers } from 'formik'
import { Formik } from 'formik'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import AutocompleteInput from 'common/components/AutoComplete/AutoComplete'
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

  const [addNewProduct] = useCreateProductMutation()

  const handleSubmit = async (values: IForm, { resetForm }: FormikHelpers<IForm>) => {
    await addNewProduct({ ...values, drugId: 1 })
    console.log('values', values)
    resetForm()
  }

  const handleBackButton = () => {
    navigate(-1)
  }

  return (
    <HeaderWrapper>
      <Formik
        initialValues={{ type: 'rx', name: '', quantity: 1, pack: 'pack' }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}>
        {({ values, handleChange, handleSubmit, setFieldValue, errors }) => {
          console.log(errors)
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
                  placeholder={ADD_NEW_PLACEHOLDER.NAME}
                  label={ADD_NEW_LABEL.NAME}
                  onSelect={(value) => {
                    setFieldValue('name', value)
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
