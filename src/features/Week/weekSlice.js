import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const weekSlice = createSlice({
  name: 'weekList',
  initialState: {
    weekListInput: new Array(4).fill({}).map(() => ({ id: uuid(), value: '' })),
    weekList: [],
    weekListLockStatus: false,
    totalBeedi: 0,
  },
  reducers: {
    updateWeekList(state, action) {
      state.weekList = action.payload
      state.totalBeedi = action.payload.reduce(
        (acc, curr) => acc + Number(curr.value),
        0
      )
      state.weekListLockStatus = true
    },
    updateWeekListLockStatus(state, action) {
      state.weekListLockStatus = action.payload
    },
    updateWeekListInput(state, action) {
      state.weekListInput = action.payload
    },
  },
})

export const { updateWeekList, updateWeekListLockStatus, updateWeekListInput } =
  weekSlice.actions
export default weekSlice.reducer
