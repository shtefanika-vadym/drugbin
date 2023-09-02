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

export const recycleAllEntry = (input: any) => input.map((entry: any) => toRecycleEntry(entry))

const toRecycleEntry = (input: any) => {
  return {
    pharma: `${input.firstName} ${input.lastName}`,
    quantity: input.id,
    status: input.status,
    id: input.id,
  }
}
