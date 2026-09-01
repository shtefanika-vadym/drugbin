import { Bar, TabButton } from './Tabs.styled'

export interface TabItem<T extends string> {
  id: T
  label: string
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  active: T
  onChange: (id: T) => void
}

/** A controlled tab strip. Styled like components/ui/NavigateList. */
export function Tabs<T extends string>({ items, active, onChange }: TabsProps<T>) {
  return (
    <Bar>
      {items.map((item) => (
        <TabButton key={item.id} type='button' isActive={item.id === active} onClick={() => onChange(item.id)}>
          {item.label}
        </TabButton>
      ))}
    </Bar>
  )
}
