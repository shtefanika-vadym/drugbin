import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import styled from 'styled-components'

export const Content = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  overflow-x: hidden;
  transition: opacity 150ms 300ms ease;
  z-index: 999;
  background-color: rgba(44, 43, 43, 0.3);
`

export const ModalWrapper = styled.nav`
  position: relative;
  min-width: min-content;
  height: auto;
  margin: 0 auto;
  background: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const Page = styled.nav`
  ${flex({ gap: '8px' })};
`

export const PdfContent = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  background-color: white;
  padding: 36px 40px;
  max-height: 700px;
  overflow: scroll;
  min-width: 800px;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Logo = styled.img``

export const Border = styled.div`
  border-bottom: 1px solid #2949a6;
  padding: 8px 0;
`

export const ControlContent = styled.div`
  ${flex({ direction: 'column', gap: '4px' })};
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`

export const SignatureContent = styled.div`
  ${flex({ justifyContent: 'space-between' })};
  text-align: center;
  margin-top: auto;
  padding: 50px 0;
`

export const SignatureWrapper = styled.div`
  ${flex({ direction: 'column', gap: '8px' })};
`

export const Signature = styled.p<{ isBold?: boolean }>`
  ${textVariant('bodyL')};
  ${(props) => props.isBold && `font-weight: bold`};
`

export const DataContent = styled.div`
  ${textVariant('bodyM')};
  margin-left: auto;
`
