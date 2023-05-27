import styled from 'styled-components'

import { WDS_BREAKPOINT_MOBILE_UP_TO } from 'common/constants/breakpoint'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const FooterContent = styled.div`
  ${flex({ direction: 'column', gap: '80px' })};
  max-width: 1285px;
  padding: 80px 0;
  margin: 0 auto;

  @media (max-width: ${WDS_BREAKPOINT_MOBILE_UP_TO}) {
    ${flex({ direction: 'column', gap: '32px' })};
    padding: 56px 16px;
  }
`
export const ContentWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })};

  @media (max-width: ${WDS_BREAKPOINT_MOBILE_UP_TO}) {
    ${flex({ direction: 'column', gap: '24px' })};
  }
`

export const NavigationContent = styled.div`
  ${textVariant('subheading')}
  ${flex({ gap: '32px' })};
  color: #01102e;
  cursor: pointer;
`

export const IconWrapper = styled.div`
  ${flex({ gap: '12px' })};
`

export const LinkStyle = styled.p``

export const Icon = styled.img`
  cursor: pointer;
`

export const PolicyContent = styled.div`
  width: 100%;
  ${flex({ justifyContent: 'center', gap: '24px' })};
  border-top: 1px solid #ebf0fb;
  padding: 32px 0;
`
export const LinksWrapper = styled.div`
  ${textVariant('bodyXS')};
  text-decoration: underline;
  color: #1c3375;
`
