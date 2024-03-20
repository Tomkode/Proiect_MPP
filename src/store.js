import { configureStore } from '@reduxjs/toolkit'
import entitiesReducer from './entitiesSlice'
import viewReducer from './viewSlice'
export default configureStore({
  reducer: {
    'entities' : entitiesReducer,
    'view' : viewReducer,
  },
})