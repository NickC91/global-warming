import { createSlice } from '@reduxjs/toolkit'
import instance from '../API'

const initialState = {
  loading: true,
  error: {
    status: false,
    message: "",
  },
  warming: [],
  cache: null
}

const dataSlice = createSlice({
  name: 'dataGlobalWarming',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
      state.warming = []
    },
    stopLoading: (state) => {
      state.loading = false
    },
    saveDate: (state, action) => {
      state.warming = action.payload
    },
    catchError: (state, action) => {
      state.error.status = true
      state.error.message = action.payload
      state.warming = []
    },
    cleanError: (state) => {
      state.error.status = false
      state.error.message = ""
    },
    cleanCache: (state) => {
      state.cache = null // Resetta la cache
    },
  }
})

const { startLoading, stopLoading, saveDate, catchError, cleanError } = dataSlice.actions

const { reducer } = dataSlice

export const fetchData = (path) => async (dispatch, getState) => {
  dispatch(startLoading())
  dispatch(cleanError())
  try {
    const response = await instance.get(path)
    if (response?.data === 0) {
      dispatch(catchError('Nessun dato trovato'))
      dispatch(stopLoading())
      return
    }
    dispatch(saveDate(response.data))
  } catch (error) {
    dispatch(catchError(error.message))
  }
  dispatch(stopLoading())
}

export { catchError, cleanError, stopLoading }

export default reducer