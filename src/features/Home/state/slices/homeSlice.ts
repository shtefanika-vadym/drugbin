import { createSlice } from '@reduxjs/toolkit'

import { REDUCER_CONSTANTS } from 'common/constants/reducerConstants'

import type { IHomeSlice } from 'features/Home/state/interfaces/IHomeSlice'

const initialState: IHomeSlice = {}

export const homeSlice = createSlice({
  name: REDUCER_CONSTANTS.HOME,
  initialState: initialState,
  reducers: {},
})
