import { StatusTone, StyledStatusTag } from './StatusTag.styled'

/** Small status pill, styled like `components/ui/Tag` but with free text (Activ / Suspendat / …). */
export const StatusTag: React.FC<{ tone: StatusTone; children: React.ReactNode }> = ({ tone, children }) => (
  <StyledStatusTag tone={tone}>{children}</StyledStatusTag>
)
