import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import styled from 'styled-components'

export const Page = styled.nav`
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
`

export const PdfContent = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
  padding: 36px 40px;
  max-height: 700px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Logo = styled.img``

export const Border = styled.div`
  border-bottom: 1px solid #2949a6;
  padding: 8px 0;
`
export const Title = styled.h1`
  ${textVariant('titleH4')};
  text-align: center;
  margin-top: 48px;
`

export const Content = styled.p`
  ${textVariant('bodyL')};
`

export const ContentBold = styled.p`
  ${textVariant('bodyL')};
  font-weight: bold;
`

export const Span = styled.span`
  font-weight: bold;
`

export const SignatureWrapper = styled.div`
  ${flex({ direction: 'column', gap: '8px' })};
`

export const SignatureContent = styled.div`
  ${flex({ justifyContent: 'space-between' })};
  text-align: center;
  margin-top: auto;
  padding: 50px 0;
`
export const DataContent = styled.div`
  ${textVariant('bodyM')};
  margin-left: auto;
`
export const ReasonContent = styled.div`
  ${textVariant('bodyM')};
`

export const Test = styled.div`
  ${flex({ gap: '8px' })};
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`

export const ControlContent = styled.div`
  ${flex({ direction: 'column', gap: '4px' })};
`
