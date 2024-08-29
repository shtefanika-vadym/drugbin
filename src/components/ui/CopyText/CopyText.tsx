import { ReactNode, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { CheckIcon, CopyIcon } from '../Icon'
import { Container, IconWrapper } from './CopyText.styled'

export interface CopyTextProps {
  children: ReactNode
  value: string
}

export const CopyText: React.FC<CopyTextProps> = ({ children, value }) => {
  const [, copy] = useCopyToClipboard()
  const [showCheckIcon, setShowCheckIcon] = useState(false)

  const handleCopy = () => {
    copy(value).then(() => {
      setShowCheckIcon(true)

      setTimeout(() => {
        setShowCheckIcon(false)
      }, 2000)
    })
  }

  return (
    <Container onClick={handleCopy}>
      {children}
      <IconWrapper className='copy-icon'>
        {showCheckIcon ? <CheckIcon width={14} height={14} /> : <CopyIcon />}
      </IconWrapper>
    </Container>
  )
}
