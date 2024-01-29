import { createSlice } from '@reduxjs/toolkit'

export const refSlice = createSlice({
  name: 'store',
  initialState: {
    data:{}
  },
//   initialState: {
//     data:{category:[{element:[]},{element:[]}]}
//   },
  reducers: {
    pushKeypointsHeight: (state,action) => {
      state.data[action.payload.uniqueid]=action.payload.height;
    },
  }
})

// Action creators are generated for each case reducer function
export const { pushKeypointsHeight} = refSlice.actions

export default refSlice.reducer