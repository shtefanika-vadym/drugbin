export const fromDrugPack = (pack: string): string => {
  const packMapping: { [key: string]: string } = {
    box: 'Cutie',
    entity: 'Unitate',
  }

  return packMapping[pack] || 'Unitate'
}