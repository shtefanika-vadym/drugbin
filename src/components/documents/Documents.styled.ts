import styled from 'styled-components'

import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_016_PX, WDS_SIZE_024_PX } from 'common/styles/size'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
`

export const Title = styled.p`
  ${textVariant('titleH4')};
  margin-bottom: ${WDS_SIZE_024_PX};
`
export const TopContainer = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
`

export const TableHeader = styled.thead`
  display: block;
`

export const TableBody = styled.tbody`
  display: block;
`