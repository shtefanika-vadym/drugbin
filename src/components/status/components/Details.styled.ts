import styled from 'styled-components'

import { grid } from 'common/style/mixins/grid.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'

export const ContentDetails = styled.div`
  ${grid({ gridTemplateColumns: '25% 25% 25% 25%', rowGap: '40px' })};
  margin: 0px 0px 42px 0px;
`

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const DetailsTitle = styled.p`
  ${textVariant('subheading')};
  color: #000611;
`
export const DetailsText = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
`

export const DetailsTextPDF = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
  cursor: pointer;

  :hover {
    color: #2949a6;
  }
`
