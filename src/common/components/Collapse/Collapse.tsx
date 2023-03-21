import type { FC } from 'react'

import classNames from 'classnames'

import styles from './collapse.module.scss'

interface IProps {
  summary: string
  disabled?: boolean
  children: JSX.Element
}

export const Collapse: FC<IProps> = ({ summary, children, disabled = false }) => (
  <details
    className={classNames(styles.parent, {
      [styles.parentDisabled]: disabled,
    })}
    open>
    <summary className={styles.parentSummary}>{summary}</summary>
    {children}
  </details>
)
