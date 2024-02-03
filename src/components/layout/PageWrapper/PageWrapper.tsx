import { TopBlock } from 'components/layout/TopBlock/TopBlock'
import { Content } from 'layout/Content/Content'
import type { ReactNode } from 'react'
import { Main, Page } from './PageWrapper.styled'

interface PageWrapperProps {
  children?: ReactNode
  color?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Page>
      <TopBlock />
      <Main>
        <Content>{children}</Content>
      </Main>
    </Page>
  )
}
