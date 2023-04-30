import styled from 'styled-components'

import { WDS_BREAKPOINT_MOBILE_UP_TO } from 'common/constants/breakpoint'
import { WDS_COLOR_WHITE, WDS_COLOR_WHITE_100 } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const RecycleWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px', alignItems: 'center' })};
  width: 100%;
  padding: 24px 16px;
  background-color: #2949a6;
  text-align: center;
`
export const Title = styled.h1`
  ${textVariant('titleH1')};
  max-width: 768px;
  color: ${WDS_COLOR_WHITE};

  @media (max-width: ${WDS_BREAKPOINT_MOBILE_UP_TO}) {
    ${textVariant('titleH3')};
  }
`
export const SubTitle = styled.p`
  max-width: 768px;
  ${textVariant('bodyL')};
  color: ${WDS_COLOR_WHITE_100};

  @media (max-width: ${WDS_BREAKPOINT_MOBILE_UP_TO}) {
    ${textVariant('bodyM')};
  }
`
