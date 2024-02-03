export interface DashboardResponse {
  topProducers: any
  topTypes: TopTypes
  totalDrugs: any
}

export type TopTypes = {
  annualTopTypes: { type: string; total: number }[]
  monthlyTopTypes: MonthlyTopTypes
}

type MonthlyTopTypes = {
  [month: number]: {
    type: string
    total: number
  }[]
}
