import api from 'api'
import { AxiosResponse } from 'axios'
import { DocumentType } from 'common/types/documents'
import { useData } from './useData'
import { useDataOnDemand } from './useDataOnDemand'

const generateRaportFetcher = async (url: string, { arg }: { arg: string }): Promise<void> => {
  return await api.post(url, {
    endDate: arg,
  })
}

const fetchRaportDate = async (url: string): Promise<string> => {
  const response: AxiosResponse<{ startDate: string }> = await api.get(url)

  return response.data.startDate
}

export const useGenerateRaport = (type: DocumentType) => {
  const { trigger, isMutating } = useDataOnDemand(`/documents/${type}`, generateRaportFetcher)

  return { trigger, isMutating }
}

export const useGetRaportDate = (type: DocumentType) => {
  const { data, isLoading } = useData(`/documents/start-date?type=${type}`, fetchRaportDate)

  return { data, isLoading }
}
