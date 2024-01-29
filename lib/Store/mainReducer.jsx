import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'store',
  initialState: {
    data:{}
  },
//   initialState: {
//     data:{'Savings & Budgeting':[],Investment:[]}
//   },
  reducers: {
    // pushCategory: (state,action) => {
    //   state.data[action.payload.category]=[]
    // },
    pushElement: (state,action) => {
      let cat=action.payload.category;
      if(cat in state.data){
        state.data[cat].push(action.payload.element);
      }else{
        state.data[cat]=[action.payload.element];
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { pushCategory,pushElement,pushDataIntoElement } = counterSlice.actions

export default counterSlice.reducer