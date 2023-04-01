export const remToPxVal = (remString: string): number => Math.floor(parseFloat(remString) * 16)

export const transitionFor = (arr: string[], transition: string) =>
  arr.map((p) => p + ' ' + transition).join(',')
