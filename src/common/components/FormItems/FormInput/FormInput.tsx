import type { ChangeEvent, FC } from 'react'

import { Field, useField } from 'formik'

import { Input } from 'common/components/Input/Input'
import { FORM_CONTROL_TYPE } from 'common/constants/formControlConstants'
import type { IInput } from 'common/interfaces/IInput'

import styles from './formInput.module.scss'

export const FormInput: FC<IInput> = ({ name, onChange, ...rest }) => {
  const [field, meta, helpers] = useField(name)
  return (
    <div className={styles.parent}>
      <Field
        {...rest}
        {...field}
        id={name}
        component={Input}
        as={FORM_CONTROL_TYPE.INPUT}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          helpers.setValue(event.target.value)
          if (onChange) onChange(event)
        }}
        onBlur={() => field.value && helpers.setValue(field.value.trim().replace(/\s\s+/g, ' '))}
      />
      {/*  Todo update error handling */}
      {meta.error && <p className={styles.parentErrorInform}>{meta.error}</p>}
      {/*<ErrorMessage component='p' className={styles.parentErrorInform} name={name} />*/}
    </div>
  )
}
