import * as yup from 'yup'

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Formatul emailului este invalid')
      .required('Emailul este obligatoriu'),
    password: yup
      .string()
      .min(4, 'Parola trebuie să aibă cel puțin 8 caractere')
      // .min(8, 'Parola trebuie să aibă cel puțin 8 caractere')
      .required('Parola este obligatorie'),
  })
  .required()

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .min(2, 'Numele complet trebuie să aibă cel puțin 2 caractere')
      .required('Numele complet este obligatoriu'),
    email: yup
      .string()
      .email('Formatul emailului este invalid')
      .required('Emailul este obligatoriu'),
    password: yup
      .string()
      .min(8, 'Parola trebuie să aibă cel puțin 8 caractere')
      .required('Parola este obligatorie'),
  })
  .required()
