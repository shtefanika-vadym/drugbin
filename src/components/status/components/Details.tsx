import type { FC } from 'react'

import { useAppDispatch } from 'store/hooks'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import {
  ContentDetails,
  DetailsText,
  DetailsTextPDF,
  DetailsTitle,
  DetailsWrapper,
} from './Details.styled'
import { PdfEditor } from 'components/ui/PdfEditor/PdfEditor'

interface IDetails {
  name: string
  surname: string
  total: string
  id: number | string
}

export const Details: FC<IDetails> = ({ name, surname, total, id }) => {
  const dispatch = useAppDispatch()
  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }
  const callbackOpenPDF = () => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <PdfEditor idTask={id} handleCloseModal={handleCloseModal} />,
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
