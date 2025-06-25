import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     totalAmt:3000,
     disablefooter:false,
     disablemain:true

}

 export const minesSlices =   createSlice({
    name:"mines",
    initialState,
    reducers:{
        betAmt:(state,action)=>{
          state.totalAmt = state.totalAmt - action.payload
        },
        cashOutAmt:(state,action)=>{

        },
        togglemain:(state,action)=>{
          state.disablemain = action.payload
        },
        togglefooter:(state,action)=>{
          state.disablefooter = action.payload
        }

    }
})


export const {betAmt,cashOutAmt,togglemain,togglefooter}  = minesSlices.actions

export const minesReducers =  minesSlices.reducer