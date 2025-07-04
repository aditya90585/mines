import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMultiplier, betAmt, revealedFalse, togglefooter, togglemain, revealedOne, revealAll, changeMines, boxesSet } from '../features/mines/mineSlices'
import { calculateSpribeMultiplier } from '../utils/multiplier'
import { FaChevronDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { PiBombFill } from "react-icons/pi";


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
     
      if (boxes[index] == "mines") {
        let minestapsound = "/sounds/lose.mp3"
        let audio = new Audio(minestapsound)
        audio.play()
       
        // const revealall = Array(5 * 5).fill("true")
        // setRevealed(revealall)
        dispatch(revealAll())

        dispatch(togglefooter(false))


      } else {
          let minestapsound = "/sounds/star-click.mp3"
        let audio = new Audio(minestapsound)
        audio.play()
        // let trueRevealed = revealed.filter(e => e != false).length + 1
        // console.log(trueRevealed)
        // const baseMultiplier = minesmultiplier[minesCount - 1];
        // console.log((baseMultiplier**trueRevealed))
      }
    }
  }

  const togglemineselector = () => {
    let minestapsound = "/sounds/minestap.mp3"
    let audio = new Audio(minestapsound)
    audio.play()
    setTogglemine(!togglemine)

  }

  const changemines = (mines) => {
    dispatch(changeMines(mines))
    let minestapsound = "/sounds/minestap.mp3"
    let audio = new Audio(minestapsound)
    audio.play()
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
    <main className={`flex flex-col justify-between items-center md:h-8/10 h-8/12  `}>
      <div className={`flex flex-col md:w-1/3 w-9/10 mt-2 ${footerselector ? "disable-main" : ""}`}>

        <div className=' bg-blue-900 h-6 rounded-2xl flex justify-between items-center'>
          <div className='flex items-center h-5 mx-1 '>
            <div onClick={togglemineselector} className='bg-sky-700 cursor-pointer rounded-xl w-35 h-5 text-white flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)]' >
              <span className='w-8/10 flex justify-center items-center ml-3'> Mines : {minesCount}</span>  <FaChevronDown className='w-2/10 text-xs' />
            </div>
            <div className={`h-55 w-43 bg-slate-800 fixed md:top-17 top-9 overflow-y-scroll z-10 rounded-xl ${togglemine ? "hidden" : ""}`}>
              {totalmines.map((mines, index) => {
                return <div key={index} onClick={() => changemines(mines)} className={` cursor-pointer text-white mx-4 mt-4 mb-4 h-5 flex justify-center items-center rounded-xl ${(minesCount) == mines ? "bg-sky-700" : "bg-sky-900"}`}>{mines}</div>
              })}


            </div>
          </div>
          <div className='bg-[#FFC107] rounded-xl px-8 mx-px text-sm  h-5'>Next: {multiplier.toFixed(2)}X</div>
        </div>
        <div className=' bg-blue-900 h-1 my-2 rounded-2xl flex justify-between items-center'></div>
      </div>
      <div className={`md:w-2/5 md:h-98  h-70 w-full bg-blue-600 rounded-2xl flex flex-wrap justify-center md:gap-x-1 gap-x-1 items-center ${mainselector ? "disable-main" : ""}`}>
        {boxes.map((box, index) => {
          return <div key={index} onClick={() => handleBoxclick(index)} className={`h-1/6 md:text-3xl text-xl  cursor-pointer w-1/6 md:rounded-xl rounded-md border-4  flex justify-center items-center
          ${footerselector? revealed[index]?"grad2": "grad-dark":"grad"
            }
          `}>
            {revealed[index] ? box == "safe" ? <div className={`h-full w-full flex  justify-center items-center `}><FaStar className='text-[#FEF4E0] h-8/10 w-8/10 drop-shadow-[6px_5px_4px_#F78513]' /></div> : <div className={`h-full w-full flex  justify-center items-center `}><PiBombFill className=' h-7/10 w-7/10 drop-shadow-[3px_3px_2px_black]' /></div> : <div className={`h-7 w-7 rounded-full gradcircle `}></div>}

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