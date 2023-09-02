import styled, { css } from 'styled-components'

import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_200,
  WDS_COLOR_BLUE_700,
  WDS_COLOR_GREY,
  WDS_COLOR_RED,
} from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_037_PX,
  WDS_SIZE_040_PX,
  WDS_SIZE_074_PX,
  WDS_SIZE_400_PX,
} from 'common/style/size'

export const Container = styled.div<{ valid: boolean }>`
  width: 100%;
  height: ${WDS_SIZE_040_PX};
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  border: 1px solid ${(props) => (props.valid ? WDS_COLOR_GREY : WDS_COLOR_RED)};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_010_PX};
  background-color: white;
`

export const StyledInput = styled.input<{ valid: boolean }>`
  border: none;
  outline: none;
  background-color: transparent;
  flex-grow: 1;
  color: ${(props) => (props.valid ? WDS_COLOR_BLACK : WDS_COLOR_RED)};
  caret-color: ${WDS_COLOR_GREY};
  font-size: ${WDS_SIZE_016_PX};

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
    color: ${WDS_COLOR_GREY};
  }

  &[disabled] {
    cursor: not-allowed;
  }
`

export const StyledLabel = styled.label`
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_BLUE_700};
`

export const ShowPasswordButton = styled.button.attrs({ type: 'button', tabIndex: -1 })`
  all: unset;
  color: ${WDS_COLOR_RED};
  cursor: pointer;
`

export const IconButton = styled.button.attrs({ type: 'button' })`
  all: unset;
  width: ${WDS_SIZE_037_PX};
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  cursor: pointer;

  :hover {
    background-color: ${WDS_COLOR_BLUE_200};
    border-radius: ${WDS_SIZE_008_PX};
  }
`

export const Icon = styled.img``

export const CustomButton = styled.div`
  ${flex};
  ${border({ type: 'solid', color: WDS_COLOR_GREY })};
  border-radius: ${WDS_SIZE_008_PX};
  width: ${WDS_SIZE_074_PX};
  height: ${WDS_SIZE_040_PX};
`

export const ContainerWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_008_PX })};
  max-width: ${WDS_SIZE_400_PX};
`
