import { useCallback, useEffect, useState } from 'react'

import { useWindowSize } from 'usehooks-ts'

import { PIXEL_BREAKPOINT_VALUES } from 'common/constants/breakpoint'

export interface Breakpoints {
  isMobile: boolean
  isTablet: boolean
  isTabletUp: boolean
  isDesktop: boolean
  isDesktopSmall: boolean
  isDesktopMedium: boolean
  isDesktopMediumUp: boolean
  isDesktopLarge: boolean
  isBelowDesktop: boolean
}

const { MOBILE_UP_TO, TABLET_UP_TO, DESKTOP_S_UP_TO, DESKTOP_M_UP_TO } = PIXEL_BREAKPOINT_VALUES

const getBreakpointValues = (width: number): Breakpoints => ({
  isMobile: width > 0 && width <= MOBILE_UP_TO, // up to 640
  isTablet: width > MOBILE_UP_TO && width <= TABLET_UP_TO, // 640 - 1024
  isTabletUp: width > MOBILE_UP_TO, // 640+
  isDesktop: width > TABLET_UP_TO, // 1024+
  isDesktopSmall: width > TABLET_UP_TO && width <= DESKTOP_S_UP_TO, // 1024 - 1440
  isDesktopMedium: width > DESKTOP_S_UP_TO && width <= DESKTOP_M_UP_TO, // 1440 - 1920
  isDesktopMediumUp: width > DESKTOP_S_UP_TO, // 1440 - 1920
  isDesktopLarge: width > DESKTOP_M_UP_TO, // 1920+
  isBelowDesktop: width > 0 && width < TABLET_UP_TO, // less than 1024
})

const useBreakpoints = (): Breakpoints => {
  const { width } = useWindowSize()
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(getBreakpointValues(width))
  const updateBreakpoints = useCallback(() => setBreakpoints(getBreakpointValues(width)), [width])
  useEffect(() => {
    updateBreakpoints()
  }, [width, updateBreakpoints])

  return breakpoints
}

export default useBreakpoints
