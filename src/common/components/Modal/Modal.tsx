import type { ReactChild, ReactNode } from 'react'
import { useRef } from 'react'
import FocusLock from 'react-focus-lock'

import { useAppDispatch } from 'store/hooks'
import { useLockedBody, useOnClickOutside } from 'usehooks-ts'

import xIcon from 'common/assets/icons/close.svg'

import { Button } from 'common/components/Button/Button'
import useBreakpoints from 'common/hooks/useBreakpoints'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { ButtonWrapper, ContentModal, Icon, ModalWrapper } from './Modal.styled'

interface IModalProps {
  children: ReactChild | ReactNode
  callbackOnClose: () => void
}
const Modal = ({ children, callbackOnClose }: IModalProps) => {
  const topNavRef = useRef<HTMLElement | null>(null)
  const [locked, setLocked] = useLockedBody(true, 'root')
  const dispatch = useAppDispatch()

  const { isBelowDesktop } = useBreakpoints()

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    setLocked(!locked)
  }

  useOnClickOutside(topNavRef, handleCloseModal)

  return (
    <FocusLock>
      <ContentModal>
        <ModalWrapper ref={topNavRef}>
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
    </FocusLock>
  )
}

export default Modal
