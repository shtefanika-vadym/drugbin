type Option = 'approve' | 'delete' | 'view' | 'share' | 'download' | 'print'
export type QuickActionEntry = 'entry-drug' | 'document-normal' | 'document-psycholeptic'
type QuickActionOption = Record<QuickActionEntry, Option[]>

export const QUICK_ACTION_OPTIONS: QuickActionOption = {
  'entry-drug': ['approve', 'delete'],
  'document-normal': ['view', 'share', 'download', 'print'],
  'document-psycholeptic': ['view', 'share', 'download', 'print'],
}

type QuickActionContent = {
  icon: React.ReactNode
  action: (e?: React.MouseEvent<HTMLElement>) => void
}
export type AvailableQuickAction = Record<Option, QuickActionContent>
