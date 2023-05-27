import LogoIconMobile from 'common/assets/icons/footer-mobile.svg'
import Instagram from 'common/assets/icons/instagram.svg'
import Linkedin from 'common/assets/icons/linkedin-line.svg'
import LogoIcon from 'common/assets/icons/logo-footer.svg'

import useBreakpoints from 'common/hooks/useBreakpoints'

import {
  ContentWrapper,
  FooterContent,
  Icon,
  IconWrapper,
  LinkStyle,
  LinksWrapper,
  NavigationContent,
  PolicyContent,
} from './Footer.styled'

export const Footer = () => {
  const { isMobile } = useBreakpoints()
  return (
    <FooterContent>
      <ContentWrapper>
        <Icon src={isMobile ? LogoIconMobile : LogoIcon} />
        <NavigationContent>
          <LinkStyle>About us</LinkStyle>
          <LinkStyle>Services</LinkStyle>
          <LinkStyle>Contact</LinkStyle>
        </NavigationContent>
        <IconWrapper>
          <Icon src={Instagram} />
          <Icon src={Linkedin} />
        </IconWrapper>
      </ContentWrapper>
      <PolicyContent>
        {isMobile && (
          <>
            <LinksWrapper>Privacy Policy</LinksWrapper>
            <LinksWrapper>Terms of Service</LinksWrapper>
            <LinksWrapper>Cookies Settings</LinksWrapper>
          </>
        )}
      </PolicyContent>
    </FooterContent>
  )
}
