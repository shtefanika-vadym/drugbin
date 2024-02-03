import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_024_PX, WDS_SIZE_224_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`

export const Title = styled.h1`
  ${textVariant('titleH4')};
`

export const InputWrapper = styled.div`
  width: ${WDS_SIZE_224_PX};
`

export const ExpandIcon = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  cursor: pointer;
`
