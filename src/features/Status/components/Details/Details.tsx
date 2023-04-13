import type { FC } from 'react'

import { ContentDetails, DetailsText, DetailsTitle, DetailsWrapper } from './Details.styled'

interface IDetails {
  name: string
  location: string
  schedule: string
  phone: string
  total: number
  rx: number
  otc: number
  supplement: number
}

export const Details: FC<IDetails> = ({
  name,
  location,
  schedule,
  phone,
  total,
  rx,
  otc,
  supplement,
}) => {
  return (
    <ContentDetails>
      <DetailsWrapper>
        <DetailsTitle>Name</DetailsTitle>
        <DetailsText>{name}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Location</DetailsTitle>
        <DetailsText>{location}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Schedule</DetailsTitle>
        <DetailsText>{schedule}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Phone</DetailsTitle>
        <DetailsText>{phone}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Total Quantity</DetailsTitle>
        <DetailsText>{`${total} mg`}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>RX</DetailsTitle>
        <DetailsText>{`${rx} kg`}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>OTC</DetailsTitle>
        <DetailsText>{`${otc} kg`}</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Supplement</DetailsTitle>
        <DetailsText>{`${supplement} kg`}</DetailsText>
      </DetailsWrapper>
    </ContentDetails>
  )
}
