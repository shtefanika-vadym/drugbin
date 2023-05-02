import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup.string().required(),
})

export const validationSchemaStep = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
})
