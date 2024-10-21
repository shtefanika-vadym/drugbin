export interface DashboardResponse {
  documents: DocumentChart
  drugs: DrugsChart
  categories: CategoriesChart
  recycle: StatusChart
}

export type CategoriesChart = {
  annual: MonthlyAnnualCategories[]
  monthly: MonthlyCategories[]
}

type MonthlyCategories = {
  [month: number]: {
    category: number
    total: number
  }
}

type MonthlyAnnualCategories = {
  category: number
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
    common: number
    cytototoxic: number
    inhalers: number
    injectables: number
    insulin: number
    psycholeptics: number
    supplements: number
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
