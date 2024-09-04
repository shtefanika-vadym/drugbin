import { Container } from './Settings.styled'
import { SettingsAccount } from './SettingsAccount/SettingsAccount'
import SettingsCenter from './SettingsCenter/SettingsCenter'
import { SettingsSignature } from './SettingsSignature/SettingsSignature'

export const Settings = () => {
  return (
    <Container>
      <SettingsAccount />
      <SettingsSignature />
      <SettingsCenter />
    </Container>
  )
}
