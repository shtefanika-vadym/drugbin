import { WDS_COLOR_GREY, WDS_COLOR_WHITE } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_004_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_020_PX,
  WDS_SIZE_024_PX,
} from 'common/styles/size'
import styled from 'styled-components'

const LINE = '#EEF0F4'

export const Sections = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
`

export const BackRow = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_016_PX })};
`

/** Identity card — the SaaS surface language from `ui/UserActions/UserActions.styled`. */
export const IdentityCard = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  padding: ${WDS_SIZE_020_PX};
  background: ${WDS_COLOR_WHITE};
  border: 1px solid ${LINE};
  border-radius: ${WDS_SIZE_012_PX};
  box-shadow: 0px 2px 8px rgba(1, 16, 46, 0.06), 0px 14px 34px rgba(1, 16, 46, 0.13);
`

export const CardHead = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
`

export const CardTitle = styled.span`
  ${textVariant('bodyL')};
  font-weight: 700;
  color: #01102e;
  word-break: break-all;
`

export const DefGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${WDS_SIZE_016_PX} ${WDS_SIZE_024_PX};
  margin: 0;
`

export const DefItem = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
  min-width: 0;

  dt {
    ${textVariant('bodyXS')};
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${WDS_COLOR_GREY};
  }

  dd {
    margin: 0;
    ${textVariant('bodyM')};
    color: #01102e;
    word-break: break-word;
  }
`

export const TableHeader = styled.thead`
  display: block;
`

export const TableBody = styled.tbody`
  display: block;
`

export const TableWrap = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })};
`
