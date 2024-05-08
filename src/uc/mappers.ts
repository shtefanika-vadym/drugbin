import { DocumentsVerbalProces, DocumentsVerbalProcesResponse } from 'common/interfaces/DocumentsProps'
import type {
  ManagementData,
  ManagementEntryParser,
  ManagementParser,
  ManagementResponse,
} from 'common/interfaces/ManagementTypes'
import { customDateFormat, customTimeFormat } from 'common/utils/utils'
import { TagVriantType } from 'components/ui/Tag/Tag.type'

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
  status: input.status as TagVriantType,
  drugList: input.drugList,
})

export const toManagementEntry = (input: ManagementParser): ManagementResponse => ({
  data: input.data.map((entry: ManagementEntryParser, index: number) =>
    toManagementData(entry, index),
  ),
  totalItems: input.totalItems,
})

export const toDocumentsVerbalProces = (
  input: DocumentsVerbalProcesResponse[],
): DocumentsVerbalProces[] => {
  return input.map((entry) => {
    return {
      createAt: {
        data: customDateFormat(entry.createdAt),
        time: customTimeFormat(entry.createdAt),
      },
      period: {
        startDate: customDateFormat(entry.startDate),
        endDate: customDateFormat(entry.endDate),
      },
      deletedAt: entry.deletedAt,
      id: entry.id,
      sharedAt: entry.sharedAt,
      documentId: entry.documentId,
    }
  })
}
