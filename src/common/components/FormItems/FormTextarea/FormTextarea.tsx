import type { FC } from 'react'

import { ErrorMessage, Field, useField } from 'formik'

import { Textarea } from 'common/components/Textarea/Textarea'
import { FORM_CONTROL_TYPE } from 'common/constants/formControlConstants'
import type { ITextarea } from 'common/interfaces/ITextarea'

import styles from './formTextarea.module.scss'

export const FormTextarea: FC<ITextarea> = ({ name, ...rest }) => {
  const [field, _, helpers] = useField(name)
  return (
    <div className={styles.parent}>
      <Field
        id={name}
        {...rest}
        {...field}
        component={Textarea}
        as={FORM_CONTROL_TYPE.TEXTAREA}
        onBlur={() => helpers.setValue(field.value.trim().replace(/\s\s+/g, ' '))}
      />
      <ErrorMessage component='p' className={styles.parentErrorInform} name={name} />
    </div>
  )
}
