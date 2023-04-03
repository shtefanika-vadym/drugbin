import styled from 'styled-components'

import { WDS_COLOR_BLACK, WDS_COLOR_GREY } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const NameWrapper = styled.div`
  ${flex({ direction: 'column', gap: '4px' })};
  ${textVariant('subheading')};
  color: ${WDS_COLOR_BLACK};
`

export const SubtitleWrapper = styled.p`
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_GREY};
  margin: 0;
`
