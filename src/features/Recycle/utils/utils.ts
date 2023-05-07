export const transformData = (data: any) => {
  const transformedData = { ...data }
  transformedData.drugList = transformedData.drugList.map((drug: any) => {
    const { drugName, pack, ...rest } = drug
    return { drugId: Number(drugName.drugId), pack: pack.toLowerCase(), ...rest }
  })
  return transformedData
}
