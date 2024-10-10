import { createSlice } from '@reduxjs/toolkit'

const pfSlice = createSlice({
  name: 'pf',
  initialState: {
    pfDistributionArray: [],
    pfArray: [],
    pfAmount: '',
    pfDistribution: [],
    pfCalculation: {},
    pfInput: '',
    wageInput: '',
    isPfSelected: true, // false => wage seleted
  },
  reducers: {
    updatepfDistributionArray(state, action) {
      state.pfDistributionArray = action.payload
    },
    updatePfArray(state, action) {
      state.pfArray = action.payload
    },
    updatePfAmount(state, action) {
      state.pfAmount = action.payload
    },
    updatepfDistribution(state, action) {
      state.pfDistribution = action.payload
    },
    updatePfCalculation(state, action) {
      state.pfCalculation = action.payload
    },
    updatePfInput(state, action) {
      state.pfInput = action.payload
    },
    updateWageInput(state, action) {
      state.wageInput = action.payload
    },
    updateIsPfSelected(state, action) {
      state.isPfSelected = action.payload
    },
  },
})

export const {
  updatepfDistributionArray,
  updatePfArray,
  updatePfAmount,
  updatepfDistribution,
  updatePfCalculation,
  updatePfInput,
  updateWageInput,
  updateIsPfSelected,
} = pfSlice.actions
export default pfSlice.reducer
