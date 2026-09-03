import { WDS_COLOR_GREY } from 'common/styles/colors'
import { Pagination } from 'components/ui/Pagination/Pagination'
import { SelectMenu } from 'components/ui/SelectMenu/SelectMenu'
import { Text } from 'components/ui/Text/Text'
import { PaginationMeta, PaginationRow } from './list.styled'

export const PAGE_SIZE_OPTIONS = [10, 20, 30]
const PAGE_SIZE_MENU = PAGE_SIZE_OPTIONS.map((n) => ({ value: String(n), label: `${n} / pagină` }))

interface Props {
  total: number
  /** [singular, plural] for the row count, e.g. ['spital', 'spitale']. */
  noun: [string, string]
  page: number
  totalPages: number
  onPage: (page: number) => void
  pageSize: number
  onPageSize: (size: number) => void
}

/** The count + rows-per-page picker + page numbers strip shared by every admin list screen. */
export const PageControls: React.FC<Props> = ({
  total,
  noun,
  page,
  totalPages,
  onPage,
  pageSize,
  onPageSize,
}) => (
  <PaginationRow>
    <PaginationMeta>
      <Text variant='bodyS' color={WDS_COLOR_GREY}>
        {total} {total === 1 ? noun[0] : noun[1]}
      </Text>
      <SelectMenu
        ariaLabel='Rânduri pe pagină'
        value={String(pageSize)}
        options={PAGE_SIZE_MENU}
        onChange={(v) => onPageSize(Number(v))}
      />
    </PaginationMeta>
    <Pagination current={page} total={totalPages + 1} maxVisible={7} onChange={onPage} />
  </PaginationRow>
)
