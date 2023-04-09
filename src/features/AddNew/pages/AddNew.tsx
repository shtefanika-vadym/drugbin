import { useNavigate } from 'react-router-dom'

import type { FormikHelpers } from 'formik'
import { Formik } from 'formik'

import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import { Button } from 'common/components/Button/Button'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'
import { RadioButton } from 'common/components/RadioButton/RadioButton'

import { ADD_NEW_LABEL, ADD_NEW_PLACEHOLDER } from 'features/AddNew/constants/constatns'
import { DROPDOWN_VALUES, RADIO_BUTTON_VALUE } from 'features/AddNew/constants/mockData'
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
  const handleSubmit = (values: IForm, { resetForm }: FormikHelpers<IForm>) => {
    console.log('value', values)
    resetForm()
  }

  const handleBackButton = () => {
    navigate(-1)
  }

  return (
    <HeaderWrapper>
      <Formik
        initialValues={{ type: 'RX', name: '', brand: '', quantity: 1, pack: 'Pack' }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}>
        {({ values, handleChange, handleSubmit, setFieldValue, errors }) => (
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
              <Input
                name='name'
                placeholder={ADD_NEW_PLACEHOLDER.NAME}
                label={ADD_NEW_LABEL.NAME}
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <Error>{errors.name}</Error>}
            </InputWrapper>
            <InputWrapper>
              <Input
                name='brand'
                placeholder={ADD_NEW_PLACEHOLDER.BRAND}
                label={ADD_NEW_LABEL.BRAND}
                value={values.brand}
                onChange={handleChange}
              />
              {errors.brand && <Error>{errors.brand}</Error>}
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
                type='number'
                label={ADD_NEW_LABEL.QUANTITY}
                value={values.quantity}
                onChange={handleChange}
              />
              {errors.brand && <Error>{errors.quantity}</Error>}
            </InputWrapper>
            <ButtonWrapper>
              <Button>Save&Recycle</Button>
              <Button variant='secondary' onClick={handleBackButton}>
                Cancel
              </Button>
            </ButtonWrapper>
          </ContentAddNew>
        )}
      </Formik>
    </HeaderWrapper>
  )
}
