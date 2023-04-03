import styled, { css } from 'styled-components'

export const Container = styled.div<{ valid: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 40px;
  border: 1px solid ${(props) => (props.valid ? '#A3A6AD' : 'red')};
  border-radius: 8px;
`

export const StyledInput = styled.input<{ valid: boolean }>`
  background-color: transparent;
  flex-grow: 1;
  padding: 11px 10px;
  border: none;
  outline: none;
  color: ${(props) => (props.valid ? '#000611' : 'red')};
  font-size: 16px;
  caret-color: #a3a6ad;

  ${({ type }) =>
    type === 'number' &&
    css`
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}

  &::placeholder {
    color: #a3a6ad;
  }

  &[disabled] {
    cursor: not-allowed;
  }
`

export const StyledLabel = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #01102e;
`

export const ShowPasswordButton = styled.button.attrs({ type: 'button', tabIndex: -1 })`
  all: unset;
  padding: 0 14px;
  cursor: pointer;
  color: red;
`

export const IconButton = styled.button.attrs({ type: 'button' })`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  cursor: pointer;

  :hover {
    background-color: #aec5f2;
    border-radius: 8px;
  }
`

export const Icon = styled.img``

export const CustomButton = styled.div`
  display: flex;
  border: 1px solid #a3a6ad;
  border-radius: 8px;
  width: 74px;
  height: 40px;
`

export const ContainerWrapper = styled.div`
  max-width: 400px;
  display: flex;
  gap: 8px;
`
