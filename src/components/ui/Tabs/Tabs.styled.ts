import { WDS_COLOR_BLUE_100, WDS_COLOR_BLUE_300, WDS_COLOR_GREY } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_003_PX, WDS_SIZE_012_PX, WDS_SIZE_014_PX } from 'common/styles/size'
import styled from 'styled-components'

/** Same visual language as components/ui/NavigateList, but controlled (no routing). */

export const Bar = styled.div`
  ${flex({ gap: WDS_SIZE_014_PX })};
  border-bottom: 1px solid ${WDS_COLOR_BLUE_100};
`

export const TabButton = styled.button<{ isActive: boolean }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${textVariant('subheading')};
  padding: ${WDS_SIZE_003_PX} ${WDS_SIZE_012_PX};
  margin-bottom: -1px;
  border-bottom: ${WDS_SIZE_003_PX} solid
    ${({ isActive }) => (isActive ? WDS_COLOR_BLUE_300 : 'transparent')};
  color: ${({ isActive }) => (isActive ? WDS_COLOR_BLUE_300 : WDS_COLOR_GREY)};
`
