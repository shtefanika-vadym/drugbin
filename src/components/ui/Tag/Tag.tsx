import type { FC } from 'react'

import { StyledTag } from './Tag.styled'
import type { TagProps, TagVriant } from './Tag.type'

const toTagText = (tagVariant: TagVriant) => {
  switch (tagVariant) {
    case 'pending':
      return 'În progres'
    case 'approved':
      return 'Aprobat'
    case 'recycled':
      return 'Distrus'
    case 'deny':
      return 'Respins'
  }
}

export const Tag: FC<TagProps> = (props) => {
  const { variant = 'pending' } = props

  return <StyledTag variant={variant}>{toTagText(variant)}</StyledTag>
}
