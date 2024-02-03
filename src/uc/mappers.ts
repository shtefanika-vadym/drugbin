import type {
  ManagementData,
  ManagementEntryParser,
  ManagementParser,
  ManagementResponse,
} from 'common/interfaces/ManagementTypes'
import { customDateFormat, customTimeFormat } from 'common/utils/utils'

const toManagementData = (input: ManagementEntryParser, index: number): ManagementData => ({
  key: index,
  user: {
    name: `${input.firstName} ${input.lastName}`,
    id: input.recycleId,
  },
  createAt: {
    date: customDateFormat(input.createdAt),
    time: customTimeFormat(input.createdAt),
  },
  quantity: input.drugList.length,
  status: input.status,
  drugList: input.drugList,
})

export const toManagementEntry = (input: ManagementParser): ManagementResponse => ({
  data: input.data.map((entry: ManagementEntryParser, index: number) =>
    toManagementData(entry, index),
  ),
  totalItems: input.totalItems,
})
