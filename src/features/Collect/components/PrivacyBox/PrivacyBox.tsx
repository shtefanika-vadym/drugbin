import secureIcon from 'common/assets/secure-payment-line.svg'

import { PRIVACY_BOX } from 'features/Collect/constatnts/constants'

import { Description, Icon, PrivacyBoxWrapper } from './PrivacyBox.styled'

export const PrivacyBox = () => {
  return (
    <PrivacyBoxWrapper>
      <Icon src={secureIcon} />
      <Description>{PRIVACY_BOX.DESCRIPTION}</Description>
    </PrivacyBoxWrapper>
  )
}
