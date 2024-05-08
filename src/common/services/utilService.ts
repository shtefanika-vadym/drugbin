// TODO --> MANDATORY REFACTOR

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

export const UtilService = {
  formatDate,
  formatTime,
  transformText,
}
