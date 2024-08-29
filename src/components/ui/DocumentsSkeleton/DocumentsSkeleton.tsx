import { Skeleton } from 'components/ui/Skeleton/Skeleton'
import { IconWrpper, NameWrapper, Row } from './DocumentsSkeleton.styled'


// TO-DO: REFACTORING
export const DocumentsSkeleton = () => {
  const numberOfRows = 10

  const renderRows = [...Array(numberOfRows)].map((_, index: number) => (
    <div key={index}>
      <Row>
        <NameWrapper>
          <Skeleton height='22px' width='195px' />
          <Skeleton height='20px' width='125px' />
        </NameWrapper>
        <NameWrapper>
          <Skeleton height='22px' width='115px' />
          <Skeleton height='20px' width='60px' />
        </NameWrapper>
        <Skeleton height='25px' width='255px' />
        <IconWrpper>
          <Skeleton height='32px' width='32px' />
          <Skeleton height='32px' width='32px' />
          <Skeleton height='32px' width='32px' />
        </IconWrpper>
      </Row>
      <Skeleton height='1px' width='100%' />
    </div>
  ))
  return (
    <>
      <Skeleton height='38px' width='100%' />
      {renderRows}
    </>
  )
}
