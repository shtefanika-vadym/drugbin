import type { FC } from 'react'

import { Switch } from 'antd'
import { ErrorMessage, Field, useField } from 'formik'

import { FORM_CONTROL_TYPE } from 'common/constants/formControlConstants'

import styles from './formSwitch.module.scss'

interface IProps {
  name: string
  label?: string | JSX.Element
}

export const FormSwitch: FC<IProps> = ({ name, label, ...rest }) => {
  const [field, _, helpers] = useField(name)
  return (
    <div className={styles.parent}>
      <label htmlFor={name} className={styles.parentLabel}>
        {label}
      </label>
      <Field
        id={name}
        {...rest}
        {...field}
        onChange={(isSelected: boolean) => helpers.setValue(isSelected)}
        component={Switch}
        checked={field.value}
        as={FORM_CONTROL_TYPE.INPUT}
      />
      <ErrorMessage component='p' className={styles.parentErrorInform} name={name} />
    </div>
  )
}
