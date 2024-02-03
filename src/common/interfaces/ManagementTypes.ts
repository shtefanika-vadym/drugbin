import type { DrugListProps } from './HistoryTypes'

export interface ManagementParser {
  data: ManagementEntryParser[]
  limit: number
  page: number
  totalItems: number
}

export interface ManagementEntryParser {
  id: number
  recycleId: string
  status: string
  drugList: DrugListProps[]
  address: string | null
  cnp: string | number | null
  firstName: string
  lastName: string
  hospitalId: string
  createdAt: string
}

export interface ManagementData {
  key: number
  user: {
    name: string
    id: string
  }
  createAt: {
    date: string
    time: string
  }
  quantity: number
  status: string
  drugList: DrugListProps[]
}

export interface ManagementResponse {
  data: ManagementData[]
  totalItems: number
}
