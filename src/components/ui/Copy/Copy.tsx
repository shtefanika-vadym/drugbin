import { CopyIcon } from 'components/ui/Icon'
import { useCallback, useState } from 'react'
import { Container, Text } from './Copy.styled'

export interface CopyProps {
  text: string
}

export const Copy: React.FC<CopyProps> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false)

  const copyToClipboard = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    },
    [text],
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <Container>
      <Text
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={copyToClipboard}>
        {text}
      </Text>
      {isHovered && <CopyIcon />}
    </Container>
  )
}
