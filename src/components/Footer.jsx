import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { betAmt, togglefooter, togglemain } from '../features/mines/mineSlices'
import { useState,useEffect } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";

const Footer = () => {
    const [betamt, setBetamt] = useState(10)
    const [disablefooter, setDisablefooter] = useState(false)
    const dispatch = useDispatch()
    const footerselector = useSelector(state => state.disablefooter)
    console.log(footerselector,"hiii")

    const bet = (e)=>{
        dispatch(betAmt(betamt))
        dispatch(togglemain(false))
        setDisablefooter(true)
        dispatch(togglefooter(true))
    }
    
    useEffect(() => {
        console.log(footerselector,"heee")
     setDisablefooter(footerselector)
    }, [footerselector])
    
    return (
        <footer className={`bg-blue-800  w-full md:h-20 h-2/10 rounded-2xl flex md:flex-row flex-col-reverse gap-x-2 gap-y-2 justify-center cursor-pointer items-center ${disablefooter?"disable-div":""}`}>
            <div className='bg-sky-700 md:w-1/3 w-9/10 md:h-7/10 h-1/3 rounded-full flex' >
                <div className='flex justify-center gap-y-2 items-center flex-col w-1/2'>
                    <div className='text-white  text-xs font-semibold font-sans'>Bet USD</div>
                    <input value={betamt} onChange={(e)=> setBetamt(e.target.value)} className='bg-sky-900 border border-black w-8/10 h-6 rounded-full text-white text-center' type="number" name="" id="" />
                </div>
                <div className='w-1/2 h-full flex justify-center items-center gap-x-2'>
                 <div className='p-2  border border-gray-700 rounded-full text-slate-300'><FaMinus /></div>
                 <div className='p-2 border border-gray-700 rounded-full text-slate-300 text-2xl'><BiSolidCoinStack /></div>
                 <div className='p-2 border border-gray-700 rounded-full text-slate-300'><FaPlus /></div>
                </div>
                <div>
                </div>
            </div>
            <div className=' md:w-1/3 w-9/10 md:h-7/10 h-1/3 rounded-full flex  items-center' > 
            <div className='w-15 mr-5 h-full bg-blue-600 rounded-full flex justify-center items-center text-slate-300 text-3xl'><MdOutlineAutorenew /></div>
            <div onClick={bet} className='flex  items-center justify-between w-9/10 bg-green-600 h-full rounded-2xl'><CiPlay1 className='text-white font-bold text-3xl ml-5' /><span className='text-white font-bold text-xl w-8/10  mr-10 flex justify-center'>BET</span></div>
            </div>

        </footer>
    )
}

export default Footer