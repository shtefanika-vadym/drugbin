import type { FC, ReactNode } from 'react'

import starIcon from 'features/LandingPage/assets/star.svg'

import {
  Content,
  Icon,
  List,
  ListContent,
  ListWrapper,
  SubTitle,
  Tag,
  Title,
} from './Services.styled'

interface ISection {
  content: {
    tag?: string
    title: string
    subTitle: string
    list: Array<string>
  }
  right: boolean
  children: ReactNode
}

export const Section: FC<ISection> = ({ content, right, children }) => {
  return (
    <Content>
      {!right && <div>{children}</div>}
      <div>
        <Tag>{content.tag}</Tag>
        <Title>{content.title}</Title>
        <SubTitle>{content.subTitle}</SubTitle>
        <ListWrapper>
          {content.list.map((element: string) => (
            <List>
              <Icon src={starIcon} />
              <ListContent>{element}</ListContent>
            </List>
          ))}
        </ListWrapper>
      </div>
      {right && <div>{children}</div>}
    </Content>
  )
}
