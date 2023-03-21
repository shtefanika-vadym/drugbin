import type { ITabItem } from 'common/interfaces/ITabItem'

export interface ITabPanel {
  independently?: boolean
  propActiveKey?: string
  defaultRedirectPath?: string
  navigationList: ITabItem[]
  onChange?: (activeKey: string) => void
}
