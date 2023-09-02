import * as Yup from 'yup'

import { RegexService } from 'common/services/regexService'

export const AUTH_LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your email.')
    .matches(RegexService.email(), 'Please enter valid email.'),
  password: Yup.string()
    .required('Please enter your password.')
    .min(3, 'Please enter valid password.'),
})
