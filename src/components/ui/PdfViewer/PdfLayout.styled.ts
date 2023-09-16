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
