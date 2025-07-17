import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { togglehowtoplay, toggleMenu, changeMines, SetselectAutoBoxes } from '../../features/mines/mineSlices'
import { FaChevronDown } from "react-icons/fa";

const Mineschanger = () => {
    const dispatch = useDispatch()
    const multiplier = useSelector(state => state.multiplier);
    const mainselector = useSelector(state => state.disablemain)
    const autogameSelector = useSelector(state => state.autoGame)
    const footerselector = useSelector(state => state.disablefooter)
    const soundSelector = useSelector(state => state.soundSelector)
    const minesCount = useSelector(state => state.minesCount)
    const revealed = useSelector(state => state.revealed)
    const [togglemine, setTogglemine] = useState(true)
    const [totalmines, setTotalmines] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])


    const safeClickCount = useMemo(() => {
        return revealed.filter(v => v === true).length;
    }, [revealed]);

    const togglemineselector = () => {

        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let minestapsound = "/sounds/minestap.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        setTogglemine(!togglemine)

    }


    const changemines = (mines) => {

        dispatch(changeMines(mines))
        let minestapsound = "/sounds/minestap.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        setTogglemine(true)
        if (autogameSelector) {
            dispatch(SetselectAutoBoxes())
        }

    }


    return (
        <div className={`flex flex-col md:w-1/3 w-9/10 mt-2 ${((autogameSelector && footerselector) || !mainselector || autogameSelector) ? "disable-main" : ""}`}>

            <div className=' bg-blue-600 h-6 rounded-2xl flex justify-between items-center'>
                <div className='flex items-center h-5 mx-1 '>
                    <div onClick={togglemineselector} className='bg-sky-700 cursor-pointer rounded-xl w-35 h-5 text-white flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)]' >
                        <span className='w-8/10 flex justify-center items-center ml-3'> Mines : {minesCount}</span>  <FaChevronDown className='w-2/10 text-xs' />
                    </div>
                    <div className={`h-55 w-43 bg-slate-800 fixed md:top-17 top-9 overflow-y-scroll z-10 rounded-xl ${togglemine ? "hidden" : ""}`}>
                        {totalmines.map((mines, index) => {
                            return <div key={index} onClick={() => changemines(mines)} className={`cursor-pointer text-white mx-4 mt-4 mb-4 h-5 flex justify-center items-center rounded-xl ${(minesCount) == mines ? "bg-sky-700" : "bg-sky-900"}`}>{mines}</div>
                        })}


                    </div>
                </div>
                <div className='bg-[#FFC107] rounded-xl px-8 mx-px text-sm  h-5'>Next: {multiplier.toFixed(2)}X</div>
            </div>
            <div className=' bg-blue-900 h-1 my-2 rounded-2xl flex justify-between items-center'>
                <div className={`h-full  bg-[#28A745] rounded-2xl flex justify-between items-center`}

                    style={{ width: `${(safeClickCount / (25 - minesCount)) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}

export default Mineschanger