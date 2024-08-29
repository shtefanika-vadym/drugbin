import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_040_PX,
} from 'common/styles/size'
import styled from 'styled-components'

export const Content = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  margin-bottom: 16px;
`

export const TitleWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })};
  height: 40px;
`

export const Title = styled.p`
  ${textVariant('titleH4')};
`

export const SearchWrapper = styled.div`
  ${flex({ alignContent: 'center', gap: WDS_SIZE_012_PX })};
`

export const InputWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_008_PX })}
`

export const BoxWrapper = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })}
`

export const TableWrapper = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  margin-top: ${WDS_SIZE_040_PX};
`
