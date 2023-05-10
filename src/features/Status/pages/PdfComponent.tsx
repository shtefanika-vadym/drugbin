/* eslint-disable jsx-a11y/iframe-has-title */
import Modal from 'common/components/Modal/Modal'

import { useCollectStatusQuery } from 'features/Status/state/api/statusApi'

export const PdfComponent = ({ idTask }: any) => {
  const { data: pdfData } = useCollectStatusQuery(idTask)

  if (!pdfData) {
    return null // Render nothing if there is no PDF data
  }

  const uint8Array = new Uint8Array(pdfData)
  const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' })
  const pdfUrl = URL.createObjectURL(pdfBlob)

  return (
    <Modal
      callbackOnClose={function (): void {
        throw new Error('Function not implemented.')
      }}>
      <iframe src={pdfUrl} width='1200px' height='900px' />
    </Modal>
  )
}
