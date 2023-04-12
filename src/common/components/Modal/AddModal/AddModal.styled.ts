import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_016_PX } from 'common/style/size'

export const ContentAdd = styled.form`
  ${flex({ direction: 'column', alignContent: 'center', justifyContent: 'center' })};
  width: 600px;
`

export const Title = styled.p`
  ${textVariant('titleH5')};
  color: #01102e;
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

export const RadioPosition = styled.div`
  ${flex({ gap: '42px' })};
  padding: 0 0 12px 0;
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: '12px', justifyContent: 'flex-end' })};
  padding: 40px 0 0 0;
`

export const LabelRadio = styled.div`
  ${textVariant('bodyS')};
  padding-top: ${WDS_SIZE_016_PX};
  padding: 40px 0 4px 0;
`
