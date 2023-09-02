import * as yup from 'yup'

// TODO --> CHANGE THE NAME ALSO CHECK THE LOCATION OF THIS FILE

export const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email('Invalid email format').required('Email is required'),
  messages: yup.string().required('Message is required'),
})

export const validationSchemaStep = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
})
