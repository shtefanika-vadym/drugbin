export type TagVriant = 'pending' | 'recycled' | 'approved' | 'deny'

export interface TagProps {
  variant?: TagVriant
  children?: React.ReactNode
}

export type StyledButtonProps = Required<Pick<TagProps, 'variant'>>
