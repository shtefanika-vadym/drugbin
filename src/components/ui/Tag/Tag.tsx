import type { FC } from 'react'

import { StyledTag } from './Tag.styled'
import { TagProps, TagVariantType } from './Tag.type'

const toTagText = (tagVariant: TagVariantType) => {
  switch (tagVariant) {
    case TagVariantType.PENDING:
      return 'În progres'
    case TagVariantType.APPROVED:
      return 'Aprobat'
    case TagVariantType.COLLECTED:
      return 'Distrus'
    case TagVariantType.DENY:
      return 'Respins'
    case TagVariantType.DEFAULT:
      return 'Implicită'
  }
}

export const Tag: FC<TagProps> = (props) => {
  const { variant = 'pending' } = props

  return (
    <StyledTag variant={variant as TagVariantType}>{toTagText(variant as TagVariantType)}</StyledTag>
  )
}
