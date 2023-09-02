import type { ReactNode } from 'react'

import { Footer } from 'layout/Footer/Footer'

import { Content } from './Header.styled'
import { TopBlock } from 'components/layout/TopBlock/TopBlock'

export interface HeaderProps {
  children?: ReactNode
}

export const HeaderWrapper: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div>
      <TopBlock />
      <Content>{children}</Content>
      <Footer />
    </div>
  )
}
