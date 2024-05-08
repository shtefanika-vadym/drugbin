import { WDS_COLOR_BLUE_100 } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_016_PX, WDS_SIZE_024_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column' })};
  border-bottom: 1px solid ${WDS_COLOR_BLUE_100};
`

export const ActionContainer = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })}
`
export const ExpandedContainer = styled.div`
  background-color: ${WDS_COLOR_BLUE_100};
  margin: ${WDS_SIZE_008_PX} ${WDS_SIZE_024_PX};
  padding: ${WDS_SIZE_024_PX};
`
