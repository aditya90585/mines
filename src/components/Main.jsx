import React, { useState, useEffect, useMemo } from 'react'
import { handleFlip } from '../utils/handleFlip'
import { useSelector, useDispatch } from 'react-redux'
import { setMultiplier, betAmt, SetbetState, SetautorevealState, Setautogamingstate, toggleAutoGame, toggleMenu, togglehowtoplay, revealedFalse, togglefooter, togglemain, revealedOne, revealAll, changeMines, boxesSet, SetselectAutoBoxes, selectAutoOne } from '../features/mines/mineSlices'
import { calculateSpribeMultiplier } from '../utils/multiplier'
import { MdOutlineAutorenew } from "react-icons/md";
import Mainboxes from './Maincomponents/Mainboxes'
import Mineschanger from './Maincomponents/Mineschanger'


const Main = () => {
  const minesCount = useSelector(state => state.minesCount)
  const multiplier = useSelector(state => state.multiplier);
  const boxes = useSelector(state => state.boxes)
  const revealed = useSelector(state => state.revealed)
  const soundSelector = useSelector(state => state.soundSelector)
  const autogameSelector = useSelector(state => state.autoGame)
  const selectAutoBoxes = useSelector(state => state.selectAutoBoxes)
  const betState = useSelector(state => state.betState)
  const autorevealState = useSelector(state => state.autorevealState)
  const autogamingstate = useSelector(state => state.autogamingstate)
  const [maindisable, setMaindisable] = useState(true)
  const mainselector = useSelector(state => state.disablemain)
  const footerselector = useSelector(state => state.disablefooter)
  const flipTrigger = useSelector(state => state.flipTrigger)
  const dispatch = useDispatch()

  useEffect(() => {
    resetGame();
  }, [minesCount]);

  let safeClickCountauto = useMemo(() => {
    return selectAutoBoxes.filter(v => v === true).length;
  }, [selectAutoBoxes]);

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

  const selectRandom = () => {
    dispatch(togglehowtoplay(false))
    dispatch(toggleMenu(false))
    if (!mainselector && autogameSelector == false) {
      const random = Math.floor(Math.random() * 25)
      if (revealed[random] == false) {


        dispatch(revealedOne(random))
        if (boxes[random] == "mines") {
          let minestapsound = "/sounds/lose.mp3"
          let audio = new Audio(minestapsound)
          if (soundSelector) {
            audio.play()
          }
          dispatch(revealAll())
          handleFlip(dispatch)
          dispatch(togglefooter(false))
          dispatch(togglemain(true))
          dispatch(SetbetState(!betState))
        } else {
          let minestapsound = "/sounds/star-click.mp3"
          let audio = new Audio(minestapsound)
          if (soundSelector) {
            audio.play()
          }
        }
      }
      else {
        selectRandom()
      }
    }
    if (footerselector && autogameSelector) {
      const random = Math.floor(Math.random() * 25)
      if (selectAutoBoxes[random] == false) {
        let minestapsound = "/sounds/star-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
          audio.play()
        }
        if (25 - minesCount > safeClickCountauto) {
          dispatch(selectAutoOne(random))
        }
      }
      else {
        selectRandom()
      }
    }
  }

  const safeClickCount = useMemo(() => {
    return revealed.filter(v => v === true).length;
  }, [revealed]);

  const autoGameFunction = () => {

    if (!betState) {
      resetGame()
      dispatch(toggleAutoGame(!autogameSelector))
      dispatch(togglefooter(!footerselector))
      dispatch(togglemain(!mainselector))
      dispatch(SetselectAutoBoxes())
      dispatch(SetautorevealState(false))
    } else {

    }
  }


  useEffect(() => {
    if (!autogameSelector) {
      const newMultiplier = calculateSpribeMultiplier(safeClickCount + 1, minesCount);
      dispatch(setMultiplier(newMultiplier));
    } else {
      const newMultiplier = calculateSpribeMultiplier(safeClickCountauto, minesCount);
      dispatch(setMultiplier(newMultiplier));
    }

  }, [safeClickCount, minesCount, flipTrigger, safeClickCountauto])


  return (
    <main className={`flex flex-col justify-between items-center md:h-8/10 h-8/12  `}>
      <Mineschanger />
      <Mainboxes />
      <div className='flex md:w-1/3 w-9/10 h-8 justify-between items-center mt-3 mb-2 space-x-1'>
        <div onClick={selectRandom} className={`w-1/2 cursor-pointer bg-sky-700 border border-gray-800 rounded-xl flex justify-center items-center text-white font-semibold font-sans ${((mainselector && autogameSelector == false) || autogamingstate) ? "disable-div" : ""}`}>RANDOM</div>
        <div className={`${(betState || autogamingstate) ? "disable-div" : ""} w-1/2 bg-[#024395] cursor-pointer border border-gray-800 rounded-xl flex justify-between items-center text-white font-semibold font-sans `}>
          <span className='w-2/10'><MdOutlineAutorenew className='size-5 ' /></span>

          <span className='flex items-center w-8/10'>
            <label className="relative inline-flex items-center cursor-pointer mr-1">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={autoGameFunction}
                checked={autogameSelector}
              />
              <div className="w-7 h-4 bg-[#4373B0]  rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-[#5BA100]"></div>

            </label>
            AUTOGAME
          </span>
        </div>
      </div>
    </main>
  )
}

export default Main