import styled from 'styled-components'

import { flex } from 'common/style/mixins/flex.mixin'
import { textVariant } from 'common/style/mixins/typography.mixin'
import { WDS_COLOR_BLUE_700, WDS_COLOR_RED } from 'common/style/colors'

export const DrugInformationWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const MultiFormWrapper = styled.div`
  ${flex({ direction: 'column', gap: '24px' })};
`

export const FormWrapper = styled.div`
  ${flex({ direction: 'column', gap: '16px' })};
  padding: 16px;
  border-radius: 16px;
  background: rgba(235, 240, 251, 0.45);
`
export const InputWrapper = styled.div``

export const Error = styled.p`
  ${textVariant('bodyXS')};
  color: ${WDS_COLOR_RED};
  text-align: right;
  padding-top: 4px;
`
export const ButtonWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })}
`

export const AddNewWrapper = styled.div`
  ${flex({ direction: 'column' })}
`

export const Label = styled.p`
  ${textVariant('bodyS')};
  color: ${WDS_COLOR_BLUE_700};
`

export const Delete = styled.p`
  ${textVariant('bodyS')};
  text-decoration: underline;
  color: #a3a6ad;
  cursor: pointer;
`

export const LabelWrapper = styled.div`
  ${flex({ justifyContent: 'space-between' })};
  padding-bottom: 4px;
`
