import type { FormikHelpers } from 'formik'
import { Formik } from 'formik'

import { Button } from 'common/components/Button/Button'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { Input } from 'common/components/Input/Input'
import Modal from 'common/components/Modal/Modal'
import { RadioButton } from 'common/components/RadioButton/RadioButton'

import { ADD_NEW_LABEL, ADD_NEW_PLACEHOLDER } from 'features/AddNew/constants/constatns'
import { DROPDOWN_VALUES, RADIO_BUTTON_VALUE } from 'features/AddNew/constants/mockData'
import { useCreateDrugMutation } from 'features/AddNew/store/api/addApi'

import {
  ButtonWrapper,
  ContentAdd,
  ContentGrid,
  LabelRadio,
  RadioPosition,
  Title,
} from './AddModal.styled'

export const AddModal = () => {
  const handleClose = () => {}
  const [addNewDrug] = useCreateDrugMutation()
  const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    const test = {
      name: 'Hidrocortizone pulbere',
      package: 'Pack',
      package_total: 1,
      strength: 0,
      weight: 12,
      type: 'RX',
      barcode: '6220132311528',
    }
    await addNewDrug(test)
    resetForm()
  }
  return (
    <Modal callbackOnClose={handleClose}>
      <Formik
        initialValues={{
          type: 'RX',
          name: '',
          quantity: 1,
          pack: 'Pack',
          weight: 0,
          barcode: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <ContentAdd onSubmit={handleSubmit}>
            <Title>Add new drug</Title>
            <LabelRadio>Type</LabelRadio>
            <RadioPosition>
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
            </RadioPosition>
            <ContentGrid>
              <Input
                name='name'
                placeholder='Name'
                label='Name'
                value={values.name}
                onChange={handleChange}
              />
              <Input
                type='number'
                placeholder='Number of drug'
                label='Number of drug'
                onChange={handleChange}
              />
              <Input
                type='number'
                placeholder='Weight of drug'
                label='Weight'
                onChange={handleChange}
              />
              <Input type='number' placeholder='Barcode' label='Barcode' onChange={handleChange} />
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
            </ContentGrid>
            <ButtonWrapper>
              <Button type='submit'>Add New</Button>
              <Button variant='secondary'>Back</Button>
            </ButtonWrapper>
          </ContentAdd>
        )}
      </Formik>
    </Modal>
  )
}
