import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IModalSlice {
  isOpenModal: boolean
  childModal: JSX.Element | null
}

const initialState: IModalSlice = {
  isOpenModal: false,
  childModal: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    SET_SHOW_MODAL(state, action: PayloadAction<IModalSlice>) {
      const { isOpenModal, childModal } = action.payload
      state.isOpenModal = isOpenModal
      state.childModal = childModal
    },
  },
})

export const { SET_SHOW_MODAL } = modalSlice.actions

export const modalReducer = modalSlice.reducer
