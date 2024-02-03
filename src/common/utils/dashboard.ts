import { TopTypes } from 'common/interfaces/Dashboard'

export const getValueByLabel = (label: string, doughnutData: TopTypes) => {
  const typeObject = doughnutData?.annualTopTypes.find(
    (data: { type: string }) => data.type === label,
  )
  return typeObject?.total || 0
}

export const getDoughnutTotal = (doughnutData: TopTypes) => {
  return doughnutData?.annualTopTypes.reduce((acc, type) => acc + (type.total || 0), 0) || 0
}
