import type { ReactChild, ReactNode } from 'react'
import { useRef } from 'react'
import FocusLock from 'react-focus-lock'

import { useAppDispatch } from 'store/hooks'
import { useLockedBody, useOnClickOutside } from 'usehooks-ts'

import xIcon from 'common/assets/close.svg'

import useBreakpoints from 'common/hooks/useBreakpoints'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { Button } from 'components/ui/Button/Button'
import { ButtonWrapper, ContentModal, Icon, ModalWrapper } from './Modal.styled'

interface IModalProps {
  children: ReactChild | ReactNode
  callbackOnClose?: () => void
  type?: string
}
const Modal = ({ children, callbackOnClose, type }: IModalProps) => {
  const topNavRef = useRef<HTMLElement | null>(null)
  const [locked, setLocked] = useLockedBody(true, 'root')
  const dispatch = useAppDispatch()
  const isPdf = Boolean(type === 'pdf')
  const { isBelowDesktop } = useBreakpoints()
  
  const handleCloseModal = (e: any) => {
    if (e.target.classList.contains('ant-picker-cell-inner')) return
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    setLocked(!locked)
  }

  useOnClickOutside(topNavRef, handleCloseModal)

  return (
    <FocusLock>
      <ContentModal>
        <ModalWrapper type={type} ref={topNavRef}>
          {!isBelowDesktop && !isPdf && (
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
