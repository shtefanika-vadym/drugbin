type Option = 'approve' | 'delete' | 'view' | 'share' | 'download' | 'print' | 'restore'
export type QuickActionEntry = 'entry-drug' | 'document-normal' | 'document-psycholeptic'
type QuickActionOption = Record<QuickActionEntry, Option[]>

export const QUICK_ACTION_OPTIONS: QuickActionOption = {
  'entry-drug': ['approve', 'delete', 'restore'],
  'document-normal': ['view', 'download', 'print'],
  'document-psycholeptic': ['view', 'download', 'print'],
}

type QuickActionContent = {
  icon: React.ReactNode
  action: (e?: React.MouseEvent<HTMLElement>) => void
}
export type AvailableQuickAction = Record<Option, QuickActionContent>
