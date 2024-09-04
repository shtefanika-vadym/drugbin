import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_416_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.form`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
  max-width: ${WDS_SIZE_416_PX};
`
