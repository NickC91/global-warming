import { configureStore } from "@reduxjs/toolkit";
import ApiReducers from './ApiReducers'

export const Store = configureStore({
  reducer: {
    warming: ApiReducers
  }
})