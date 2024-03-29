// import { createSlice } from '@reduxjs/toolkit'
// export const entitiesSlice = createSlice({
//   name: 'entities',
//   initialState: initialStt,
//   reducers: {
//     add: (state, name, calories, fat, carbs, protein) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes.
//       // Also, no return statement is required from these functions.
      
//         let entry = { 
//           id: getNextId(),
//           name : name,
//            calories : calories,
//             fat : fat, 
//             carbs : carbs, 
//             protein: protein }
//         state.entities.push(entry)
//         console.log(state)
      
//     },
    
//   },
// })

// // Action creators are generated for each case reducer function
// export const { add } = entitiesSlice.actions

// export default entitiesSlice.reducer