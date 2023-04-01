import styled from 'styled-components'

import { WDS_COLOR_BLUE_300, WDS_COLOR_GREY } from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_028_PX } from 'common/style/size'

export const Container = styled.div`
  ${flex}
  gap: 0 ${WDS_SIZE_008_PX};
`

export const RadioInput = styled.input`
  all: unset;
  appearance: none;
  height: ${WDS_SIZE_028_PX};
  width: ${WDS_SIZE_028_PX};
  border-radius: 100%;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: inset 0px 1px 2px 1px rgba(38, 39, 40, 0.2);
  ${border({ type: 'solid', color: WDS_COLOR_GREY })}

  &:checked {
    ${border({ width: WDS_SIZE_008_PX, type: 'solid', color: WDS_COLOR_BLUE_300 })}
  }
`

export const RadioLabel = styled.label`
  flex-grow: 1;
  cursor: pointer;
`
