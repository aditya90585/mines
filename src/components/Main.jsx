import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMultiplier, betAmt, revealedFalse, togglefooter, togglemain, revealedOne, revealAll, changeMines, boxesSet } from '../features/mines/mineSlices'
import { calculateSpribeMultiplier } from '../utils/multiplier'


const Main = () => {
  const minesCount = useSelector(state => state.minesCount)
  const multiplier = useSelector(state => state.multiplier);
  const boxes = useSelector(state => state.boxes)
  const revealed = useSelector(state => state.revealed)
  const [maindisable, setMaindisable] = useState(true)
  const [togglemine, setTogglemine] = useState(true)
  const [totalmines, setTotalmines] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
  const [minesmultiplier, setMinesmultiplier] = useState([
    1.01,
    1.05,
    1.10,
    1.15,
    1.21,
    1.27,
    1.34,
    1.42,
    1.51,
    1.61,
    1.73,
    1.86,
    2.02,
    2.20,
    2.42,
    2.69,
    3.03,
    3.46,
    4.04,
    4.85])

  const mainselector = useSelector(state => state.disablemain)
  const footerselector = useSelector(state => state.disablefooter)
  const dispatch = useDispatch()

  useEffect(() => {
    resetGame();
  }, [minesCount]);


  const resetGame = () => {
    const newBoxes = Array(5 * 5).fill("safe")
    let index = 0
    while (index < minesCount) {
      const random = Math.floor(Math.random() * newBoxes.length)
      if (newBoxes[random] !== "mines") {
        newBoxes[random] = "mines"
        index++
      }
    }

    setMaindisable(true)
    dispatch(togglemain(true))
    dispatch(boxesSet(newBoxes))
    dispatch(revealedFalse())
    // setRevealed(Array(5 * 5).fill(false))
  }


  const handleBoxclick = (index) => {
    if (footerselector) {

      dispatch(revealedOne(index))
      console.log(revealed)

      if (boxes[index] == "mines") {
        alert("you lose 💣")
        // const revealall = Array(5 * 5).fill("true")
        // setRevealed(revealall)
        dispatch(revealAll())
        setTimeout(() => {
          dispatch(togglefooter(false))
          resetGame()
        }, 1500);
      } else {
        // let trueRevealed = revealed.filter(e => e != false).length + 1
        // console.log(trueRevealed)
        // const baseMultiplier = minesmultiplier[minesCount - 1];
        // console.log((baseMultiplier**trueRevealed))
      }
    }
  }

  const togglemineselector = () => {
    setTogglemine(!togglemine)
  }

  const changemines = (mines) => {
    dispatch(changeMines(mines))
    console.log(minesCount)
    setTogglemine(true)
  }
  //  function calculateSpribeMultiplier(clicks, mines, total = 25) {
  //   if (clicks === 0) return 1.0;

  //   const firstClickMap = {
  //     1: 1.01, 2: 1.05, 3: 1.10, 4: 1.15, 5: 1.21,
  //     6: 1.27, 7: 1.34, 8: 1.42, 9: 1.51, 10: 1.61,
  //     11: 1.73, 12: 1.86, 13: 2.02, 14: 2.20, 15: 2.42,
  //     16: 2.69, 17: 3.03, 18: 3.46, 19: 4.04, 20: 4.85
  //   };

  //   if (clicks === 1 && firstClickMap[mines]) {
  //     return firstClickMap[mines];
  //   }

  //   const houseEdge = 0.038; // Tuned to match Spribe multipliers
  //   let prob = 1;
  //   for (let i = 0; i < clicks; i++) {
  //     prob *= (total - mines - i) / (total - i);
  //   }

  //   const multiplier = (1 - houseEdge) / prob;
  //   return Number(multiplier.toFixed(2));
  // }




  const safeClickCount = useMemo(() => {
    return revealed.filter(v => v === true).length;
  }, [revealed]);

  // const multiplier = useMemo(() => {
  //   return calculateSpribeMultiplier(safeClickCount + 1, minesCount);
  // }, [safeClickCount, minesCount]);



  useEffect(() => {
    const newMultiplier = calculateSpribeMultiplier(safeClickCount + 1, minesCount);
    dispatch(setMultiplier(newMultiplier));
  }, [safeClickCount, minesCount]);


  return (
    <main className={`flex flex-col justify-between items-center md:h-8/10 h-8/11  `}>
      <div className={`flex flex-col md:w-1/3 w-9/10 mt-2 ${footerselector ? "disable-main" : ""}`}>

        <div className=' bg-blue-900 h-6 rounded-2xl flex justify-between items-center'>
          <div className='flex items-center h-5 mx-px '>
            <div onClick={togglemineselector} className='bg-sky-700 cursor-pointer rounded-xl px-8 h-5 text-white flex justify-center items-center' >
              Mines : {minesCount}
            </div>
            <div className={`h-55 w-43 bg-slate-800 fixed md:top-17 top-9 overflow-y-scroll rounded-xl ${togglemine ? "hidden" : ""}`}>
              {totalmines.map((mines, index) => {
                return <div key={index} onClick={() => changemines(mines)} className={` cursor-pointer text-white mx-4 mt-4 mb-4 h-5 flex justify-center items-center rounded-xl ${(minesCount) == mines ? "bg-sky-700" : "bg-sky-900"}`}>{mines}</div>
              })}


            </div>
          </div>
          <div className='bg-[#FFC107] rounded-xl px-8 mx-px text-sm text-white h-5'>Next: {multiplier.toFixed(2)}X</div>
        </div>
        <div className=' bg-blue-900 h-1 my-2 rounded-2xl flex justify-between items-center'></div>
      </div>
      <div className={`md:w-1/3 md:h-86  h-60 w-8/10 bg-blue-600 rounded-2xl flex flex-wrap justify-between md:gap-x-2 gap-x-1 items-center ${mainselector ? "disable-main" : ""}`}>
        {boxes.map((box, index) => {
          return <div key={index} onClick={() => handleBoxclick(index)} className={`h-1/6 md:text-3xl text-xl cursor-pointer w-1/6 md:rounded-xl rounded-md border-4  flex justify-center items-center
          ${revealed[index]

              ? "grad2"
              : "grad"
            }
          `}>
            {revealed[index] ? box == "safe" ? "🌟" : "💣" : <div className={`h-5 w-5 rounded-full gradcircle `}></div>}

            {/* <div className={`h-5 w-5 rounded-full gradcircle `}></div> */}
          </div>
        })}

      </div>
      <div className='flex md:w-1/3 w-9/10 h-8 justify-between items-center mt-3 mb-2 space-x-1'>
        <div className='w-1/2 bg-sky-700 border border-gray-800 rounded-xl flex justify-center items-center text-white font-semibold font-sans '>RANDOM</div>
        <div className='w-1/2 bg-blue-900 border border-gray-800 rounded-xl flex justify-center items-center text-white font-semibold font-sans '>

          AUTOGAME
        </div>

      </div>
    </main>

  )
}

export default Main