import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { betAmt } from '../features/mines/mineSlices'
import { useState } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";

const Footer = () => {
    const [betamt, setBetamt] = useState(10)
    const dispatch = useDispatch()

    const bet = (e)=>{
        dispatch(betAmt(betamt))
        e.target.disabled
    }
    return (
        <footer className='bg-blue-800 w-full md:h-20 h-2/10 rounded-2xl flex gap-x-2 justify-center items-center'>
            <div className='bg-sky-700 w-1/3 h-7/10 rounded-full flex' >
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
            <div className=' w-1/3 h-7/10 rounded-full flex items-center justify-between' > 
            <div className='w-2/10 bg-blue-600 rounded-full flex justify-center items-center text-slate-300 text-3xl'><MdOutlineAutorenew /></div>
            <div onClick={bet} className='flex items-center w-8/10 bg-green-600 h-full rounded-2xl '><CiPlay1 /><span>BET</span></div>
            </div>

        </footer>
    )
}

export default Footer