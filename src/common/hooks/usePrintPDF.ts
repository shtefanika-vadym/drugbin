import { useRef } from 'react'
import { fetchDocument } from './documents'

export const usePrintPDF = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const printPDF = async (id: string) => {
    const bytes = await fetchDocument(id)
    const url = window.URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))

    if (!iframeRef.current) return
    iframeRef.current.src = url
    iframeRef.current.onload = () => {
      iframeRef.current?.contentWindow?.print()
    }
  }

  return { printPDF, iframeRef }
}
