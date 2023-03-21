import type { FC } from 'react'

import { Button as AtnButton } from 'antd'
import type { NativeButtonProps } from 'antd/es/button/button'
import classNames from 'classnames'

import { BUTTON_MODIFIER, BUTTON_PROPORTION } from 'common/constants/buttonConstants'
import { UtilService } from 'common/services/utilService'
import type {
  BUTTON_MODIFIER_TYPE,
  BUTTON_PROPORTION_TYPE,
  BUTTON_SEVERITY_TYPE,
} from 'common/types/buttonType'

// I suppress next line with eslint-disable-next-line because i use dynamic class
// eslint-disable-next-line css-modules/no-unused-class
import styles from './button.module.scss'

import 'antd/lib/button/style/css'

export interface IProps extends NativeButtonProps {
  modifier?: BUTTON_MODIFIER_TYPE
  children: JSX.Element | string
  proportion?: BUTTON_PROPORTION_TYPE
  severity?: BUTTON_SEVERITY_TYPE
}

export const Button: FC<IProps> = ({
  children,
  modifier = BUTTON_MODIFIER.PRIMARY,
  proportion = BUTTON_PROPORTION.MEDIUM,
  severity,
  ...rest
}) => {
  return (
    <AtnButton
      className={classNames(
        styles.button,
        styles[`button${UtilService.capitalizeFirstLetter(modifier)}`],
        styles[`button${UtilService.capitalizeFirstLetter(proportion)}`],
        severity && styles[`button${UtilService.capitalizeFirstLetter(severity)}`],
      )}
      {...rest}>
      {children}
    </AtnButton>
  )
}
