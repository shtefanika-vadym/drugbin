import { WDS_COLOR_GREY } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_016_PX } from 'common/styles/size'
import styled from 'styled-components'
import { Text } from 'components/ui/Text/Text'

export const Body = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
`

export const Description = styled(Text).attrs({ variant: 'bodyS', color: WDS_COLOR_GREY })`
  margin-top: -${WDS_SIZE_008_PX};
`

export const Actions = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX, justifyContent: 'flex-end' })};
  margin-top: ${WDS_SIZE_008_PX};
`
