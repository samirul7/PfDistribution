import { configureStore } from '@reduxjs/toolkit'
import weekListReducer from './features/Week/weekSlice'
import rateReducer from './features/Rate/rateSlice'
import pfReducer from './features/Pf/pfSlice'

export const store = configureStore({
  reducer: {
    weekList: weekListReducer,
    rate: rateReducer,
    pf: pfReducer,
  },
})
