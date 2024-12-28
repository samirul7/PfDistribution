import { createSlice } from '@reduxjs/toolkit'

const rateSlice = createSlice({
  name: 'rate',
  initialState: {
    wage: '160',
    bonus: '42',
    rateLockStatus: true,
  },
  reducers: {
    updateRate(state, action) {
      state.bonus = action.payload.bonus
      state.wage = action.payload.wage
      state.rateLockStatus = true
    },
    updateRateLockStatus(state, action) {
      state.rateLockStatus = action.payload
    },
  },
})

export const { updateRate, updateRateLockStatus } = rateSlice.actions
export default rateSlice.reducer
