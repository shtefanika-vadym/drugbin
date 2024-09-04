import { WDS_COLOR_BLUE_300, WDS_COLOR_GREY_100 } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import { WDS_SIZE_008_PX, WDS_SIZE_012_PX } from 'common/styles/size'
import { WDS_TEXT_WEIGHT_MEDIUM } from 'common/styles/typography'
import { TrashIcon } from 'components/ui/Icon'
import { Text } from 'components/ui/Text/Text'
import styled from 'styled-components'

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_012_PX })}
`

export const BoxContainer = styled.div<{ isDefault: boolean }>`
  border: 1px ${({ isDefault }) => (isDefault ? WDS_COLOR_BLUE_300 : WDS_COLOR_GREY_100)} solid;
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_012_PX};
  box-sizing: border-box;
  width: 315px;
  height: 175px;
  ${flex({ direction: 'column', gap: '16px' })}
`

export const Name = styled(Text).attrs({
  variant: 'bodyM',
})`
  font-weight: ${WDS_TEXT_WEIGHT_MEDIUM};
  width: 180px;
`

export const Signature = styled.img`
  width: 108px;
  height: 33px;
`

export const DeleteSignature = styled(TrashIcon)`
  cursor: pointer;
`

export const SignatureWrapper = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'flex-end' })}
`

export const ContentVisibility = styled.div<{ isDefault: boolean }>`
  visibility: ${({ isDefault }) => (isDefault ? 'hidden' : 'visible')};
`

export const SignatureAction = styled.button`
  all: unset;
  cursor: pointer;
  color: #b6ccf2;
  text-decoration: underline;
`
