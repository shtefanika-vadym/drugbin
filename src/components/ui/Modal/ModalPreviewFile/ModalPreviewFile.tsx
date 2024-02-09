/* eslint-disable prefer-const */
import { useRef, type FC } from 'react'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import FocusLock from 'react-focus-lock'
import { useLockedBody, useOnClickOutside } from 'usehooks-ts'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { useAppDispatch } from 'store/hooks'
import { ContentModal, ContentPdf } from '../Modal.styled'

import '@react-pdf-viewer/core/lib/styles/index.css'
import { useGetDocumnetQuery, useGetRaportQuery } from 'api/documentsApi'
import Spinner from 'components/ui/Spinner/Spinner'
import './modalPreviewFile.scss'

const WORKER_URL = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'

export type DocumentType = 'psycholeptic' | 'normal'

interface ModalPreviewFileProps {
  id: string | number
  type: DocumentType
  isRaport?: boolean
}

const ModalPreviewFile: FC<ModalPreviewFileProps> = ({ id, type, isRaport }) => {
  const { data, isLoading } = useGetDocumnetQuery(
    { id, type },
    {
      skip: isRaport,
    },
  )
  const { data: raportDocumentUrl, isLoading: isLoadingRaportDocument } = useGetRaportQuery(
    { id, type },
    {
      skip: !isRaport,
    },
  )

  const dispatch = useAppDispatch()
  const topNavRef = useRef<HTMLElement | null>(null)
  const [locked, setLocked] = useLockedBody(true, 'root')

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    setLocked(!locked)
  }

  useOnClickOutside(topNavRef, handleCloseModal)

  return (
    <FocusLock>
      <ContentModal>
        {isLoading || isLoadingRaportDocument ? (
          <div
            style={{
              width: '700px',
              height: '600px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner isLoading={isLoading} size='large' />
          </div>
        ) : (
          <ContentPdf ref={topNavRef} style={{ width: '700px', height: '600px' }}>
            <Worker workerUrl={WORKER_URL}>
              <Viewer fileUrl={data ?? raportDocumentUrl} />
            </Worker>
          </ContentPdf>
        )}
      </ContentModal>
    </FocusLock>
  )
}

export default ModalPreviewFile
