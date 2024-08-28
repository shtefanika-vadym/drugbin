import api from 'api'
import { AxiosResponse } from 'axios'
import { useData } from './useData'
import { DashboardResponse } from 'common/types/dashboard.types'

const fetcher = async (url: string): Promise<DashboardResponse> => {
  const response: AxiosResponse<DashboardResponse> = await api.get<DashboardResponse>(url)

  return response.data
}

export const useGetDashboard = (date: number) => {
  const { data, isError, isLoading, mutate } = useData(`/dashboard/${date}`, fetcher)

  return { data, isError, isLoading, mutate }
}
