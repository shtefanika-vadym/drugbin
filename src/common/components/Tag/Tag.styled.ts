import styled, { css } from 'styled-components'

import { WDS_COLOR_GREEN, WDS_COLOR_RED } from 'common/style/colors'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_SIZE_006_PX, WDS_SIZE_008_PX, WDS_SIZE_016_PX } from 'common/style/size'

import type { TagProps } from './Tag.type'

export const tagVariants = {
  pending: css`
    color: ${WDS_COLOR_RED};
    background: rgba(235, 87, 87, 0.1);
  `,
  recycled: css`
    color: ${WDS_COLOR_GREEN};
    background: rgba(33, 150, 83, 0.1);
  `,
}

export const StyledTag = styled.div<TagProps>`
  width: min-content;
  ${({ variant }) => tagVariants[variant]};
  ${textVariant('bodyXS')};
  padding: ${WDS_SIZE_006_PX} ${WDS_SIZE_016_PX};
  border-radius: ${WDS_SIZE_008_PX};
`
