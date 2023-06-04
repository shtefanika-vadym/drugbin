import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IRecycleSlice {
  isVerbalProcessOpen: boolean
  drugsSize: number
  type: string
  collectData: {
    firstName: string
    lastName: string
    email: string | null
    pharmacyId: number
    drugList: {
      drugName: {
        drugId: number
        name: string
        value: string
      }
      pack: string
      quantity: number
      expirationDate: string | null
      lot: string
    }[]
  }
}

const initialState: IRecycleSlice = {
  isVerbalProcessOpen: false,
  drugsSize: 1,
  type: 'manual',
  collectData: {
    firstName: '',
    lastName: '',
    email: null,
    pharmacyId: 1,
    drugList: [
      {
        drugName: {
          drugId: null,
          name: '',
          value: '',
        },
        pack: 'Pack',
        quantity: 1,
        expirationDate: null,
        lot: '',
      },
    ],
  },
}

export const recycleSlice = createSlice({
  name: 'recycle',
  initialState: initialState,
  reducers: {
    SET_DATA(state, action: PayloadAction<{ name: string; value: string }>) {
      state.collectData = {
        ...state.collectData,
        [action.payload.name]: action.payload.value,
      }
    },
    SET_NEW_DRUG(state) {
      state.collectData.drugList = [
        ...state.collectData.drugList,
        initialState.collectData.drugList[0],
      ]
    },
    SET_DATA_DRUG(state, action: PayloadAction<any>) {
      state.collectData.drugList[action.payload.key] = {
        ...state.collectData.drugList[action.payload.key],
        [action.payload.name]: action.payload.value,
      }
    },
    SET_OPEN_VERBAL_PROCESS(state, action: PayloadAction<boolean>) {
      state.isVerbalProcessOpen = action.payload
    },
    SET_DRUGS_SIZE(state, action: PayloadAction<number>) {
      state.drugsSize = action.payload
    },
    SET_TO_INITIAL(state) {
      state.collectData = initialState.collectData
      state.drugsSize = initialState.drugsSize
      state.isVerbalProcessOpen = initialState.isVerbalProcessOpen
    },
    SET_TYPE(state, action: PayloadAction<string>) {
      state.type = action.payload
    },
    SET_DRUGS_FROM_CAMERA(state, action: PayloadAction<any>) {
      state.collectData.drugList = action.payload
    },
    DELETE_DRUG_BY_ID(state, action: PayloadAction<number>) {
      state.collectData.drugList.splice(action.payload, 1)
      state.drugsSize = state.drugsSize - 1
    },
  },
})

export const {
  SET_OPEN_VERBAL_PROCESS,
  SET_DATA,
  SET_NEW_DRUG,
  SET_DATA_DRUG,
  SET_DRUGS_SIZE,
  SET_TO_INITIAL,
  SET_TYPE,
  SET_DRUGS_FROM_CAMERA,
  DELETE_DRUG_BY_ID,
} = recycleSlice.actions
