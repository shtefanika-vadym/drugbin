export interface CollectParser {
  data: CollectDataParser[]
  limit: number
  page: number
  totalItems: number
}

export interface CollectDataParser {
  drugList: DrugListProps[]
  email: string | null
  firstName: string
  id: number
  lastName: string
  status: string
}

export interface DrugListProps {
  drugDetails: {
    atc: string
    createdAt: string
    id: number
    importer: number
    isPsycholeptic: boolean
    packaging: string
    prescription: string
    producer: string
    updatedAt: string
  }
  drugId: number
  expirationDate: string | null
  lot: string
  pack: string
  quantity: number
  name: {
    value: string
  }
}

export interface CollectData {
  pharma: string
  quantity: number
  status: string
  id: number
  drugList: DrugListProps[]
  firstName: string
  lastName: string
}

export interface VerbalProcesData {
  generationDate: string
  pharmaName: string
  clientName: string
  drugList: {
    key: number
    quantity: number
    pack: string
    name: {
      name: string
      drugId: string
    }
    isPsycholeptic: boolean
  }[]
}
