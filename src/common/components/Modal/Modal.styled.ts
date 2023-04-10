import styled from 'styled-components'

export const ContentModal = styled.div`
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
  pointer-events: auto;
`

export const BackModal = styled.div`
  background-color: #2c2b2b;
  position: absolute;
  opacity: 0.3;
  width: 100vw;
  height: 100vh;
`

export const ModalWrapper = styled.div`
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
`

export const Icon = styled.img``

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 11px;
  top: 12px;
`
