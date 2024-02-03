import styled from 'styled-components'

import { WDS_COLOR_BLUE_400, WDS_COLOR_RED, WDS_COLOR_WHITE } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_048_PX } from 'common/style/size'

export const ContentLogin = styled.form`
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
  ${flex({ direction: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' })};
  padding: ${WDS_SIZE_048_PX};
`

export const Error = styled.p`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_RED};
`

export const InputWrapper = styled.div`
  ${flex({ direction: 'column' })};
  width: 400px;
  position: relative;
`

export const Forgot = styled.div`
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_BLUE_400};
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 0;
`

export const Title = styled.p`
  ${textVariant('titleH1')};
`

export const ButtonWrapper = styled.div`
  width: 400px;
  ${flex({ direction: 'column', alignItems: 'center', gap: '24px' })}
`

export const NewAccount = styled.p`
  ${textVariant('bodyS')};
`

export const Span = styled.span`
  color: ${WDS_COLOR_BLUE_400};
  text-decoration-line: underline;
  cursor: pointer;
`
