const getFilledArray = (len: number) => Array(len).fill(0)

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

const capitalizeString = (str: string): string =>
  str
    .split(' ')
    .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const deepEqual = (object1: object, object2: object): boolean => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }

  const isObject = (object: object) => object != null && typeof object === 'object'

  for (const key of keys1) {
    const val1 = object1[key as keyof object]
    const val2 = object2[key as keyof object]
    const areObjects = isObject(val1) && isObject(val2)
    if ((areObjects && deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      // Need log for testing
      console.log(val1, val2)
      return false
    }
  }
  return true
}

const removeFieldInObject = (obj: object, removedKey: string) => {
  const newObj = window.structuredClone(obj)
  delete newObj[removedKey]
  return newObj
}

const formatDate = (props: string) => {
  const timestampString = props
  const date = new Date(timestampString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const formatTime = (props: string) => {
  const timestampString = props
  const date = new Date(timestampString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`
  return formattedTime
}

const transformText = (props: string) => {
  const capitalizeFirstLetter = (props: string) => {
    return props?.charAt(0)?.toUpperCase() + props?.slice(1)
  }
  switch (props) {
    case 'rx':
      return 'RX'
    case 'otc':
      return 'OTC'
    default:
      return capitalizeFirstLetter(props)
  }
}

const formatWeight = (weightInGrams: number): string => {
  if (weightInGrams >= 1000) {
    return (weightInGrams / 1000).toFixed(1) + ' kg'
  } else {
    return weightInGrams + ' g'
  }
}

export const UtilService = {
  getFilledArray,
  deepEqual,
  removeFieldInObject,
  capitalizeString,
  capitalizeFirstLetter,
  formatDate,
  formatTime,
  transformText,
  formatWeight,
}
