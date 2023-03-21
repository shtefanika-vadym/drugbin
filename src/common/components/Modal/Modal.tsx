import type { FC } from 'react'

import type { ModalProps } from 'antd'
import { Modal as AntModal } from 'antd'

import closeIcon from 'common/assets/icons/close-outline.svg'

import { ALT_CONSTANTS } from 'common/constants/altConstants'

import styles from './modal.module.scss'

import 'antd/lib/modal/style/css'

interface IProps extends ModalProps {
  title?: string
  keyboard?: boolean
  onCancel?: () => void
  children?: JSX.Element | null
  cancelButton?: boolean
}

const Modal: FC<IProps> = ({
  title,
  children,
  cancelButton = true,
  keyboard,
  onCancel,
  ...rest
}) => (
  <AntModal onCancel={() => keyboard && onCancel && onCancel()} {...rest}>
    {title !== '' && (
      <div className={styles.parent}>
        {title && <h2 className={styles.parentTitle}>{title}</h2>}
        {cancelButton && (
          <button onClick={onCancel} className={styles.parentClose}>
            <img src={closeIcon} className={styles.parentIcon} alt={ALT_CONSTANTS.ACTION_ICON} />
          </button>
        )}
      </div>
    )}
    {children}
  </AntModal>
)

export default Modal
