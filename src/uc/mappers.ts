import {
  DocumentsVerbalProcess,
  DocumentsVerbalProcessResponse
} from 'common/types/documents.types'
import { ManagementEntry, ManagementEntryResponse, ManagementResponse, ManagementType } from 'common/types/managament.types'
import { customDateFormat, customTimeFormat } from 'common/utils/utils'
import { TagVriantType } from 'components/ui/Tag/Tag.type'

const toManagementData = (input: ManagementEntryResponse, index: number): ManagementEntry => ({
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

export const toManagementEntry = (input: ManagementResponse): ManagementType => ({
  data: input.data.map((entry, index) =>
    toManagementData(entry, index),
  ),
  totalItems: input.totalItems,
})

export const toDocumentsVerbalProcess = (
  input: DocumentsVerbalProcessResponse[],
): DocumentsVerbalProcess[] => {
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
