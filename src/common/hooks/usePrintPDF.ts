import { useRef } from 'react'
import { fetchDocument } from './documents'
import { DocumentCategory } from 'common/types/documents.types'

export const usePrintPDF = () => {
  const iframeRef = useRef(null)

  const printPDF = async (id: string, documentType: DocumentCategory) => {
    const response = await fetchDocument(`/documents/data/${id}?type=${documentType}`)
    const documentBlob = new Blob([response], { type: 'application/pdf' })
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
