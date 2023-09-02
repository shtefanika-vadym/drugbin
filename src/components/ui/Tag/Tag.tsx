import type { FC } from 'react'

import { StyledTag } from './Tag.styled'
import type { TagProps } from './Tag.type'

export const Tag: FC<TagProps> = (props) => {
  const { variant = 'pending', children } = props
  return <StyledTag variant={variant}>{children}</StyledTag>
}
