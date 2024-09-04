import { UploadIcon } from 'components/ui/Icon'
import { useCallback, useRef } from 'react'
import { Container, Description, Title } from './SignatureUpload.styled'

export const SignatureUpload = () => {
  const inputRef = useRef(null)

  const onChooseFile = useCallback(() => {
    inputRef.current.click()
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    console.log('files', files)
    // if (files) setFile(files[0])
  }, [])

  return (
    <Container onClick={onChooseFile}>
      <input
        type='file'
        accept='.pdf'
        ref={inputRef}
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <div>
        <UploadIcon height={42} width={42} />
      </div>
      <div>
        <Title>Adaugă o semnătură nouă</Title>
        <Description>Selectează o semnătură sau trage fișierul aici</Description>
      </div>
    </Container>
  )
}
