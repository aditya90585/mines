import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     totalAmt:3000
}

 export const minesSlices =   createSlice({
    name:"mines",
    initialState,
    reducers:{
        betAmt:(state,action)=>{
          state.totalAmt = state.totalAmt - action.payload
        },
        cashOutAmt:(state,action)=>{

        }
    }
})


export const {betAmt,cashOutAmt}  = minesSlices.actions

export const minesReducers =  minesSlices.reducer