import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmt: 3000,
  disablefooter: false,
  disablemain: true,
  revealed: [],
  betamount: "10.00",
  minesCount: 3,
  cashOutamount: 0,
  multiplier: 1.00,
  boxes: [],
  navcashout: true,
  cashoutNotification: null,
}

export const minesSlices = createSlice({
  name: "mines",
  initialState,
  reducers: {
    betAmt: (state, action) => {
      state.totalAmt = state.totalAmt - action.payload
    },
    cashOutAmt: (state, action) => {

    },
    togglemain: (state, action) => {
      state.disablemain = action.payload
    },
    togglefooter: (state, action) => {
      state.disablefooter = action.payload
    },
    revealedFalse: (state, action) => {
      const falsearray = Array(5 * 5).fill(false)
      state.revealed = falsearray
    },
    revealedOne: (state, action) => {
      const newRevealed = state.revealed
      newRevealed[action.payload] = true
      state.revealed = newRevealed
        
    },
    revealAll: (state, action) => {
      const revealall = Array(5 * 5).fill(true)
      state.revealed = revealall

    },
    changebetValue: (state, action) => {
      if (action.payload == ".") {
        if (!state.betamount.includes(".")) {
          state.betamount = state.betamount + action.payload
        }
      }
      else if (action.payload == "delete") {
        state.betamount = state.betamount.slice(0, -1)
      } else {
        state.betamount = state.betamount + action.payload.toString()
      }
    },
    changebetFix: (state, action) => {
      if (state.betamount >= 100 && action.payload == true) {
        state.betamount = "100"
      } else if (state.betamount <= 0 && action.payload == true) {
        state.betamount = "0.10"
      }else if (state.betamount == "." && action.payload == true) {
        state.betamount = "0.10"
      }else if (state.betamount == NaN && action.payload == true) {
        state.betamount = "0.10"
      }
    },
    changefixbettomin: (state, action) => {
      if (action.payload == false) {
        state.betamount = ""
      }
    },
    fixBets: (state, action) => {
      state.betamount = action.payload.toFixed(2).toString()
    },
    changeMines: (state, action) => {
      state.minesCount = action.payload
    },
    cashOutbetamount: (state, action) => {
      state.totalAmt = state.totalAmt + action.payload

    },
    setMultiplier: (state, action) => {
      state.multiplier = action.payload;
    },
    setcashOutamount: (state, action) => {
      state.cashOutamount = Number(state.betamount) * action.payload
    },
    boxesSet: (state, action) => {
      state.boxes = action.payload
    },
    addfixBet: (state, action) => {
      state.betamount = action.payload
    },
    setNavcashout: (state, action) => {
      state.navcashout = !state.navcashout
    },
    setCashoutNotification: (state, action) => {
      state.cashoutNotification = action.payload;
    },
    clearCashoutNotification: (state) => {
      state.cashoutNotification = null;
    }
  }
})


export const { boxesSet, setNavcashout, changefixbettomin, clearCashoutNotification, setCashoutNotification, addfixBet, setMultiplier, setcashOutamount, cashOutbetamount, changeMines, fixBets, betAmt, cashOutAmt, togglemain, togglefooter, revealedFalse, revealedOne, revealAll, changebetValue, changebetFix } = minesSlices.actions

export const minesReducers = minesSlices.reducer