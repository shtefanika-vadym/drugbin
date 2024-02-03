import styled from 'styled-components'

import { WDS_COLOR_BLACK, WDS_COLOR_GREY } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import type { TextVariantType } from 'common/style/mixins/typography.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { textClamp } from 'common/style/mixins/textClamp.mixin'
import { WDS_SIZE_072_PX } from 'common/style/size'

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

export const IdText = styled(SubtitleWrapper)`
  width: ${WDS_SIZE_072_PX};
  ${textClamp(1)};
  cursor: pointer;

  :hover {
    border-radius: 4px;
    background-color: #f3f4f9;
  }
`

export const Text = styled.p<{ variant: TextVariantType; color?: string }>`
  ${({ variant }) => textVariant(variant)}
  color: ${({ color }) => (color ? color : WDS_COLOR_BLACK)};
`
