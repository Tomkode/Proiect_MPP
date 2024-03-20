import { createSlice } from '@reduxjs/toolkit'

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    id: 0,
    name: "",
    calories: -1,
    fat: -1,
    carbs: -1,
    protein: -1
  },
  reducers: {
    update: (state, entity) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
        state = entity.payload;

        console.log(state)
      
    },
    close: (state) => {
      state= {
        id: 0,
        name: "",
        calories: -1,
        fat: -1,
        carbs: -1,
        protein: -1
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { update, close } = viewSlice.actions

export default viewSlice.reducer