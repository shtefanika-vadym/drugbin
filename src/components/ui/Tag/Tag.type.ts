export enum TagVariantType {
  PENDING = 'pending',
  COLLECTED = 'recycled',
  APPROVED = 'approved',
  DENY = 'deny',
  DEFAULT = 'default'
}

export interface TagProps {
  variant?: TagVariantType
  children?: React.ReactNode
}

export type StyledButtonProps = Required<Pick<TagProps, 'variant'>>
