import type { CollectDataParser, CollectParser } from 'common/interfaces/HistoryTypes'
import { UtilService } from 'common/services/utilService'
import { capitalize } from 'lodash-es'

// TODO: --> REPLACE ANY
export const allEntry = (input: any): any => {
  return {
    data: input.data.map((entry: any) => toEntry(entry)),
    totalItems: input.totalItems,
  }
}

const toEntry = (input: any) => {
  return {
    key: input.id,
    name: {
      name: input?.drugDetails?.name,
      id: 'W64020007',
    },
    recycle: {
      data: UtilService.formatDate(input?.drugDetails?.createdAt),
      time: UtilService.formatTime(input?.drugDetails?.createdAt),
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

export const verbalProcessData = (input: any) => {
  return {
    generationDate: input.generationDate,
    pharmaName: input.drugDetails.chain.name,
    clientName: `${input.drugDetails.firstName}  ${input.drugDetails.lastName}`,
    drugList: input.drugDetails.drugList.map((entry: any, key: number) =>
      toVerbalProcesDrugList(entry, key),
    ),
  }
}

const toVerbalProcesDrugList = (entry: any, key: number) => {
  return {
    key: key + 1,
    quantity: entry.quantity,
    pack: capitalize(entry.pack),
    name: {
      name: entry.drugDetails.name,
      drugId: entry.drugId,
    },
    isPsycholeptic: entry.drugDetails.isPsycholeptic,
  }
}
