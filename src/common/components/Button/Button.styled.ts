import styled, { css } from 'styled-components'

import {
  WDS_COLOR_BLUE_200,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_400,
  WDS_COLOR_WHITE,
  WDS_COLOR_WHITE_100,
} from 'common/style/colors'
import { border } from 'common/style/mixins/border.mixin'
import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import {
  WDS_SIZE_004_PX,
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_024_PX,
} from 'common/style/size'

import type { StyledButtonProps } from './Button.types'

const fontNormal = css`
  ${textVariant('subheading')};
`

const primaryStyles = css`
  color: ${WDS_COLOR_WHITE};
  background-color: ${WDS_COLOR_BLUE_300};
  border-radius: ${WDS_SIZE_008_PX};
  &:hover {
    background-color: ${WDS_COLOR_BLUE_400};
  }
`

export const buttonVariants = {
  primary: css`
    ${primaryStyles}
  `,
  white: css`
    ${primaryStyles};
    background-color: ${WDS_COLOR_WHITE};
    color: ${WDS_COLOR_BLUE_300};
    &:hover {
      background-color: ${WDS_COLOR_WHITE_100};
    }
  `,
  primaryFull: css`
    ${primaryStyles};
    width: 100%;
  `,
  secondary: css`
    color: ${WDS_COLOR_BLUE_300};
    background-color: transparent;
    ${border({ type: 'solid', color: WDS_COLOR_BLUE_300 })};
    border-radius: ${WDS_SIZE_008_PX};
    &:hover {
      background-color: ${WDS_COLOR_BLUE_300};
      color: ${WDS_COLOR_WHITE};
    }
    &:disabled {
      ${border({ type: 'solid', color: WDS_COLOR_BLUE_300 })};
    }
  `,
  square: css`
    background-color: ${WDS_COLOR_BLUE_200};
    border-radius: ${WDS_SIZE_004_PX};
    &:hover {
      transition: transform 0.3s ease-out;
      transform: translateY(-1px);
    }
  `,
  round: css`
    background-color: ${WDS_COLOR_BLUE_200};
    border-radius: 50%;
    &:hover {
      transition: transform 0.3s ease-out;
      transform: translateY(-1px);
    }
  `,
  empty: css`
    background-color: transparent;
    border-radius: 8px;
    &:hover {
      background-color: ${WDS_COLOR_BLUE_200};
    }
  `,
}

export const buttonSizes = {
  S: css`
    ${fontNormal};
    padding: ${WDS_SIZE_010_PX} ${WDS_SIZE_024_PX};
    gap: ${WDS_SIZE_010_PX};
  `,
  'S-square': css`
    padding: ${WDS_SIZE_004_PX};
  `,
  'S-round': css`
    padding: ${WDS_SIZE_006_PX};
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  all: unset;
  ${flex({ direction: 'row', justifyContent: 'center', alignItems: 'center' })};
  ${({ variant }) => buttonVariants[variant]};
  ${({ size }) => buttonSizes[size]};
  transition-property: background-color, border-color;
  transition-duration: 0.2s;
  box-sizing: border-box;
  cursor: pointer;
  gap: ${WDS_SIZE_008_PX};
  &:focus {
    outline: solid 1px ${WDS_COLOR_BLUE_400};
  }
  &:disabled {
    cursor: not-allowed;
  }
`
