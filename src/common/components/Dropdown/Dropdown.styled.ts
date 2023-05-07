import styled from 'styled-components'

import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_700,
  WDS_COLOR_GREY,
  WDS_COLOR_WHITE,
} from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import {
  WDS_SIZE_003_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_020_PX,
  WDS_SIZE_040_PX,
  WDS_SIZE_224_PX,
  WDS_SIZE_400_PX,
} from 'common/style/size'

export const Container = styled.div`
  max-width: ${WDS_SIZE_400_PX};
  cursor: pointer;
`

export const Label = styled.div`
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_BLUE_700};
`

export const DropdownWrapper = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })};
  ${border({ type: 'solid', color: WDS_COLOR_GREY })};
  ${textVariant('bodyS')};
  position: relative;
  color: ${WDS_COLOR_BLACK};
  height: ${WDS_SIZE_040_PX};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_010_PX};
  background-color: white;
`

export const DropdownList = styled.div`
  position: relative;
  top: ${WDS_SIZE_003_PX};
  max-height: ${WDS_SIZE_224_PX};
  padding: ${WDS_SIZE_010_PX};
  background: ${WDS_COLOR_WHITE};
  ${border({ type: 'solid', color: WDS_COLOR_GREY })};
  border-radius: ${WDS_SIZE_008_PX};
`

export const Select = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_020_PX })};
`
export const Option = styled.option<{ isActive: boolean }>`
  cursor: pointer;
  ${({ isActive }) => (isActive ? textVariant('subheading') : textVariant('bodyM'))};
  color: ${({ isActive }) => (isActive ? WDS_COLOR_BLUE_300 : WDS_COLOR_BLACK)};

  :hover {
    color: ${WDS_COLOR_BLUE_300};
  }
`

export const Icon = styled.img``
