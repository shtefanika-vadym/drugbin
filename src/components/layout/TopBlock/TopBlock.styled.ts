import { WDS_COLOR_BLUE_300, WDS_COLOR_BLUE_400, WDS_COLOR_BLUE_700 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_002_PX, WDS_SIZE_009_PX, WDS_SIZE_032_PX } from 'common/styles/size'
import { LogoIcon } from 'components/ui/Icon'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  ${flex({ justifyContent: 'space-between' })};
  max-width: 1285px;
  box-sizing: border-box;
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
export const Navigation = styled.div`
  ${flex({ direction: 'row' })};
  gap: ${WDS_SIZE_032_PX};
`

// export const Logo = styled.img`
//   position: absolute;
//   left: 50%;
//   transform: translate(-50%, 0);
//   ${textVariant('titleH4')};
//   color: ${WDS_COLOR_BLUE_300};
//   cursor: pointer;
// `

export const Logo = styled(LogoIcon)`
  cursor: pointer;
`
