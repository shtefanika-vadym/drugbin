import { useState } from 'react'

import { Formik } from 'formik'

import { Button } from 'common/components/Button/Button'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'

import { DROPDOWN_VALUES } from 'features/AddNew/constants/mockData'
import { validationSchemaStep } from 'features/AddNew/validation/validationSchema'

import {
  DrugInformationWrapper,
  Error,
  FormWrapper,
  InputWrapper,
  MultiFormWrapper,
} from './DrugInformation.styled'

export const DrugInformation = () => {
  const [numForms, setNumForms] = useState(1)
  const handleAddForm = () => {
    setNumForms(numForms + 1)
  }

  const handleSubmit = () => {}

  return (
    <DrugInformationWrapper>
      <MultiFormWrapper>
        {Array.from({ length: numForms }, (_, i) => (
          <Formik
            key={i}
            initialValues={{ name: '', pack: 'pack', quantity: 1, lot: '', date: '' }}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={validationSchemaStep}>
            {({ values, handleChange, errors, setFieldValue }) => {
              return (
                <FormWrapper>
                  <InputWrapper>
                    <Input
                      name='name'
                      label='Name *'
                      value={values.name}
                      onChange={handleChange}
                      placeholder='EX: John'
                    />
                    {errors.name && <Error>{errors.name}</Error>}
                  </InputWrapper>
                  <Dropdown
                    name='pack'
                    placeholder='Pack'
                    label='Package type *'
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
                      label='Quantity *'
                      value={values.quantity}
                      onChange={handleChange}
                    />
                    {errors.quantity && <Error>{errors.quantity}</Error>}
                  </InputWrapper>
                  <InputWrapper>
                    <Input
                      name='date'
                      label='Expiration date'
                      value={values.date}
                      onChange={handleChange}
                      placeholder='EX: 16/12/2020'
                    />
                    {errors.date && <Error>{errors.date}</Error>}
                  </InputWrapper>
                  <InputWrapper>
                    <Input
                      name='lot'
                      label='LOT number'
                      value={values.lot}
                      onChange={handleChange}
                      placeholder='EX: M9080158'
                    />
                    {errors.lot && <Error>{errors.lot}</Error>}
                  </InputWrapper>
                </FormWrapper>
              )
            }}
          </Formik>
        ))}
      </MultiFormWrapper>
      <Button variant='secondary' onClick={handleAddForm}>
        Add new drug
      </Button>
    </DrugInformationWrapper>
  )
}
