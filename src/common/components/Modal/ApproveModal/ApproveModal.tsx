import approveIcon from 'common/assets/icons/approve.png'

import { Button } from 'common/components/Button/Button'
import Modal from 'common/components/Modal/Modal'

import { useUpdateStatusMutation } from 'features/Status/state/api/statusApi'

import { BoxIcon, ButtonWrapper, ContentApprove, Title, TitleBox } from './ApproveModal.styled'

export const ApproveModal = ({ handleCloseModal, id, refetch }: any) => {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation()

  const handleUpdateStatus = async () => {
    if (id) await updateStatus(id)
    if (!isLoading) handleCloseModal()
    refetch()
  }

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <ContentApprove>
        <TitleBox>
          <BoxIcon>
            <img src={approveIcon} alt='' />
          </BoxIcon>
          <Title>Are you sure you want to approve this?</Title>
        </TitleBox>
        <ButtonWrapper>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary' onClick={handleUpdateStatus}>
            {isLoading ? 'Loading...' : 'Approve'}
          </Button>
        </ButtonWrapper>
      </ContentApprove>
    </Modal>
  )
}
