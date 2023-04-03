export type TagVriant = 'pending' | 'recycled'

export interface TagProps {
  variant?: TagVriant
  children?: React.ReactNode
}

export type StyledButtonProps = Required<Pick<TagProps, 'variant'>>
