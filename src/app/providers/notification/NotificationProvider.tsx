import type { ReactNode } from 'react'
import { createContext, useCallback, useContext } from 'react'

import { notification as antNotification } from 'antd'
import classNames from 'classnames'
import { nanoid } from 'nanoid'

import closeIcon from 'common/assets/close.svg'
import errorIcon from 'common/assets/error.svg'
import successIcon from 'common/assets/success.svg'

import { ALERT_CONSTANTS } from 'common/constants/alertConstants'
import { ALT_CONSTANTS } from 'common/constants/altConstants'
import type { IAlert } from 'common/interfaces/IAlert'
import { UtilService } from 'common/services/utilService'

import 'antd/lib/notification/style/css'

interface IProps {
  notification: JSX.Element
  setNotification: (data: IAlert) => void
}

const NotificationContext = createContext<IProps | null>(null)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, notification] = antNotification.useNotification()

  const setNotification = useCallback(({ title, description, type }: IAlert) => {
    const key: string = nanoid()
    api.success({
      key,
      message: title,
      description: description,
      placement: 'bottomLeft',
      duration: 7,
      className: classNames(
        'notification',
        `notification${UtilService.capitalizeFirstLetter(type)}`,
      ),
      icon: (
        <img
          alt={ALT_CONSTANTS.INFO_ICON}
          src={type === ALERT_CONSTANTS.SUCCESS ? successIcon : errorIcon}
        />
      ),
      closeIcon: <img src={closeIcon} alt={ALT_CONSTANTS.ACTION_ICON} />,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NotificationContext.Provider value={{ setNotification, notification: notification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext) as IProps
}
