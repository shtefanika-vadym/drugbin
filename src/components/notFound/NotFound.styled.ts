import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_012_PX, WDS_SIZE_048_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_048_PX })}
  padding: ${WDS_SIZE_048_PX};
`

export const Content = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_012_PX, justifyContent: 'center' })}
`

export const Image = styled.img``
