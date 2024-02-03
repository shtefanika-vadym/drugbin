import styled from 'styled-components'

import { WDS_COLOR_BLUE_700 } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_016_PX } from 'common/style/size'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: '8px', alignItems: 'center' })};
`

export const Title = styled.p`
  max-width: 350px;
  ${textVariant('titleH5')};
  color: ${WDS_COLOR_BLUE_700};
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX, justifyContent: 'center' })};
  margin-top: 24px;
`

export const Description = styled.div`
  max-width: 350px;
  margin-left: 72px;
`

export const Text = styled.p`
  ${textVariant('bodyS')};
  color: #a3a6ad;
`

export const BoxIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(33, 150, 83, 0.2);
  border-radius: 8px;
`
export const TitleBox = styled.div`
  ${flex({ gap: '16px', justifyContent: 'center' })};
`
