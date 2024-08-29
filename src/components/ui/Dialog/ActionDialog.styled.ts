import { flex } from 'common/styles/mixins/flex.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_056_PX,
} from 'common/styles/size'
import styled from 'styled-components'
import { Text } from '../Text/Text'
import { WDS_COLOR_GREY } from 'common/styles/colors'

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_024_PX })}
`

export const BoxIcon = styled.div<{ color: string }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: ${WDS_SIZE_056_PX};
  height: ${WDS_SIZE_056_PX};
  background: ${({ color }) => color};
  border-radius: ${WDS_SIZE_008_PX};
`

export const RightSection = styled.div`
  display: block;
`

export const LeftSection = styled(RightSection)``

export const Description = styled(Text).attrs({
  variant: 'bodyXS',
  color: WDS_COLOR_GREY,
})`
  padding-top: ${WDS_SIZE_008_PX};
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })};
  margin-top: ${WDS_SIZE_024_PX};
`
