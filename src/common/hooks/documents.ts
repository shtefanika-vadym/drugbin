import api from 'api'
import { AxiosResponse } from 'axios'
import {
    DocumentType,
    DocumentsVerbalProcess,
    DocumentsVerbalProcessResponse,
} from 'common/types/documents.types'
import { toDocumentsVerbalProcess } from 'uc/mappers'
import { useData } from './useData'
import { useDataOnDemand } from './useDataOnDemand'

export const fetchDocument = async (url: string): Promise<ArrayBuffer> => {
  const response: AxiosResponse<ArrayBuffer> = await api.get<ArrayBuffer>(url, {
    headers: {
      Accept: 'application/pdf',
    },
    responseType: 'arraybuffer',
  })

  return response.data
}

const fetcher = async (url: string): Promise<string> => {
  const response = await fetchDocument(url)

  const pdfBlob = new Blob([response], { type: 'application/pdf' })
  return URL.createObjectURL(pdfBlob)
}

const fetchVerbalProces = async (url: string): Promise<DocumentsVerbalProcess[]> => {
  const response: AxiosResponse<DocumentsVerbalProcessResponse[]> = await api.get<
    DocumentsVerbalProcessResponse[]
  >(url)

  return toDocumentsVerbalProcess(response.data)
}

export const useGetDocument = (id: string, type: DocumentType) => {
  const { data, trigger, isMutating } = useDataOnDemand(
    `/recycle/process/${id}?type=${type}`,
    fetcher,
  )

  return { data, trigger, isMutating }
}

export const useGetVerbalProcesEntries = (type: DocumentType) => {
  const { data, isLoading, mutate } = useData(`/documents/all?type=${type}`, fetchVerbalProces)

  return { data, isLoading, mutate }
}

export const useGetMonthlyRaport = (id: string, type: DocumentType) => {
  const { trigger, data, isMutating } = useDataOnDemand(
    `/documents/data/${id}?type=${type}`,
    fetcher,
  )

  return { data, trigger, isMutating }
}
