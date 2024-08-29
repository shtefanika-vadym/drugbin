import styled from 'styled-components'

export const Container = styled.div`
  display: inline-flex;
  cursor: pointer;

  &:hover .copy-icon {
    opacity: 1;
  }
`

export const IconWrapper = styled.div`
  display: inline-flex;
  opacity: 0;
`