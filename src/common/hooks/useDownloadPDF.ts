import { capitalize } from 'lodash-es'
import { useCallback } from 'react'
import { fetchDocument } from './documents'

export const useDownloadPDF = () => {
  const downloadPDF = useCallback(async (id: string, documentType: string) => {
    const documentName = `DrugBin_Raport_${capitalize(documentType)}_${id}.pdf`
    try {
      const response = await fetchDocument(`/documents/data/${id}?type=${documentType}`)
      const documentBlob = new Blob([response], { type: 'application/pdf' })
      const documentURL = window.URL.createObjectURL(documentBlob)

      const link = document.createElement('a')
      link.href = documentURL
      link.setAttribute('download', documentName)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(documentURL)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error downloading PDF:', error)
    }
  }, [])

  return downloadPDF
}
