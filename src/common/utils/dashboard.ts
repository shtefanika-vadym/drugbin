import { CategoriesChart } from "common/types/dashboard.types"

export const getValueByLabel = (label: number, doughnutData: CategoriesChart) => {
  const typeObject = doughnutData?.annual.find((data: { category: number }) => data.category === label)
  return typeObject?.total || 0
}

export const getDoughnutTotal = (doughnutData: CategoriesChart) => {
  return doughnutData?.annual.reduce((acc, type) => acc + (type.total || 0), 0) || 0
}
