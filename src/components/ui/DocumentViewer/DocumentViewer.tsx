import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

const WORKER_URL = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'

export interface DocumentViewerProps {
  documentURL?: string
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentURL }) => {
  return (
    <>
      {documentURL && (
        <Worker workerUrl={WORKER_URL}>
          <Viewer fileUrl={documentURL} />
        </Worker>
      )}
    </>
  )
}
