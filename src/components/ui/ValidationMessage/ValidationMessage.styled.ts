import { WDS_COLOR_RED } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_004_PX, WDS_SIZE_006_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_006_PX })};
  ${textVariant('bodyXS')};
  padding-top: ${WDS_SIZE_004_PX};
  color: ${WDS_COLOR_RED};
`
