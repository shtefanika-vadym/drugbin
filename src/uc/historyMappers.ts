import type { CollectDataParser, CollectParser } from 'common/interfaces/History'
import { UtilService } from 'common/services/utilService'

// TODO: --> REPLACE ANY

export const allEntry = (input: any): any => input.map((entry: any) => toEntry(entry))

const toEntry = (input: any) => {
  return {
    key: input.id,
    name: {
      name: input?.drugDetails?.name,
      id: 'W64020007',
    },
    recycle: {
      data: UtilService.formatDate(input.createdAt),
      time: UtilService.formatTime(input.createdAt),
    },
    quantity: input.quantity,
    pack: UtilService.transformText(input.pack),
    status: 'collected',
    action: 'icon',
  }
}

export const collectAllEntry = (input: CollectParser) => {
  return {
    data: input.data.map((entry: CollectDataParser) => toCollectEntry(entry)),
    totalItems: input.totalItems,
  }
}

const toCollectEntry = (input: CollectDataParser) => ({
  pharma: `${input.firstName} ${input.lastName}`,
  quantity: input.id,
  status: input.status,
  id: input.id,
  drugList: input.drugList,
  firstName: input.firstName,
  lastName: input.lastName,
})

export const collectStatusTable = (input: any) => {
  return input.map((entry: any) => {
    return {
      key: entry?.drugId,
      name: {
        name: entry?.drugDetails?.name,
        id: entry?.drugId,
      },
      recycle: {
        data: UtilService.formatDate(entry?.drugDetails?.updatedAt),
        time: UtilService.formatTime(entry?.drugDetails?.updatedAt),
      },
      type: UtilService.transformText(entry?.type),
      quantity: entry?.quantity,
      pack: UtilService.transformText(entry?.pack),
      action: 'icon',
    }
  })
}
