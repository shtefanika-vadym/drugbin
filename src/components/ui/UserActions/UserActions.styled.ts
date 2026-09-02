import styled from 'styled-components'

import {
  WDS_COLOR_BLUE_100,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_700,
  WDS_COLOR_GREY,
  WDS_COLOR_RED,
  WDS_COLOR_RED_100,
  WDS_COLOR_WHITE,
} from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_002_PX,
  WDS_SIZE_004_PX,
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_012_PX,
} from 'common/styles/size'

const LINE = '#EEF0F4'

export const Container = styled.div`
  position: relative;
`

export const TriggerLabel = styled.span`
  ${textVariant('bodyS')};
  font-weight: 600;
  color: ${WDS_COLOR_BLUE_700};
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Chevron = styled.span<{ open: boolean }>`
  ${flex({ alignItems: 'center' })};
  color: ${WDS_COLOR_GREY};
  transition: transform 0.18s ease;
  transform: rotate(${({ open }) => (open ? '180deg' : '0deg')});
`

export const Menu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + ${WDS_SIZE_008_PX});
  z-index: 30;
  width: 264px;
  padding: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_WHITE};
  border: 1px solid ${LINE};
  border-radius: ${WDS_SIZE_012_PX};
  box-shadow: 0px 2px 8px rgba(1, 16, 46, 0.06), 0px 14px 34px rgba(1, 16, 46, 0.13);
  ${flex({ direction: 'column' })};
`

export const IdentityCard = styled.div`
  ${flex({ gap: WDS_SIZE_012_PX })};
  padding: ${WDS_SIZE_010_PX} ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX};
`

export const Avatar = styled.span<{ size: number }>`
  flex: none;
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 999px;
  background: ${WDS_COLOR_BLUE_100};
  color: ${WDS_COLOR_BLUE_300};
  font-weight: 700;
  font-size: ${({ size }) => Math.round(size * 0.4)}px;
  line-height: 1;
`

export const IdentityMeta = styled.div`
  flex: 1;
  min-width: 0;
`

export const IdentityTop = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX })};
`

export const IdentityName = styled.span`
  ${textVariant('bodyS')};
  font-weight: 700;
  color: ${WDS_COLOR_BLUE_700};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const RolePill = styled.span`
  flex: none;
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${WDS_COLOR_BLUE_300};
  background: ${WDS_COLOR_BLUE_100};
  border-radius: ${WDS_SIZE_004_PX};
  padding: ${WDS_SIZE_002_PX} ${WDS_SIZE_006_PX};
`

export const IdentityEmail = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_006_PX })};
  min-width: 0;
  margin-top: ${WDS_SIZE_002_PX};
  font-size: 12px;
  font-weight: 500;
  color: ${WDS_COLOR_GREY};
`

export const EmailText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CopyButton = styled.button`
  all: unset;
  flex: none;
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  cursor: pointer;
  color: ${WDS_COLOR_GREY};
  border-radius: ${WDS_SIZE_004_PX};
  padding: ${WDS_SIZE_002_PX};

  &:hover {
    background: ${WDS_COLOR_BLUE_100};
    color: ${WDS_COLOR_BLUE_300};
  }
  &:focus-visible {
    outline: solid 1px ${WDS_COLOR_BLUE_300};
  }
`

export const GroupLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${WDS_COLOR_GREY};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_010_PX} ${WDS_SIZE_004_PX};
`

export const Separator = styled.div`
  height: 1px;
  margin: ${WDS_SIZE_006_PX} 0;
  background: ${LINE};
`

export const MenuItem = styled.button<{ danger?: boolean }>`
  all: unset;
  ${flex({ alignItems: 'center', gap: WDS_SIZE_010_PX })};
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_010_PX};
  ${textVariant('bodyS')};
  color: ${({ danger }) => (danger ? WDS_COLOR_RED : WDS_COLOR_BLUE_700)};

  svg {
    flex: none;
    color: ${({ danger }) => (danger ? WDS_COLOR_RED : WDS_COLOR_GREY)};
  }

  &:hover,
  &:focus-visible {
    outline: none;
    background: ${({ danger }) => (danger ? WDS_COLOR_RED_100 : WDS_COLOR_BLUE_100)};
  }
`
