import { useRecycleDrugMutation } from 'features/Home/recycleApi'
import { Title, Text, QRCodeWrapper, BorderCorner } from './QrCode.styled'
import { useEffect } from 'react'
import QRCode from 'react-qr-code'
import { Button } from 'common/components/Button/Button'
import { Spinner } from 'common/components/Spinner'

export const QrCode = ({ drugs }: any) => {
  const [recycleDrug, { isLoading, data }] = useRecycleDrugMutation()

  useEffect(() => {
    if (drugs) recycleDrug(drugs)
  }, [drugs])

  return (
    <div>
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
        <Button variant='secondary'>Save as photo</Button>
      </QRCodeWrapper>
    </div>
  )
}
