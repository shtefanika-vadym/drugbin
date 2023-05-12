import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useLocalStorage } from 'usehooks-ts'

import { BarStyle, Language, SelectWrapper } from './SelectLanguage.styled'

type Languages = 'en' | 'ro'

export const SelectLanguage = () => {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<Languages>(
    'selectedLanguage',
    'en',
  )

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage)
  }, [i18n, selectedLanguage])

  const handleLanguageChange = (language: Languages) => {
    setSelectedLanguage(language)
  }
  return (
    <SelectWrapper>
      <Language isActive={selectedLanguage === 'en'} onClick={() => handleLanguageChange('en')}>
        EN
      </Language>
      <BarStyle>|</BarStyle>
      <Language isActive={selectedLanguage === 'ro'} onClick={() => handleLanguageChange('ro')}>
        RO
      </Language>
    </SelectWrapper>
  )
}
