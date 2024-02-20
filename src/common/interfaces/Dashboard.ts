export interface DashboardResponse {
  documents: DocumentChart
  drugs: DrugsChart
  types: TypesChart
  recycle: StatusChart
}

export type TypesChart = {
  annual: MonthlyAnnualTypes[]
  monthly: MonthlyTypes[]
}

type MonthlyTypes = {
  [month: number]: {
    type: string
    total: number
  }
}

type MonthlyAnnualTypes = {
  type: string
  total: number
}

export type DrugsChart = {
  annual: number
  monthly: number[]
  monthlyDetails: MonthlyDetailsDrugs
}

type MonthlyDetailsDrugs = {
  [month: string]: {
    [day: string]: number
  }
}

export type DocumentChart = {
  annual: {
    normal: number
    psycholeptic: number
    total: number
  }
  monthly: MonthlyDocumets
}

type MonthlyDocumets = {
  normal: {
    [month: string]: number
  }
  psycholeptic: {
    [month: string]: number
  }
}

type MonthlyStatus = {
  [month: string]: {
    approved: number
    pending: number
    recycled: number
  }
}

export type StatusChart = {
  annual: {
    approved: number
    pending: number
    recycled: number
  }
  monthly: MonthlyStatus
}
