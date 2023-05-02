import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IRecycleSlice {
  isVerbalProcessOpen: boolean
}

const initialState: IRecycleSlice = {
  isVerbalProcessOpen: false,
}

export const recycleSlice = createSlice({
  name: 'recycle',
  initialState: initialState,
  reducers: {
    SET_OPEN_VERBAL_PROCESS(state, action: PayloadAction<boolean>) {
      state.isVerbalProcessOpen = action.payload
    },
  },
})

export const { SET_OPEN_VERBAL_PROCESS } = recycleSlice.actions
