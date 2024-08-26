import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_200,
  WDS_COLOR_GREY,
  WDS_COLOR_RED,
  WDS_COLOR_WHITE,
} from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import {
  WDS_SIZE_003_PX,
  WDS_SIZE_004_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_014_PX,
} from 'common/style/size'

import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })}
`

export const StyledInput = styled.div<{ isError: boolean }>`
  ${flex({})};
  color: ${WDS_COLOR_BLACK};
  background-color: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  ${(props) =>
    border({
      color: props.isError ? WDS_COLOR_RED : WDS_COLOR_GREY,
    })};

  &:focus-within {
    outline: ${WDS_COLOR_BLUE_200} solid ${WDS_SIZE_003_PX};
  }
`

export const Input = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  font-size: ${WDS_SIZE_014_PX};
  padding: ${WDS_SIZE_014_PX};
  box-sizing: border-box;

  &::placeholder {
    color: ${WDS_COLOR_GREY};
  }
`

export const StyledLabel = styled.label<{ disabled: boolean }>`
  display: ${({ disabled }) => (disabled ? 'none' : 'unset')};
`

export const ShowPasswordButton = styled.button.attrs({
  type: 'button',
  tabIndex: -1,
})`
  all: unset;
  padding: 0 ${WDS_SIZE_014_PX};
  cursor: pointer;
`
