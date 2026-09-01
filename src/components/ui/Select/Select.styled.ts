import { WDS_COLOR_BLACK, WDS_COLOR_BLUE_200, WDS_COLOR_GREY, WDS_COLOR_WHITE } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { border } from 'common/styles/mixins/border.mixin'
import { WDS_SIZE_003_PX, WDS_SIZE_004_PX, WDS_SIZE_008_PX, WDS_SIZE_014_PX, WDS_SIZE_032_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
  width: 100%;
`

export const StyledSelect = styled.select<{ isError?: boolean }>`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_BLACK};
  background-color: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_014_PX};
  padding-right: ${WDS_SIZE_032_PX};
  ${({ isError }) => border({ color: isError ? 'red' : WDS_COLOR_GREY })};

  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, ${WDS_COLOR_GREY} 50%),
    linear-gradient(135deg, ${WDS_COLOR_GREY} 50%, transparent 50%);
  background-position: calc(100% - 18px) 55%, calc(100% - 13px) 55%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;

  &:focus {
    outline: ${WDS_COLOR_BLUE_200} solid ${WDS_SIZE_003_PX};
  }
`
