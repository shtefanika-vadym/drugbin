export const isEmail = (value: string): boolean =>
  /^[^\W]+[^\s@]*[^\W]+@[^\W]+[^\s@]*\.[^\W]+$/.test(value)

export const isStringNotEmpty = (value: string): boolean => !!value

export const attachAsterisk = (s: string) => `${s} *`
