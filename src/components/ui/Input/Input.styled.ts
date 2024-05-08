
import { WDS_COLOR_BLACK, WDS_COLOR_GREY, WDS_COLOR_WHITE } from 'common/style/colors'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_010_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const StyledInput = styled.input<{ valid: boolean }>`
  all: unset;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${WDS_COLOR_GREY};
  background-color: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_010_PX};
  color: ${WDS_COLOR_BLACK};
  ${textVariant('bodyS')};

  ::placeholder {
    ${textVariant('bodyXS')};
  }
`
