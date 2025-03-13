export enum DocumentType {
  PSYCHOLEPTIC = 'psycholeptic',
  NORMAL = 'normal',
}

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

export enum DocumentCategory {
  UNKNOWN = 0,
  CYTOTOXIC = 1,
  INHALER = 2,
  CUTTING = 3,
  INSULIN = 4,
  USUAL = 5,
  SUPPLEMENT = 6,
  PSYCHOLEPTIC = 7,
}
