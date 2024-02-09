import styled from 'styled-components'

import { WDS_BREAKPOINT_TABLET_UP_TO } from 'common/constants/breakpoint'
import { flex } from 'common/style/mixins/flex.mixin'

export const ContentModal = styled.nav`
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

export const ModalWrapper = styled.nav<{ type: string }>`
  position: relative;
  min-width: min-content;
  height: auto;
  margin: 0 auto;
  background: ${(props) => (props.type === 'pdf' ? 'transparent' : 'white')};
  box-shadow: ${(props) => props.type !== 'pdf' && '0 4px 15px rgba(0, 0, 0, 0.08)'};
  border-radius: 10px;
  padding: ${(props) => props.type !== 'pdf' && '36px 40px'};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: ${(props) => (props.type === 'pdf' ? 'row' : 'column')};

  @media (max-width: ${WDS_BREAKPOINT_TABLET_UP_TO}) {
    padding: 36px 40px;
    margin: 0 16px;
  }
`

export const Icon = styled.img``

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 14px;
`

export const ContentPdf = styled.nav`
  position: relative;
  min-width: min-content;
  height: auto;
  margin: 0 auto;
  background-color: transparent;
  ${flex({ gap: '4px' })};
`

export const PdfButton = styled.div`
  ${flex({ gap: '4px', justifyContent: 'flex-end' })};
  margin-bottom: 8px;
`
