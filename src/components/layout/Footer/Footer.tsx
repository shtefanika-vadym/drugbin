import type { ReactNode } from 'react'
import React from 'react'
import { Container } from './Footer.styled'

interface FooterProps {
  children?: ReactNode
}
export const Footer: React.FC<FooterProps> = ({ children }) => {
  return <Container>{children}</Container>
}
