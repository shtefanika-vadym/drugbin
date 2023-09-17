export const getLastElement = (path: string) => {
  const fullPath = path.split('/')
  return fullPath[fullPath.length - 1]
}
