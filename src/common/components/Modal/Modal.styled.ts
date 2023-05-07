import styled from 'styled-components'

import { WDS_BREAKPOINT_TABLET_UP_TO } from 'common/constants/breakpoint'

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

export const ModalWrapper = styled.nav`
  position: relative;
  min-width: min-content;
  height: auto;
  margin: 0 auto;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 36px 40px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;

  @media (max-width: ${WDS_BREAKPOINT_TABLET_UP_TO}) {
    padding: 24px 16px;
    margin: 0 16px;
  }
`

export const Icon = styled.img``

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 11px;
  top: 12px;
`
