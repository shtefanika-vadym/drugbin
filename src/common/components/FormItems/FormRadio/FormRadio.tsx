import type { FC } from 'react'

import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { ErrorMessage, Field, FieldArray, useField } from 'formik'
import { nanoid } from 'nanoid'

import styles from './formRadio.module.scss'

import 'antd/lib/radio/style/css'

interface IProps {
  name: string
  style?: object
  options: string[]
  label?: string | JSX.Element
}

export const FormRadio: FC<IProps> = ({ name, options, style }) => {
  const [field, _, helpers] = useField(name)
  return (
    <div style={style && style} className={styles.parent}>
      <FieldArray
        name={name}
        render={() =>
          options.map(
            (option: string): JSX.Element => (
              <div key={nanoid()}>
                <Field name={option}>
                  {() => (
                    <div className={styles.parentRadioItem}>
                      <div className={styles.parentRadioItemContent}>
                        <Radio
                          id={option}
                          value={option}
                          checked={field.value === option}
                          onChange={(event: RadioChangeEvent) =>
                            helpers.setValue(event.target.value)
                          }
                        />
                        <label htmlFor={option} className={styles.parentLabel}>
                          {option}
                        </label>
                      </div>
                    </div>
                  )}
                </Field>
              </div>
            ),
          )
        }
      />
      <ErrorMessage component='p' className={styles.parentErrorInform} name={name} />
    </div>
  )
}
