import { DrugListProps } from 'common/interfaces/HistoryTypes'

export interface ManagementResponse {
  data: ManagementEntryResponse[]
  limit: number
  page: number
  totalItems: number
}

export interface ManagementEntryResponse {
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

export interface ManagementEntry {
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

export interface ManagementType {
  data: ManagementEntry[]
  totalItems: number
}
