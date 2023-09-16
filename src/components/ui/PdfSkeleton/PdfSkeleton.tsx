import { Skeleton } from 'components/ui/Skeleton/Skeleton'
import { NameWrapper, Row } from './PdfSkeleton.styled'

export const PdfSkeleton = () => {
  const numberOfRows = 4

  const renderedRows = [...Array(numberOfRows)].map((key: number) => (
    <div key={key}>
      <Row>
        <Skeleton height='25px' width='25px' />
        <NameWrapper>
          <Skeleton height='16px' width='195px' />
          <Skeleton height='16px' width='125px' />
        </NameWrapper>
        <Skeleton height='20px' width='60px' />
        <Skeleton height='25px' width='60px' />
        <Skeleton height='25px' width='35px' />
        <Skeleton height='25px' width='60px' />
      </Row>
      <Skeleton height='1px' width='100%' />
    </div>
  ))
  return (
    <>
      <Skeleton height='38px' width='100%' />
      {renderedRows}
    </>
  )
}
