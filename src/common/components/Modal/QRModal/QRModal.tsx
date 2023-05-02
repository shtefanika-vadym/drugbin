import QRIcon from 'common/assets/icons/qr.png'

import { Button } from 'common/components/Button/Button'
import Modal from 'common/components/Modal/Modal'

import { QRCode, QRCodeWrapper, Text, Title } from './QRModal.styled'

export const QRModal = ({ callbackOnClose }: any) => {
  return (
    <Modal callbackOnClose={callbackOnClose}>
      <Title>QR Code Created</Title>
      <Text>
        When you get to the chosen location, you have to scan this QR Code to finish the recycling
        process. Thank you for choosing to recycle your unused medication today!
      </Text>
      <QRCodeWrapper>
        <QRCode src={QRIcon} />
        <Button variant='secondary' onClick={callbackOnClose}>
          Save as photo
        </Button>
      </QRCodeWrapper>
    </Modal>
  )
}
