// import { Formik } from 'formik'

// import { Dropdown } from 'common/components/Dropdown/Dropdown'
// import { Input } from 'common/components/Input/Input'
// import { RadioButton } from 'common/components/RadioButton/RadioButton'

// import { ADD_NEW_LABEL, ADD_NEW_PLACEHOLDER } from 'features/AddNew/constants/constatns'
// import { DROPDOWN_VALUES, RADIO_BUTTON_VALUE } from 'features/AddNew/constants/mockData'
import { useCreateDrugMutation } from 'api/addApi'

import {
  ButtonWrapper,
  // ContentAdd,
  // ContentGrid,
  // LabelRadio,
  // RadioPosition,
  // Title,
} from './AddModal.styled'
import Modal from 'components/ui/Modal/Modal'
import { Button } from 'components/ui/Button/Button'

// TODO --> REFACTORING
export const AddModal = () => {
  const handleClose = () => {}
  const [addNewDrug] = useCreateDrugMutation()
  const handleSubmit = async () => {
    const test = {
      name: 'Azitrox 500mg',
      package: 'pack',
      packageTotal: 3,
      strength: 500,
      weight: 1.5,
      type: 'rx',
      barcode: '8594739229914',
    }
    await addNewDrug(test)
  }
  return (
    <Modal callbackOnClose={handleClose}>
      {/* <Formik
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
            </ContentAdd>
            )}
          </Formik> */}
      <ButtonWrapper>
        <Button onClick={handleSubmit}>Add New</Button>
        <Button variant='secondary'>Back</Button>
      </ButtonWrapper>
    </Modal>
  )
}
