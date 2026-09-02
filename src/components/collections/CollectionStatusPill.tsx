import { Pill } from './CollectionStatusPill.styled'

interface Props {
  status: 'open' | 'finalized'
}

/** "În desfășurare" (open) / "Finalizată" (finalized) status chip for a collection. */
export const CollectionStatusPill: React.FC<Props> = ({ status }) => (
  <Pill tone={status === 'open' ? 'progress' : 'done'}>
    {status === 'open' ? 'În desfășurare' : 'Finalizată'}
  </Pill>
)
