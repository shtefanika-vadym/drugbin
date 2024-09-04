import { WDS_COLOR_GREY } from 'common/styles/colors'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_024_PX } from 'common/styles/size'
import { Text } from 'components/ui/Text/Text'
import styled from 'styled-components'

export const Title = styled(Text)`
  ${textVariant('titleH4')};
`

export const Description = styled(Text)`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
  margin-bottom: ${WDS_SIZE_024_PX};
`
