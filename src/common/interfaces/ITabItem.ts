export interface ITabItem {
  title: string
  disabled?: boolean
  path: string | number
  component: JSX.Element | null
}
