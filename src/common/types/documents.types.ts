/**
 * "Documente" — proces-verbal shapes. Mirrors drugbin-cf src/schema/documents.ts (docs/18.02).
 */
export enum DocumentType {
  NORMAL = 'normal',
  PSYCHOLEPTIC = 'psycholeptic',
}

export interface PvRow {
  id: string
  category: number
  startDate: string
  endDate: string
  createdAt: number
  sharedAt: number | null
  deletedAt: number | null
  /** Live window count for a draft; frozen membership count for a shared PV. */
  itemCount: number
}
