import type { ReactNode } from 'react'
import React from 'react'
import { Container } from './Header.styled'

interface HeaderProps {
  children?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <Container>{children}</Container>
}
