import styled from 'styled-components'

import {
  WDS_COLOR_BLUE_100,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_400,
  WDS_COLOR_BLUE_700,
  WDS_COLOR_WHITE,
} from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import {
  WDS_SIZE_022_PX,
  WDS_SIZE_009_PX,
  WDS_SIZE_002_PX,
  WDS_SIZE_032_PX,
  WDS_SIZE_080_PX,
  WDS_SIZE_040_PX,
} from 'common/style/size'

export const ContainerWrapper = styled.div`
  background: ${WDS_COLOR_WHITE};
  border-bottom: 1px solid ${WDS_COLOR_BLUE_100};
  padding: ${WDS_SIZE_022_PX} ${WDS_SIZE_080_PX};
`

export const Container = styled.div`
  ${flex({ direction: 'row', alignItems: 'center', justifyContent: 'space-between' })}
  position: relative;
  max-width: 100rem;
  margin: 0px auto;
`

export const Navigation = styled.div`
  ${flex({ direction: 'row' })}
  gap: ${WDS_SIZE_032_PX};
`

export const NavLink = styled.div<{ isActive: boolean }>`
  ${flex({ direction: 'column', alignItems: 'center' })};
  ${textVariant('subheading')};
  color: ${({ isActive }) => (isActive ? WDS_COLOR_BLUE_700 : WDS_COLOR_BLUE_400)};
  position: relative;
  padding-bottom: ${WDS_SIZE_002_PX};
  cursor: pointer;
`

export const Dot = styled.div<{ isActive: boolean }>`
  width: ${WDS_SIZE_009_PX};
  height: ${WDS_SIZE_009_PX};
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? WDS_COLOR_BLUE_300 : 'transparent')};
`

export const Logo = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  ${textVariant('titleH4')};
  color: ${WDS_COLOR_BLUE_300};
  cursor: pointer;
`

export const UserIcon = styled.img`
  width: ${WDS_SIZE_040_PX};
  height: ${WDS_SIZE_040_PX};
`

export const Content = styled.div`
  ${flex({ justifyContent: 'center' })};
  padding: ${WDS_SIZE_040_PX} ${WDS_SIZE_080_PX};
`
