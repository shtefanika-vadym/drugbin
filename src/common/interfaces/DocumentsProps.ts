export interface DocumentsVerbalProcessResponse {
  createdAt: string
  deletedAt: string | null
  endDate: string
  id: number
  sharedAt: string
  startDate: string
  documentId: string
}

export interface DocumentsVerbalProcess {
  createAt: {
    data: string
    time: string
  }
  period: {
    startDate: string
    endDate: string
  }
  deletedAt: string
  id: number
  sharedAt: string
  documentId: string
}
