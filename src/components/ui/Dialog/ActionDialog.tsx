import useDialog from 'common/hooks/useDialog'
import { WDS_COLOR_BLUE_100, WDS_COLOR_GREEN_200 } from 'common/style/colors'
import { useCallback } from 'react'
import { Button } from '../Button/Button'
import { ApproveIcon, CheckIcon, RestoreIcon, TrashIcon, TrashIcon2 } from '../Icon'
import { Text } from '../Text/Text'
import {
  BoxIcon,
  ButtonWrapper,
  Container,
  Description,
  LeftSection,
  RightSection,
} from './ActionDialog.styled'

interface ActionDialogProps {
  title: string
  description: string
  type: 'approve' | 'trash' | 'restore'
  confirm?: () => void
  close?: () => void
}

export const ActionDialog: React.FC<ActionDialogProps> = ({
  title,
  description,
  type,
  close,
  confirm,
}) => {
  return (
    <Container>
      <LeftSection>{currentActionData[type].leftSection}</LeftSection>
      <RightSection>
        <Text variant='titleH4'>{title}</Text>
        <Description>{description}</Description>
        <ButtonWrapper>
          <Button variant='secondary' onClick={close}>
            Anulare
          </Button>
          <Button onClick={confirm}>Confirm</Button>
        </ButtonWrapper>
      </RightSection>
    </Container>
  )
}

export const ApproveAction: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const [ApproveViewerDialog, approveViewerDialogProps, toggleApproveViewerDialog] = useDialog()

  const handleConfirm = useCallback(() => {
    onConfirm()
    toggleApproveViewerDialog(false)
  }, [onConfirm, toggleApproveViewerDialog])

  return (
    <>
      <ApproveViewerDialog {...approveViewerDialogProps}>
        <ActionDialog
          type='approve'
          title='Sunteți sigur că doriți să aprobați această cerere de colectare?'
          description='Aceasta este o acțiune ireversibilă care va duce la aprobarea cererii de colectare în sistemul DrugBin.'
          close={() => toggleApproveViewerDialog(false)}
          confirm={handleConfirm}
        />
      </ApproveViewerDialog>
      <Button variant='square' size='S-square' onClick={() => toggleApproveViewerDialog(true)}>
        <ApproveIcon />
      </Button>
    </>
  )
}

export const TrashAction: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const [TrashViewerDialog, trashViewerDialogProps, toggleTrashViewerDialog] = useDialog()

  const handleConfirm = useCallback(() => {
    onConfirm()
    toggleTrashViewerDialog(false)
  }, [onConfirm, toggleTrashViewerDialog])

  return (
    <>
      <TrashViewerDialog {...trashViewerDialogProps}>
        <ActionDialog
          type='trash'
          title='Sunteți sigur că doriți să ștergeți această cerere de colectare?'
          description='Aceasta este o acțiune ireversibilă care va duce la ștergerea datelor referitoare la cererea de colectare din întregul sistem DrugBin.'
          close={() => toggleTrashViewerDialog(false)}
          confirm={handleConfirm}
        />
      </TrashViewerDialog>
      <Button variant='square' size='S-square' onClick={() => toggleTrashViewerDialog(true)}>
        <TrashIcon />
      </Button>
    </>
  )
}

export const RestoreAction: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const [RestoreViewerDialog, restoreViewerDialogProps, toggleRestoreViewerDialog] = useDialog()

  const handleRestore = useCallback(() => {
    onConfirm()
    toggleRestoreViewerDialog(false)
  }, [onConfirm, toggleRestoreViewerDialog])

  return (
    <>
      <RestoreViewerDialog {...restoreViewerDialogProps}>
        <ActionDialog
          type='restore'
          title='Sunteți sigur că doriți să restaurați această cerere de colectare?'
          description='Aceasta este o acțiune ireversibilă care va duce la restaurarea datelor referitoare la cererea de colectare în întregul sistem DrugBin.'
          close={() => toggleRestoreViewerDialog(false)}
          confirm={handleRestore}
        />
      </RestoreViewerDialog>
      <Button variant='square' size='S-square' onClick={() => toggleRestoreViewerDialog(true)}>
        <RestoreIcon />
      </Button>
    </>
  )
}

const currentActionData = {
  approve: {
    leftSection: (
      <BoxIcon color={WDS_COLOR_GREEN_200}>
        <CheckIcon />
      </BoxIcon>
    ),
  },
  trash: {
    leftSection: (
      <BoxIcon color={WDS_COLOR_BLUE_100}>
        <TrashIcon2 />
      </BoxIcon>
    ),
  },
  restore: {
    leftSection: (
      <BoxIcon color={WDS_COLOR_BLUE_100}>
        <RestoreIcon height={32} width={32} />
      </BoxIcon>
    ),
  },
}
