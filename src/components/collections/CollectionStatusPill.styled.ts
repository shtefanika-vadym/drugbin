import { WDS_COLOR_GREEN } from 'common/styles/colors'
import { WDS_SIZE_002_PX, WDS_SIZE_006_PX, WDS_SIZE_008_PX } from 'common/styles/size'
import styled, { css } from 'styled-components'

export type PillTone = 'progress' | 'done'

const tones = {
  // Open collection — the machine is still dropping meds in. Amber (`#F2C94C`) tint.
  progress: css`
    color: #8a6d00;
    background: rgba(242, 201, 76, 0.22);
  `,
  // Finalized collection.
  done: css`
    color: ${WDS_COLOR_GREEN};
    background: rgba(33, 150, 83, 0.12);
  `,
}

/** Status chip for a collection. Shape matches `RolePill` in `ui/UserActions/UserActions.styled`. */
export const Pill = styled.span<{ tone: PillTone }>`
  flex: none;
  width: max-content;
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: ${WDS_SIZE_006_PX};
  padding: ${WDS_SIZE_002_PX} ${WDS_SIZE_008_PX};
  ${({ tone }) => tones[tone]};
`
