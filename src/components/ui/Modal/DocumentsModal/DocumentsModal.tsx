/* eslint-disable jsx-a11y/iframe-has-title */

import { useDocumentStatusQuery } from 'api/statusApi'
import Modal from 'components/ui/Modal/Modal'

// TODO --> FIND BETTER APROCH
export const DocumentsModal = () => {
  const { data: pdfData } = useDocumentStatusQuery()

  if (!pdfData) return null

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
