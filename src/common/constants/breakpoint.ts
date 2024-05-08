import { remToPxVal } from 'common/style/cssHelpers'
import type { Dictionary } from 'common/types/utils.types'

export const WDS_BREAKPOINT_MOBILE = '20rem'; // from 320 px
export const WDS_BREAKPOINT_MOBILE_UP_TO = '39.9375rem'; // less than 640 px
export const WDS_BREAKPOINT_TABLET = '40rem'; // from 640 px
export const WDS_BREAKPOINT_TABLET_UP_TO = '63.9375rem'; // less than 1024 px
export const WDS_BREAKPOINT_DESKTOP_S = '64rem'; // from 1024 px
export const WDS_BREAKPOINT_DESKTOP_S_UP_TO = '89.9375rem'; // less than 1440 px
export const WDS_BREAKPOINT_DESKTOP_LARGE = '75rem'; // from 1200 px
export const WDS_BREAKPOINT_DESKTOP_M = '90rem'; // from 1440 px
export const WDS_BREAKPOINT_DESKTOP_M_UP_TO = '119.9375rem'; // less than 1920 px
export const WDS_BREAKPOINT_DESKTOP_L = '120rem'; // from 1920 px
export const WDS_BREAKPOINT_HEIGHT_TABLET_UP_TO = '55rem'; // from 880px;

export const PIXEL_BREAKPOINT_VALUES: Dictionary<number> = {
  MOBILE: remToPxVal(WDS_BREAKPOINT_MOBILE),
  MOBILE_UP_TO: remToPxVal(WDS_BREAKPOINT_MOBILE_UP_TO),
  TABLET: remToPxVal(WDS_BREAKPOINT_TABLET),
  TABLET_UP_TO: remToPxVal(WDS_BREAKPOINT_TABLET_UP_TO),
  DESKTOP_S: remToPxVal(WDS_BREAKPOINT_DESKTOP_S),
  DESKTOP_S_UP_TO: remToPxVal(WDS_BREAKPOINT_DESKTOP_S_UP_TO),
  DESKTOP_M: remToPxVal(WDS_BREAKPOINT_DESKTOP_M),
  DESKTOP_M_UP_TO: remToPxVal(WDS_BREAKPOINT_DESKTOP_M_UP_TO),
  DESKTOP_L: remToPxVal(WDS_BREAKPOINT_DESKTOP_L),
}
