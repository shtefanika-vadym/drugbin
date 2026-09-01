import { WDS_COLOR_GREEN, WDS_COLOR_GREY, WDS_COLOR_ORANGE, WDS_COLOR_RED } from 'common/styles/colors'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import { WDS_SIZE_006_PX, WDS_SIZE_008_PX, WDS_SIZE_016_PX } from 'common/styles/size'
import styled, { css } from 'styled-components'

export type StatusTone = 'ok' | 'danger' | 'warn' | 'muted'

const tones = {
  ok: css`
    color: ${WDS_COLOR_GREEN};
    background: rgba(33, 150, 83, 0.1);
  `,
  danger: css`
    color: ${WDS_COLOR_RED};
    background: rgba(235, 87, 87, 0.1);
  `,
  warn: css`
    color: ${WDS_COLOR_ORANGE};
    background: rgba(255, 122, 0, 0.1);
  `,
  muted: css`
    color: ${WDS_COLOR_GREY};
    background: rgba(163, 166, 173, 0.12);
  `,
}

export const StyledStatusTag = styled.span<{ tone: StatusTone }>`
  width: max-content;
  ${({ tone }) => tones[tone]};
  ${textVariant('bodyXS')};
  padding: ${WDS_SIZE_006_PX} ${WDS_SIZE_016_PX};
  border-radius: ${WDS_SIZE_008_PX};
`
