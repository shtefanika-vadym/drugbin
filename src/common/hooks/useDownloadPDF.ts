import { useCallback, useState } from 'react'
import { fetchDocument } from './documents'

export const useDownloadPDF = () => {
  const [isLoading, setIsLoading] = useState(false)

  const downloadPDF = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const bytes = await fetchDocument(id)
      const url = window.URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `DrugBin_PV_${id}.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error downloading PDF:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { downloadPDF, isLoading }
}
