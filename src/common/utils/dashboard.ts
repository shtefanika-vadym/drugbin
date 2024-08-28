import { TypesChart } from "common/types/dashboard.types"

export const getValueByLabel = (label: string, doughnutData: TypesChart) => {
  const typeObject = doughnutData?.annual.find((data: { type: string }) => data.type === label)
  return typeObject?.total || 0
}

export const getDoughnutTotal = (doughnutData: TypesChart) => {
  return doughnutData?.annual.reduce((acc, type) => acc + (type.total || 0), 0) || 0
}
