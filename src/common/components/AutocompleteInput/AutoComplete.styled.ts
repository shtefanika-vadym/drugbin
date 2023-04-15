import styled from 'styled-components'

import {
  WDS_COLOR_BLACK,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_700,
  WDS_COLOR_GREY,
} from 'common/style/colors'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_016_PX, WDS_SIZE_024_PX } from 'common/style/size'
import { WDS_TEXT_FAMILY_BASE, WDS_TEXT_WEIGHT_REGULAR } from 'common/style/typography'

export const customStyles = {
  control: () => ({
    maxWidth: 400,
    height: 40,
    cursor: 'pointer',
    borderRadius: '8px',
    border: `1px solid ${WDS_COLOR_GREY}`,
    display: 'flex',
    boxShadow: 'none',
  }),
  option: () => ({
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_REGULAR,
    style: 'normal',
    size: WDS_SIZE_016_PX,
    lineHeight: WDS_SIZE_024_PX,
    color: WDS_COLOR_BLACK,
    cursor: 'pointer',
    padding: 10,

    '&:hover': {
      color: WDS_COLOR_BLUE_300,
    },
  }),
  menu: () => ({
    maxWidth: 400,
    border: `1px solid ${WDS_COLOR_GREY}`,
    borderRadius: 8,
    margin: '4px 0 0 0',
    maxHeight: 224,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '0',
    },
    '&::-webkit-scrollbar-track': {
      background: '#E5E5E5',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#2949A6',
      borderRadius: '4px',
      '&:hover': {
        background: '#1C3375',
      },
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
}

export const Content = styled.div`
  ${flex({ direction: 'column' })};
`

export const Label = styled.p`
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_BLUE_700};
`
