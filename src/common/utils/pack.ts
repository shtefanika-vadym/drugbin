export const toPackType = (pack: string) => {
  switch (pack) {
    case 'pack':
      return 'Cutie'
    case 'blister':
      return 'Blister'
    case 'pastila':
      return 'Pastila'
  }
}
