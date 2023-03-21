import type { FC } from 'react'

import { Input } from 'antd'

import { INPUT_PLACEHOLDER } from 'common/constants/inputConstants'
import type { ITextarea } from 'common/interfaces/ITextarea'

import styles from './textarea.module.scss'

const AntTextarea = Input.TextArea

export const Textarea: FC<ITextarea> = ({ label, name, ...rest }) => {
  return (
    <div className={styles.parent}>
      <label htmlFor={name} className={styles.parentLabel}>
        {label}
      </label>
      <div className={styles.parentContainer}>
        <AntTextarea rows={4} placeholder={INPUT_PLACEHOLDER.TYPE_HERE} {...rest} />
      </div>
    </div>
  )
}
