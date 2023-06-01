import { useEffect } from 'react'
import QRCode from 'react-qr-code'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'store/hooks'

import { Button } from 'common/components/Button/Button'
import Modal from 'common/components/Modal/Modal'
import { Spinner } from 'common/components/Spinner'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { useRecycleDrugMutation } from 'features/Collect/store/api/recycleApi'

import { BorderCorner, QRCodeWrapper, Text, Title } from './QRModal.styled'

export const QRModal = ({ callbackOnClose, drugs }: any) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [recycleDrug, { isLoading, data }] = useRecycleDrugMutation()

  useEffect(() => {
    if (drugs) recycleDrug(drugs)
  }, [drugs])

  const handleRedirect = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    navigate('/')
  }

  return (
    <Modal callbackOnClose={callbackOnClose}>
      <Title>QR Code Created</Title>
      <Text>
        When you get to the chosen location, you have to scan this QR Code to finish the recycling
        process. Thank you for choosing to recycle your unused medication today!
      </Text>
      <QRCodeWrapper>
        {isLoading ? (
          <Spinner isLoading={isLoading} />
        ) : (
          <>
            {data?.drugCode && (
              <BorderCorner>
                <QRCode id='qrcode' value={data?.drugCode} size={120} />
              </BorderCorner>
            )}
          </>
        )}
        <Button variant='secondary' onClick={handleRedirect}>
          Save as photo
        </Button>
      </QRCodeWrapper>
    </Modal>
  )
}
