import { ContentDetails, DetailsText, DetailsTitle, DetailsWrapper } from './Details.styled'

export const Details = () => {
  return (
    <ContentDetails>
      <DetailsWrapper>
        <DetailsTitle>Name</DetailsTitle>
        <DetailsText>Farmacia Ropharma</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Location</DetailsTitle>
        <DetailsText>Strada Alexandru Cel Bun</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Schedule</DetailsTitle>
        <DetailsText>08:00-21:00</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Phone</DetailsTitle>
        <DetailsText>(0230) 521 754</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Total Quantity</DetailsTitle>
        <DetailsText>6 kg</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>RX</DetailsTitle>
        <DetailsText>2 kg</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>OTC</DetailsTitle>
        <DetailsText>1 kg</DetailsText>
      </DetailsWrapper>
      <DetailsWrapper>
        <DetailsTitle>Supplement</DetailsTitle>
        <DetailsText>3 kg</DetailsText>
      </DetailsWrapper>
    </ContentDetails>
  )
}
