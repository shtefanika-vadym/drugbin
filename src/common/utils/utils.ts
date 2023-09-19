export const getLastElement = (path: string) => {
  const fullPath = path.split('/')
  return fullPath[fullPath.length - 1]
}

export const customDateFormat = (timestampString: string) => {
  const date = new Date(timestampString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export const customTimeFormat = (timestampString: string) => {
  const date = new Date(timestampString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`
  return formattedTime
}
