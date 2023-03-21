import type { FC } from 'react'
import { useId } from 'react'

import { Input as AntInput, Skeleton } from 'antd'
import classNames from 'classnames'

import type { IInput } from 'common/interfaces/IInput'

import styles from './input.module.scss'

export const Input: FC<IInput> = ({ label, isLoading, ...rest }) => {
  const id = useId()
  return (
    <div>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={classNames(styles.container, {
          [styles.containerSkeleton]: isLoading,
        })}>
        {isLoading ? <Skeleton paragraph={{ rows: 0 }} active /> : <AntInput id={id} {...rest} />}
      </div>
    </div>
  )
}
