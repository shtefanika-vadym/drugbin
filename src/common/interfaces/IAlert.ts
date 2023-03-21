import type { ALERT_TYPE } from 'common/types/alertType'

export interface IAlert {
  title: string
  type: ALERT_TYPE
  description: string | string[]
}
