import { SettingsHeader } from '../SettingsHeader/SettingsHeader'
import { Container } from './SettingsSignature.styled'
import { SignatureBox } from './SignatureBox'
import { SignatureUpload } from './SignatureUpload'

export const SettingsSignature = () => {
  return (
    <div>
      <SettingsHeader
        title='Semnătură'
        description='Adaugă sau actualizează semnătura utilizată în documente.'
      />
      <Container>
        <SignatureBox isDefault />
        <SignatureBox />
        <SignatureUpload />
      </Container>
    </div>
  )
}
