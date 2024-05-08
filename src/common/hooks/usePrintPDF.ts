import { getDownloadDocument } from 'api/documentsApi'
import { useRef } from 'react'

export const usePrintPDF = () => {
  const iframeRef = useRef(null)

  const printPDF = async (id: string, documentType: string) => {
    const response = await getDownloadDocument(id, documentType)
    const documentData = response.data
    const documentBlob = new Blob([documentData], { type: 'application/pdf' })
    const documentURL = window.URL.createObjectURL(documentBlob)

    if (iframeRef.current) {
      iframeRef.current.src = documentURL
    }

    const handleLoad = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.print()
      }
    }

    iframeRef.current.onload = handleLoad
  }

  return { printPDF, iframeRef }
}
