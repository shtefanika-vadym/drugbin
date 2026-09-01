import apiV2 from 'api/v2'
import { useData } from './useData'
import { DashboardResponse } from 'common/types/dashboard.types'

const fetcher = (url: string): Promise<DashboardResponse> =>
  apiV2.get<DashboardResponse>(url).then((r) => r.data)

/** "Statistici" for the signed-in hospital, one calendar year. drugbin-cf /api/v1/manage/dashboard. */
export const useGetDashboard = (year: number) => {
  const { data, isError, isLoading, mutate } = useData(`/api/v1/manage/dashboard/${year}`, fetcher)
  return { data, isError, isLoading, mutate }
}
