import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_012_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Content = styled.div`
  padding: ${WDS_SIZE_012_PX};
  width: 100%;
  ${flex({
    direction: 'column',
    alignContent: 'center',
    alignItems: 'center',
    gap: WDS_SIZE_012_PX,
  })};
`

export const Icon = styled.img`
  width: 100px;
  height: 100px;
`

export const Description = styled.p`
  ${textVariant('bodyM')};
`
