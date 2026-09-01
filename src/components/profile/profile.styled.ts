import {
  WDS_COLOR_BLUE_100,
  WDS_COLOR_BLUE_400,
  WDS_COLOR_GREEN,
  WDS_COLOR_GREY,
  WDS_COLOR_GREY_100,
  WDS_COLOR_RED,
  WDS_COLOR_WHITE,
} from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { textVariant } from 'common/styles/mixins/typography.mixin'
import {
  WDS_SIZE_004_PX,
  WDS_SIZE_006_PX,
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_020_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_048_PX,
  WDS_SIZE_128_PX,
  WDS_SIZE_400_PX,
  WDS_SIZE_416_PX,
  WDS_SIZE_488_PX,
} from 'common/styles/size'
import { Text } from 'components/ui/Text/Text'
import styled, { css } from 'styled-components'

export const Sections = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_008_PX })};
`

export const PageHead = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
  margin-bottom: ${WDS_SIZE_024_PX};
`

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: ${WDS_SIZE_024_PX};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const RightColumn = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_024_PX })};
  min-width: 0;
  max-width: ${WDS_SIZE_488_PX};
`

/* ---- Card ---- */

export const Card = styled.section`
  ${flex({ direction: 'column', gap: WDS_SIZE_020_PX })};
  padding: ${WDS_SIZE_024_PX};
  border: 1px solid ${WDS_COLOR_GREY_100};
  border-radius: ${WDS_SIZE_012_PX};
`

export const CardHeader = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
`

/* ---- Identity rail ---- */

export const IdentityRail = styled(Card)`
  gap: ${WDS_SIZE_016_PX};
`

export const IdentityTop = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_016_PX })};
`

export const Monogram = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  flex-shrink: 0;
  width: ${WDS_SIZE_048_PX};
  height: ${WDS_SIZE_048_PX};
  border-radius: ${WDS_SIZE_012_PX};
  background: ${WDS_COLOR_BLUE_100};
  color: ${WDS_COLOR_BLUE_400};
  ${textVariant('subheading')};
  text-transform: uppercase;
`

export const IdentityName = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};
  min-width: 0;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${WDS_COLOR_GREY_100};
  margin: 0;
`

export const FieldList = styled.dl`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  margin: 0;
`

export const Field = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_004_PX })};

  dt {
    ${textVariant('bodyXS')};
    color: ${WDS_COLOR_GREY};
  }
  dd {
    margin: 0;
    ${textVariant('bodyM')};
    word-break: break-word;
  }
`

export const Hint = styled(Text).attrs({ variant: 'bodyXS', color: WDS_COLOR_GREY })``

/* ---- Password requirement checklist ---- */

export const ReqList = styled.ul`
  ${flex({ direction: 'column', gap: WDS_SIZE_006_PX })};
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ReqItem = styled.li<{ done: boolean }>`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_008_PX })};
  ${textVariant('bodyXS')};
  color: ${({ done }) => (done ? WDS_COLOR_GREEN : WDS_COLOR_GREY)};

  svg {
    flex-shrink: 0;
    width: ${WDS_SIZE_016_PX};
    height: ${WDS_SIZE_016_PX};
  }
`

export const ReqDot = styled.span`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: ${WDS_SIZE_016_PX};
  height: ${WDS_SIZE_016_PX};

  &::before {
    content: '';
    width: ${WDS_SIZE_006_PX};
    height: ${WDS_SIZE_006_PX};
    border-radius: 50%;
    background: ${WDS_COLOR_GREY};
  }
`

/* ---- Inline message box ---- */

const messageTones = {
  ok: css`
    color: ${WDS_COLOR_GREEN};
    background: rgba(33, 150, 83, 0.1);
  `,
  error: css`
    color: ${WDS_COLOR_RED};
    background: rgba(235, 87, 87, 0.1);
  `,
}

export const MessageBox = styled.div<{ tone: 'ok' | 'error' }>`
  ${({ tone }) => messageTones[tone]};
  ${textVariant('bodyXS')};
  padding: ${WDS_SIZE_008_PX} ${WDS_SIZE_012_PX};
  border-radius: ${WDS_SIZE_008_PX};
`

/* ---- Forms ---- */

export const FormColumn = styled.form`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  max-width: ${WDS_SIZE_416_PX};
`

export const Column = styled.div`
  ${flex({ direction: 'column', gap: WDS_SIZE_016_PX })};
  max-width: ${WDS_SIZE_416_PX};
`

export const InlineActions = styled.div`
  ${flex({ alignItems: 'center', gap: WDS_SIZE_012_PX, flexWrap: 'wrap' })};
`

/* ---- Signature ---- */

export const SignaturePreview = styled.img`
  width: 100%;
  max-width: ${WDS_SIZE_400_PX};
  height: ${WDS_SIZE_128_PX};
  object-fit: contain;
  padding: ${WDS_SIZE_012_PX};
  box-sizing: border-box;
  border: 1px solid ${WDS_COLOR_GREY_100};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_WHITE};
  display: block;
`

export const SignatureEmpty = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: 100%;
  max-width: ${WDS_SIZE_400_PX};
  height: ${WDS_SIZE_128_PX};
  border: 1px dashed ${WDS_COLOR_GREY_100};
  border-radius: ${WDS_SIZE_008_PX};
  background: ${WDS_COLOR_BLUE_100};
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_GREY};
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const DisclaimerBox = styled.div`
  padding: ${WDS_SIZE_012_PX} ${WDS_SIZE_016_PX};
  background: ${WDS_COLOR_BLUE_100};
  border-radius: ${WDS_SIZE_008_PX};
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_GREY};
`
