import downloadCloudLine from 'common/assets/download-cloud-line.svg'
import logoIcon from 'common/assets/logo.svg'
import shareLine from 'common/assets/share-line.svg'
import xIcon from 'common/assets/xIcon.svg'
import { usePdfGenerator } from 'common/hooks/useGeneratePdf'
import { Button } from 'components/ui/Button/Button'
import Modal from 'components/ui/Modal/Modal'
import type { ReactNode } from 'react'
import {
  Border,
  ControlContent,
  DataContent,
  Icon,
  Logo,
  Page,
  PdfContent,
  Signature,
  SignatureContent,
  SignatureWrapper,
} from './PdfLayout.styled'
import { Document } from '@react-pdf/renderer'

export const PdfLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { printRef, generatePdf } = usePdfGenerator()

  return (
    <Modal type='pdf'>
      <Page>
        <Document ref={printRef}>
          <PdfContent>
            <div>
              <Logo src={logoIcon} alt='Logo Icon' />
              <Border />
              <DataContent>Data: 20-12-2023</DataContent>
              {children}
              <SignatureContent>
                <SignatureWrapper>
                  <Signature>Am predat,</Signature>
                  <Signature isBold>Client name</Signature>
                </SignatureWrapper>
                <SignatureWrapper>
                  <Signature>Am preluat,</Signature>
                  <Signature isBold>Pharma name</Signature>
                </SignatureWrapper>
              </SignatureContent>
            </div>
          </PdfContent>
        </Document>
        <ControlContent>
          <Button variant='white' size='S-square'>
            <Icon src={xIcon} />
          </Button>
          <Button variant='white' size='S-square'>
            <Icon src={downloadCloudLine} onClick={generatePdf} />
          </Button>
          <Button variant='white' size='S-square'>
            <Icon src={shareLine} />
          </Button>
        </ControlContent>
      </Page>
    </Modal>
  )
}
