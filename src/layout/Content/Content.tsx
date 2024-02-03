import type { ReactNode } from 'react'
import { Container } from './Content.styled'

interface ContentProps {
  children?: ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return <Container>{children}</Container>
}
