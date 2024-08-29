/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useCallback, useEffect, useRef } from 'react'
import { useOnClickOutside, useScrollLock } from 'usehooks-ts'
import { CloseIcon } from '../Icon'
import {
  ButtonWrapper,
  CloseButton,
  DialogContainer,
  DialogContainerWithMaxWidth,
  DialogContent,
  DocumentContainer,
  TopDocumentHeader,
} from './Dialog.styled'

export type DialogProps = {
  onClose: () => void
  onCloseRight?: () => void
  children?: React.ReactNode
  open: boolean
  heading?: React.ReactNode | string
  dismissIcon?: ReactNode
  closeIcon?: ReactNode
  isMaxWidthFixed?: boolean
  preventClosingOnClickOutside?: boolean
  zIndex?: number
  hasRightCloseIcon?: boolean
  isDocumentLayout?: boolean
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  heading,
  closeIcon = <CloseIcon />,
  isMaxWidthFixed = false,
  zIndex,
  isDocumentLayout = false,
}) => {
  const contentRef = useRef(null)

  const { lock, unlock, isLocked } = useScrollLock({
    autoLock: false,
    lockTarget: 'root',
  })

  const toggleLocked = () => {
    isLocked ? unlock() : lock()
  }

  //TO-DO: FIND OTHER SOLUTION
  const handleCloseIfOpen = useCallback(
    () => {
      if (open) {
        onClose()
        unlock()
      }
    },
    [open, onClose, unlock],
  )

  const DialogWrapper = isMaxWidthFixed ? DialogContainerWithMaxWidth : DialogContainer

  useOnClickOutside(contentRef, handleCloseIfOpen)

  useEffect(() => {
    if (open) {
      toggleLocked()
    } else {
      unlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) {
    return null
  }

  if (isDocumentLayout) {
    return (
      <DialogWrapper zIndex={zIndex}>
        <DocumentContainer ref={contentRef}>
          <TopDocumentHeader>
            <CloseButton variant='round' size='S-round' onClick={handleCloseIfOpen}>
              {closeIcon}
            </CloseButton>
          </TopDocumentHeader>
          {children}
        </DocumentContainer>
      </DialogWrapper>
    )
  }

  return (
    <DialogWrapper zIndex={zIndex}>
      <DialogContent ref={contentRef}>
        <ButtonWrapper>
          <CloseButton variant='round' size='S-round' onClick={handleCloseIfOpen}>
            {closeIcon}
          </CloseButton>
        </ButtonWrapper>
        {children}
      </DialogContent>
    </DialogWrapper>
  )
}
