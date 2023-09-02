import type { ReactNode } from 'react'
import { TopBlock } from 'components/layout/TopBlock/TopBlock'
import { Page, Main } from './PageWrapper.styled'

interface PageWrapperProps {
  children?: ReactNode
  color?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Page>
      <TopBlock />
      <Main>{children}</Main>
      {/* <BottomBlock /> */}
    </Page>
  )
}
