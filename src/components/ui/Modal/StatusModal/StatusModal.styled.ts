import { Button } from 'components/ui/Button/Button'
import styled from 'styled-components'

import { WDS_COLOR_GREY } from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import {
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_040_PX,
  WDS_SIZE_056_PX,
  WDS_SIZE_350_PX,
} from 'common/style/size'

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_024_PX })};
`

export const Content = styled.div`
  width: ${WDS_SIZE_350_PX};
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })};
`

export const ButtonWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX, justifyContent: 'center' })};
  margin-top: ${WDS_SIZE_024_PX};
`

export const BoxIcon = styled.div<{ color: string }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: ${WDS_SIZE_056_PX};
  height: ${WDS_SIZE_056_PX};
  background: ${({ color }) => color};
  border-radius: ${WDS_SIZE_008_PX};
`

export const WeightWrapper = styled.div`
  ${flex({ gap: WDS_SIZE_012_PX, alignItems: 'end' })};
`

export const UnitButton = styled(Button).attrs({
  variant: 'secondary',
})<{ isActive: boolean }>`
  width: ${WDS_SIZE_040_PX};
  height: ${WDS_SIZE_040_PX};
  border: ${({ isActive }) => !isActive && `1px solid ${WDS_COLOR_GREY}`};
  color: ${({ isActive }) => !isActive && WDS_COLOR_GREY};
  font-weight: ${({ isActive }) => !isActive && 900};
`
