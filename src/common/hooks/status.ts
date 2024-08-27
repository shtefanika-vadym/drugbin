import api from 'api'
import { useDataOnDemand } from './useDataOnDemand'

const updateRaport = async (url: string): Promise<void> => {
  return await api.patch(url)
}

const deleteRaport = async (url: string): Promise<void> => {
  return await api.delete(url)
}

export const useUpdateStatusRaport = (id: string) => {
  const { trigger } = useDataOnDemand(`recycle/${id}`, updateRaport)

  return { trigger }
}

export const useDeleteRaport = (id: string) => {
  const { trigger } = useDataOnDemand(`recycle/${id}`, deleteRaport)

  return { trigger }
}
