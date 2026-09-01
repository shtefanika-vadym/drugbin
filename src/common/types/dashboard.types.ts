/**
 * "Statistici" — the hospital dashboard blob. Mirrors drugbin-cf src/schema/dashboard.ts
 * (docs/18.03). One hospital, one calendar year. No `recycle`/`status` block — every classification
 * is implicitly approved.
 */
export interface CategoryTotal {
  category: number
  total: number
}

/** month key "1".."12" -> value */
export type MonthMap = Record<string, number>

export interface DashboardResponse {
  categories: {
    annual: CategoryTotal[]
    monthly: Record<string, CategoryTotal[]>
  }
  volume: {
    annual: number
    monthly: MonthMap
    /** month "1".."12" -> day "1".."31" -> count */
    monthlyDetails: Record<string, Record<string, number>>
  }
  documents: {
    annual: {
      cytototoxic: number
      inhalers: number
      injectables: number
      insulin: number
      common: number
      supplements: number
      psycholeptics: number
      total: number
    }
    monthly: Record<string, MonthMap>
  }
}

// Names the widgets still import.
export type CategoriesChart = DashboardResponse['categories']
export type VolumeChart = DashboardResponse['volume']
export type DocumentChart = DashboardResponse['documents']
