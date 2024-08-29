import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_016_PX, WDS_SIZE_032_PX } from 'common/styles/size'
import styled from 'styled-components'
import { Text } from '../Text/Text'

export const Container = styled.div`
  ${flex({ direction: 'column' })};
`

export const Description = styled(Text).attrs({
  variant: 'bodyXS',
  color: WDS_COLOR_GREY,
})`
  padding-top: ${WDS_SIZE_008_PX};
`

export const DateSpan = styled.span`
  color: ${WDS_COLOR_BLUE_400};
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })};
  margin-top: ${WDS_SIZE_032_PX};
`

export const RangePickerContainer = styled.div`
  display: block;
  margin-top: ${WDS_SIZE_016_PX};
`
