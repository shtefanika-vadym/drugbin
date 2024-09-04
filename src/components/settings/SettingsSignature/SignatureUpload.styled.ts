import { WDS_COLOR_GREY, WDS_COLOR_GREY_100 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_012_PX } from 'common/styles/size'
import { WDS_TEXT_WEIGHT_MEDIUM } from 'common/styles/typography'
import { Text } from 'components/ui/Text/Text'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center' })}
  border: 1px ${WDS_COLOR_GREY_100} dashed;
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_012_PX};
  box-sizing: border-box;
  cursor: pointer;
  width: 315px;
  height: 175px;
`

export const Title = styled(Text).attrs({
  variant: 'bodyM',
})`
  font-weight: ${WDS_TEXT_WEIGHT_MEDIUM};
  text-align: center;
`

export const Description = styled(Text)`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
`
