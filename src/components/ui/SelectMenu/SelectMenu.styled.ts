import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_GREY,
  WDS_COLOR_GREY_100,
  WDS_COLOR_WHITE,
  WDS_COLOR_WHITE_100,
} from 'common/styles/colors'
import { border } from 'common/styles/mixins/border.mixin'
import { ellipsis } from 'common/styles/mixins/elipsis.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_001_PX,
  WDS_SIZE_004_PX,
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_036_PX,
  WDS_SIZE_224_PX,
} from 'common/styles/size'
import { WDS_Z_INDEX_DROPDOWN } from 'common/styles/tokens/layers'
import styled from 'styled-components'

/** Shared height for compact toolbar / footer controls — matches the segmented control. */
export const SELECT_MENU_HEIGHT = WDS_SIZE_036_PX

export const Root = styled.div`
  position: relative;
  display: inline-flex;
`

export const Trigger = styled.button<{ $open: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'space-between', gap: WDS_SIZE_006_PX })};
  ${textVariant('bodyXS')};
  width: 100%;
  height: ${SELECT_MENU_HEIGHT};
  cursor: pointer;
  padding: 0 ${WDS_SIZE_010_PX};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_WHITE};
  color: ${WDS_COLOR_BLACK};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${WDS_COLOR_GREY};
  }
  ${({ $open }) => $open && `border-color: ${WDS_COLOR_BLUE_300};`}

  & > span {
    ${ellipsis({ webkitLineClamp: 1, whiteSpace: 'nowrap' })};
  }

  & > svg {
    flex: none;
    width: ${WDS_SIZE_012_PX};
    height: ${WDS_SIZE_012_PX};
    color: ${WDS_COLOR_GREY};
    transition: transform 0.15s ease;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }

  @media (prefers-reduced-motion: reduce) {
    & > svg {
      transition: none;
    }
  }
`

export const Popover = styled.ul<{ $align: 'left' | 'right' }>`
  position: absolute;
  top: calc(100% + ${WDS_SIZE_004_PX});
  ${({ $align }) => ($align === 'right' ? 'right: 0;' : 'left: 0;')}
  z-index: ${WDS_Z_INDEX_DROPDOWN};
  min-width: 100%;
  max-height: ${WDS_SIZE_224_PX};
  overflow-y: auto;
  margin: 0;
  padding: ${WDS_SIZE_004_PX};
  list-style: none;
  background: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  ${border({ width: WDS_SIZE_001_PX, type: 'solid', color: WDS_COLOR_GREY_100 })};
  box-shadow: 0 6px 20px -8px rgba(1, 22, 64, 0.25);
`

export const Option = styled.li<{ $selected: boolean; $active: boolean }>`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_006_PX })};
  ${textVariant('bodyXS')};
  white-space: nowrap;
  cursor: pointer;
  padding: ${WDS_SIZE_006_PX} ${WDS_SIZE_008_PX};
  border-radius: ${WDS_SIZE_006_PX};
  color: ${({ $selected }) => ($selected ? WDS_COLOR_BLUE_300 : WDS_COLOR_BLACK)};
  background: ${({ $active }) => ($active ? WDS_COLOR_WHITE_100 : 'transparent')};

  &:hover {
    background: ${WDS_COLOR_WHITE_100};
  }

  & > svg {
    flex: none;
    width: ${WDS_SIZE_012_PX};
    height: ${WDS_SIZE_012_PX};
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  }
`
