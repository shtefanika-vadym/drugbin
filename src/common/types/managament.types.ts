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
  drugList: DrugList[]
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
  drugList: DrugList[]
}

export interface ManagementType {
  data: ManagementEntry[]
  totalItems: number
}

export interface DrugList {
  atc: string
  createdAt: string
  id: number
  importer: number
  isPsycholeptic: boolean
  packaging: string
  prescription: string
  producer: string
  updatedAt: string
  drugId: number
  expirationDate: string | null
  lot: string
  pack: string
  quantity: number
  name: string
  category: number
}
