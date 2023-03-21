const fullName = (): RegExp =>
  /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/g

const onlyLatin = (): RegExp => /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi

const includeSpace = (): RegExp => /\s/

const email = (): RegExp =>
  /^[a-zA-Z0-9.+_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const includeLowerCase = (): RegExp => /^(?=.*[a-z])/

const includeUpperCase = (): RegExp => /^(?=.*[A-Z])/

const includeNumber = (): RegExp => /^(?=.*[0-9])/

const includeSpecialChar = (): RegExp => /^(?=.*[!@#\$%\^&\*])/
export const RegexService = {
  fullName,
  email,
  includeSpace,
  onlyLatin,
  includeUpperCase,
  includeNumber,
  includeSpecialChar,
  includeLowerCase,
}
