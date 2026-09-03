import styled, { css } from 'styled-components'

import {
  WDS_COLOR_BLUE_100,
  WDS_COLOR_BLUE_200,
  WDS_COLOR_BLUE_300,
  WDS_COLOR_BLUE_400,
  WDS_COLOR_BLUE_50,
  WDS_COLOR_BLUE_500,
  WDS_COLOR_GREY,
  WDS_COLOR_GREY_100,
  WDS_COLOR_RED,
  WDS_COLOR_RED_100,
  WDS_COLOR_WHITE,
  WDS_COLOR_WHITE_100,
} from 'common/styles/colors'
import { border } from 'common/styles/mixins/border.mixin'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_004_PX,
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_010_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_024_PX,
} from 'common/styles/size'

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
  &:active {
    background-color: ${WDS_COLOR_BLUE_500};
    transform: scale(0.965);
  }
  &:disabled {
    background-color: ${WDS_COLOR_BLUE_200};
    color: ${WDS_COLOR_WHITE};
    transform: none;
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
    &:active {
      background-color: ${WDS_COLOR_BLUE_50};
      color: ${WDS_COLOR_BLUE_400};
      transform: scale(0.965);
    }
    &:disabled {
      background-color: ${WDS_COLOR_WHITE};
      color: ${WDS_COLOR_BLUE_200};
    }
  `,
  primaryFull: css`
    ${primaryStyles};
    width: 100%;
  `,
  secondary: css`
    ${border({ type: 'solid', color: WDS_COLOR_BLUE_300 })};
    background-color: transparent;
    color: ${WDS_COLOR_BLUE_300};
    border-radius: ${WDS_SIZE_008_PX};

    &:hover {
      background-color: ${WDS_COLOR_BLUE_50};
    }
    &:active {
      background-color: ${WDS_COLOR_BLUE_50};
      ${border({ type: 'solid', color: WDS_COLOR_BLUE_400 })};
      color: ${WDS_COLOR_BLUE_400};
      transform: scale(0.965);
    }
    &:disabled {
      ${border({ type: 'solid', color: WDS_COLOR_GREY_100 })};
      color: ${WDS_COLOR_GREY};
      background-color: transparent;
    }
  `,
  square: css`
    background-color: ${WDS_COLOR_BLUE_50};
    border-radius: ${WDS_SIZE_004_PX};

    &:hover {
      background-color: ${WDS_COLOR_BLUE_200};
    }
  `,
  round: css`
    background-color: ${WDS_COLOR_BLUE_50};
    border-radius: 50%;

    &:hover {
      background-color: ${WDS_COLOR_BLUE_200};
    }
  `,
  empty: css`
    background-color: transparent;
    border-radius: 8px;

    &:hover {
      background-color: ${WDS_COLOR_BLUE_200};
    }
  `,
  danger: css`
    ${border({ type: 'solid', color: WDS_COLOR_RED })};
    background-color: transparent;
    color: ${WDS_COLOR_RED};
    border-radius: ${WDS_SIZE_008_PX};

    &:hover {
      background-color: ${WDS_COLOR_RED_100};
    }
    &:active {
      background-color: ${WDS_COLOR_RED_100};
      transform: scale(0.965);
    }
    &:disabled {
      ${border({ type: 'solid', color: WDS_COLOR_RED })};
    }
  `,
  document: css`
    ${textVariant('bodyXS')};
    background-color: ${WDS_COLOR_BLUE_100};
    border-radius: ${WDS_SIZE_008_PX};
    color: ${WDS_COLOR_BLUE_500};

    &:disabled {
      background-color: ${WDS_COLOR_BLUE_50};
    }
  `,
}

export const buttonSizes = {
  XS: css`
    ${textVariant('bodyXS')};
    padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_016_PX};
    gap: ${WDS_SIZE_004_PX};
  `,
  S: css`
    ${fontNormal};
    padding: ${WDS_SIZE_010_PX} ${WDS_SIZE_024_PX};
    gap: ${WDS_SIZE_010_PX};
  `,
  'S-square': css`
    padding: ${WDS_SIZE_004_PX};
  `,
  'S-round': css`
    padding: ${WDS_SIZE_004_PX};
    border-radius: 50%;
  `,
  None: css`
    padding: ${WDS_SIZE_006_PX};
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  all: unset;
  ${flex({ direction: 'row', justifyContent: 'center', alignItems: 'center' })};
  ${({ variant }) => buttonVariants[variant]};
  ${({ size }) => buttonSizes[size]};
  transition-property: background-color, border-color, color, transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
  box-sizing: border-box;
  cursor: pointer;
  gap: ${WDS_SIZE_008_PX};
  &:focus {
    outline: solid 1px ${WDS_COLOR_BLUE_400};
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }
`
