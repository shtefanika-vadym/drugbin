import xIcon from 'common/assets/icons/close.svg'

import { Button } from 'common/components/Button/Button'
import useBreakpoints from 'common/hooks/useBreakpoints'

import { BackModal, ButtonWrapper, ContentModal, Icon, ModalWrapper } from './Modal.styled'

interface IModalProps {
  children: React.ReactChild | React.ReactNode
  callbackOnClose: () => void
}
const Modal = ({ children, callbackOnClose }: IModalProps) => {
  const { isBelowDesktop } = useBreakpoints()
  return (
    <ContentModal>
      <BackModal />
      <ModalWrapper>
        {!isBelowDesktop && (
          <ButtonWrapper>
            <Button variant='round' size='S-round' onClick={callbackOnClose}>
              <Icon src={xIcon} />
            </Button>
          </ButtonWrapper>
        )}
        <div>{children}</div>
      </ModalWrapper>
    </ContentModal>
  )
}

export default Modal
