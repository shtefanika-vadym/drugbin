import type { FC } from 'react'

import {
  ContentDetails,
  DetailsText,
  DetailsTextPDF,
  DetailsTitle,
  DetailsWrapper,
} from './Details.styled'
import { PdfViewer } from 'components/ui/PdfViewer/PdfViewer'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'
import { useAppDispatch } from 'store/hooks'

interface IDetails {
  name: string
  surname: string
  total: string
  id: number
}

export const Details: FC<IDetails> = ({ name, surname, total, id }) => {
  const dispatch = useAppDispatch()

  const callbackOpenPDF = () => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <PdfViewer id={id} />,
      }),
    )
  }

  return (
    <ContentDetails>
      <DetailsWrapper>
        <DetailsTitle>Name</DetailsTitle>
        <DetailsText>{name}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Surname</DetailsTitle>
        <DetailsText>{surname}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Total Drug</DetailsTitle>
        <DetailsText>{total}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Verbal Process</DetailsTitle>
        <DetailsTextPDF
          onClick={
            callbackOpenPDF
          }>{`${name?.toLowerCase()}-${surname?.toLowerCase()}.pdf`}</DetailsTextPDF>
      </DetailsWrapper>
    </ContentDetails>
  )
}
