import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_040_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_040_PX })}
`
