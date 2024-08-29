import { WDS_COLOR_WHITE } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })}
  background-color: ${WDS_COLOR_WHITE};
  padding: ${WDS_SIZE_024_PX};
  border-radius: ${WDS_SIZE_008_PX};
`

export const Content = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })}
`

export const WrapperBox = styled.div`
  ${flex({ gap: WDS_SIZE_008_PX })}
`

export const DrugContainer = styled.div`
  ${flex({ direction: 'column'})}
`
