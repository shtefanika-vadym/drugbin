import type { ReactNode } from 'react'

import { Footer } from 'layout/Footer/Footer'

import { Header } from './Header'
import { Content } from './Header.styled'

export interface HeaderProps {
  children?: ReactNode
}

export const HeaderWrapper: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  )
}
