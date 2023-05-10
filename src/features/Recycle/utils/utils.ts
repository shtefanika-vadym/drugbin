export const transformData = (data: any) => {
  const transformedData = { ...data }
  transformedData.drugList = transformedData.drugList.map((drug: any) => {
    const { drugName, pack, quantity, ...rest } = drug
    return {
      drugId: Number(drugName.drugId),
      pack: pack.toLowerCase(),
      quantity: Number(quantity),
      ...rest,
    }
  })
  return transformedData
}
