import styled from 'styled-components'

import { WDS_COLOR_WHITE } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_048_PX, WDS_SIZE_416_PX } from 'common/style/size'
import { Text } from 'components/ui/Text/Text'

export const Container = styled.form`
  ${flex({ direction: 'row' })};
  height: 100vh;
  width: 100%;
`
export const RightSide = styled.img`
  flex: 1;
`

export const LeftSide = styled.div`
  flex: 1;
  background: ${WDS_COLOR_WHITE};
  ${flex({
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: WDS_SIZE_024_PX,
  })};
  padding: ${WDS_SIZE_048_PX};
`

export const InputWrapper = styled.div`
  ${flex({ direction: 'column' })};
  width: ${WDS_SIZE_416_PX};
  position: relative;
`

export const ButtonWrapper = styled.div`
  width: ${WDS_SIZE_416_PX};
`

export const Title = styled(Text).attrs({
  variant: 'titleH1',
})`
  margin-bottom: ${WDS_SIZE_024_PX}
`
