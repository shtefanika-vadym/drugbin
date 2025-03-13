import { capitalize } from 'lodash-es'
import { useCallback, useState } from 'react'
import { fetchDocument } from './documents'
import { DocumentCategory } from 'common/types/documents.types'
import { categoryLabels } from 'common/utils/utils'

export const useDownloadPDF = () => {
  const [isLoading, setIsLoading] = useState(false)

  const downloadPDF = useCallback(async (id: string, documentType: DocumentCategory) => {
    setIsLoading(true)
    const documentName = `DrugBin_Raport_${capitalize(categoryLabels[documentType])}_${id}.pdf`
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
      setIsLoading(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error downloading PDF:', error)
      setIsLoading(false)
    }
  }, [])

  return { downloadPDF, isLoading }
}
