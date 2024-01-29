import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './mainReducer'
export default configureStore({
  reducer: {
    mainStore: mainReducer,
  }
})