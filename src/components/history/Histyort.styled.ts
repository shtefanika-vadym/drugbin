import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_016_PX, WDS_SIZE_040_PX } from 'common/style/size'
import styled from 'styled-components'

export const TitleWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })};
`

export const Title = styled.p`
  ${textVariant('titleH4')};
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
