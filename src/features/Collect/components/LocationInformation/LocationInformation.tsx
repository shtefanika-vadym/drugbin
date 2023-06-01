import type { ChangeEvent } from 'react'
import { useState } from 'react'

import mapImg from 'common/assets/icons/MAP.png'

import { Input } from 'common/components/Input/Input'

import {
  Image,
  Location,
  LocationInformationWrapper,
  Name,
  PharmaCardDetails,
  Schedule,
} from './LocationInformation.styled'

export const LocationInformation = () => {
  const [search, setSearch] = useState<string>('')

  const handleChange = (values: ChangeEvent<HTMLInputElement>) => {
    const { value } = values.target
    setSearch(value)
  }

  return (
    <LocationInformationWrapper>
      <Input
        type='search'
        label='Search location/ address'
        value={search}
        onChange={(e) => handleChange(e)}
        placeholder='EX: Tipografiei 1'
      />
      <div>
        <Image src={mapImg} />
        <PharmaCardDetails>
          <Schedule>Mo-Fr 8:00 – 22.00</Schedule>
          <Name>Farmacia Inimii Catena</Name>
          <Location>Tipografiei 1, Suceava, SUCEAVA</Location>
        </PharmaCardDetails>
      </div>
    </LocationInformationWrapper>
  )
}
