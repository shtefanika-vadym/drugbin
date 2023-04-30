import styled from 'styled-components'

import { WDS_BREAKPOINT_TABLET_UP_TO } from 'common/constants/breakpoint'
import { WDS_COLOR_WHITE } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { grid } from 'common/style/mixins/grid.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const ContactWrapper = styled.div`
  width: 100%;
  ${grid({ gridTemplateColumns: '1fr 1fr' })};
  align-items: center;
  background-color: ${WDS_COLOR_WHITE};
  padding: 32px 78px;

  @media (max-width: ${WDS_BREAKPOINT_TABLET_UP_TO}) {
    ${grid({ gridTemplateColumns: '1fr', rowGap: '32px' })};
    padding: 32px 16px;
  }
`

export const Title = styled.h1`
  ${textVariant('titleH1')};
  padding: 0 0 40px 0;
`

export const SubTitle = styled.h1`
  ${textVariant('bodyM')};
`

export const ContactDetails = styled.div`
  ${flex({ gap: '16px' })}
`

export const Icon = styled.img``

export const LeftSide = styled.div`
  ${flex({ direction: 'column', gap: '16px' })}
`
export const RightSide = styled.div`
  ${flex({ direction: 'column', gap: '24px' })}
`
