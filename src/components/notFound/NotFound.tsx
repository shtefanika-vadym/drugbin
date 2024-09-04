import notFoundBackground from 'common/assets/images/404.png'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { Text } from 'components/ui/Text/Text'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Content, Image } from './NotFound.styled'

export const NotFound = () => {
  const navigate = useNavigate()

  const handleNavigate = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <Container>
      <Image src={notFoundBackground} alt='not-found-background' />
      <Content>
        <Text variant='titleH3'>Ne pare rău, dar pagina pe care o cauți nu a fost găsită.</Text>
        <Text variant='bodyM' color={WDS_COLOR_GREY}>
          Întoarce-te la pagina principală sau folosește meniul pentru a continua explorarea.
        </Text>
        <Button onClick={handleNavigate}>Înapoi la pagina principală</Button>
      </Content>
    </Container>
  )
}
