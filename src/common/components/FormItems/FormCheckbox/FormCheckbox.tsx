import type { FC } from 'react'

import { Checkbox } from 'antd'
import { ErrorMessage, Field, useField } from 'formik'

import { FORM_CONTROL_TYPE } from 'common/constants/formControlConstants'

import styles from './formCheckbox.module.scss'

import 'antd/lib/checkbox/style/css'

interface IProps {
  name: string
  label?: string | JSX.Element
}

export const FormCheckbox: FC<IProps> = ({ name, label, ...rest }) => {
  const [field] = useField(name)
  return (
    <div className={styles.parent}>
      <Field
        id={name}
        {...rest}
        {...field}
        component={Checkbox}
        checked={field.value}
        as={FORM_CONTROL_TYPE.INPUT}
      />
      <label htmlFor={name} className={styles.parentLabel}>
        {label}
      </label>

      <ErrorMessage component='p' className={styles.parentErrorInform} name={name} />
    </div>
  )
}
