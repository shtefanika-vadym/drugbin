import styled, { css } from 'styled-components'

import { WDS_COLOR_GREEN, WDS_COLOR_ORANGE, WDS_COLOR_RED } from 'common/styles/colors'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_006_PX, WDS_SIZE_008_PX, WDS_SIZE_016_PX } from 'common/styles/size'

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
  approved: css`
    color: ${WDS_COLOR_ORANGE};
    background: rgba(255, 198, 174, 0.1);
  `,
  deny: css`
    color: ${WDS_COLOR_RED};
    background: rgba(235, 87, 87, 0.1);
  `,
}

export const StyledTag = styled.div<TagProps>`
  width: max-content;
  ${({ variant }) => tagVariants[variant]};
  ${textVariant('bodyXS')};
  padding: ${WDS_SIZE_006_PX} ${WDS_SIZE_016_PX};
  border-radius: ${WDS_SIZE_008_PX};
`
