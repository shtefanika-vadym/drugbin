export enum TagVriantType {
  PENDING = 'pending',
  RECYCLED = 'recycled',
  APPROVED = 'approved',
  DENY = 'deny'
}

export interface TagProps {
  variant?: TagVriantType
  children?: React.ReactNode
}

export type StyledButtonProps = Required<Pick<TagProps, 'variant'>>
