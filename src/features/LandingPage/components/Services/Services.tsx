import type { FC } from 'react'

import list1 from 'features/LandingPage/assets/list1.jpg'
import list2 from 'features/LandingPage/assets/list2.jpg'
import list3 from 'features/LandingPage/assets/list3.jpg'

import useBreakpoints from 'common/hooks/useBreakpoints'

import {
  LIST_SECTION_1,
  LIST_SECTION_2,
  LIST_SECTION_3,
} from 'features/LandingPage/constants/constants'

import { Section } from './Section'
import { Image, ServicesWrapper } from './Services.styled'

interface IServices {
  id: string
}

export const Services: FC<IServices> = ({ id }) => {
  const { isBelowDesktop } = useBreakpoints()
  return (
    <ServicesWrapper id={id}>
      <Section content={LIST_SECTION_1} right>
        <Image src={list1} />
      </Section>
      <Section content={LIST_SECTION_2} right={!isBelowDesktop ? false : true}>
        <Image src={list2} />
      </Section>
      <Section content={LIST_SECTION_3} right>
        <Image src={list3} />
      </Section>
    </ServicesWrapper>
  )
}
