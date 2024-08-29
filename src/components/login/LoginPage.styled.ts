import styled from 'styled-components'

import { WDS_COLOR_WHITE } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_048_PX, WDS_SIZE_416_PX } from 'common/styles/size'
import { Text } from 'components/ui/Text/Text'

export const Container = styled.form`
  ${flex({ direction: 'row' })};
  height: 100vh;
  width: 100%;
`
export const RightSide = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`

export const LeftSide = styled.div`
  flex: 1;
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  background: ${WDS_COLOR_WHITE};
  padding: ${WDS_SIZE_048_PX};
  box-sizing: border-box;
`

export const FormWrapper = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
  max-width: ${WDS_SIZE_416_PX};
  width: 100%;
`

export const InputWrapper = styled.div`
  ${flex({ direction: 'column' })};
  width: ${WDS_SIZE_416_PX};
  position: relative;
`

export const ButtonWrapper = styled.div`
  width: 100%;
`

export const Title = styled(Text).attrs({
  variant: 'titleH1',
})`
  margin-bottom: ${WDS_SIZE_024_PX};
  text-align: center;
`
