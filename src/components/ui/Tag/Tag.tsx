import type { FC } from 'react'

import { StyledTag } from './Tag.styled'
import { TagProps, TagVriantType } from './Tag.type'

const toTagText = (tagVariant: TagVriantType) => {
  switch (tagVariant) {
    case TagVriantType.PENDING:
      return 'În progres'
    case TagVriantType.APPROVED:
      return 'Aprobat'
    case TagVriantType.COLLECTED:
      return 'Distrus'
    case TagVriantType.DENY:
      return 'Respins'
  }
}

export const Tag: FC<TagProps> = (props) => {
  const { variant = 'pending' } = props

  return (
    <StyledTag variant={variant as TagVriantType}>{toTagText(variant as TagVriantType)}</StyledTag>
  )
}
