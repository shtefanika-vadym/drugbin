import secureIcon from 'common/assets/icons/secure-payment-line.svg'

import { PRIVACY_BOX } from 'features/Recycle/constatnts/constants'

import { Description, Icon, PrivacyBoxWrapper } from './PrivacyBox.styled'

export const PrivacyBox = () => {
  return (
    <PrivacyBoxWrapper>
      <Icon src={secureIcon} />
      <Description>{PRIVACY_BOX.DESCRIPTION}</Description>
    </PrivacyBoxWrapper>
  )
}
