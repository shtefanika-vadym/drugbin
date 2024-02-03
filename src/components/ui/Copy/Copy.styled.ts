import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/style/colors'
import { textClamp } from 'common/style/mixins/textClamp.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_072_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  display: inline-flex;
`

export const Text = styled.p`
  ${textVariant('bodyS')};
  ${textClamp(1)};
  color: ${WDS_COLOR_GREY};
  width: ${WDS_SIZE_072_PX};
  cursor: pointer;
  margin: 0;

  :hover {
    color: ${WDS_COLOR_BLUE_400};
  }
`
