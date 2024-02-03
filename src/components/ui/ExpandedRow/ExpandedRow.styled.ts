import { WDS_COLOR_BLUE_100, WDS_COLOR_BLUE_400, WDS_COLOR_WHITE } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import {
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_024_PX,
} from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${WDS_COLOR_BLUE_100};
  padding: ${WDS_SIZE_024_PX};
`

export const Content = styled.div`
  background-color: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_024_PX};
`

export const Text = styled.h1<{ top?: number }>`
  padding-top: ${({ top }) => top && `${top}px`};
  padding-bottom: ${WDS_SIZE_006_PX};
  color: ${WDS_COLOR_BLUE_400};
  ${textVariant('bodyM')};
  font-weight: bold;
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_012_PX })};
`
