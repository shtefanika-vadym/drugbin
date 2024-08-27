import api from 'api'
import { AxiosResponse } from 'axios'
import { ManagementResponse, ManagementType } from 'common/types/managament.types'
import { useData } from './useData'
import { toManagementEntry } from 'uc/mappers'

const fetchEntries = async (url: string): Promise<ManagementType> => {
  const response: AxiosResponse<ManagementResponse> = await api.get<ManagementResponse>(url)

  return toManagementEntry(response.data)
}

// TODO: Ask backend team to make a single api for get all entries and search entries
export const useGetEntries = (page: number, search?: string) => {
  // const query = new URLSearchParams({
  //   page,
  //   limit: '10',
  //   ...(search && { search }),
  // }).toString()

  const entriesURL = `/recycle?page=${page}&limit=10`
  const searchURL = `/recycle/search/${search}?page=${page}&limit=10`
  const currentURL = search ? searchURL : entriesURL

  const { data, isError, isLoading, mutate } = useData(currentURL, fetchEntries)

  return { data, isError, isLoading, mutate }
}
