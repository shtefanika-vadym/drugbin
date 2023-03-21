import type { FC } from 'react'
import { useEffect } from 'react'

import { ErrorMessage, Field, useField } from 'formik'

import { Select } from 'common/components/Select/Select'
import { FORM_CONTROL_TYPE } from 'common/constants/formControlConstants'
import type { ISelect } from 'common/interfaces/ISelect'

import styles from './formSelect.module.scss'

export const FormSelect: FC<ISelect> = ({ name, mode, value, label, listOptions, ...rest }) => {
  const [field, _, helpers] = useField(name)
  useEffect(() => {
    if (value && value !== field.value) helpers.setValue(value)
  }, [value])

  return (
    <div className={styles.parent}>
      <Field
        mode={mode}
        id={name}
        name={name}
        showSearch
        label={label}
        component={Select}
        listOptions={listOptions}
        as={FORM_CONTROL_TYPE.SELECT}
        value={field.value || null}
        onChange={(values: number[] | number) => helpers.setValue(values)}
        {...rest}
      />
      <ErrorMessage component='p' className={styles.parentErrorInform} name={name} />
    </div>
  )
}
