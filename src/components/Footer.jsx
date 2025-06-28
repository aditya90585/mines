import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { betAmt, togglefooter, togglemain } from '../features/mines/mineSlices'
import { useState, useEffect } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";

const Footer = () => {
    const [betamount, setBetamount] = useState("10")
    const [disablefooter, setDisablefooter] = useState(false)
    const [keyboard, setKeyboard] = useState(false)
    const [numkeys, setNumkeys] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "delete"])
    const dispatch = useDispatch()
    const footerselector = useSelector(state => state.disablefooter)
    const mainselector = useSelector(state => state.disablemain)
    console.log(footerselector, "hiii")

    const bet = (e) => {
        if (mainselector&&keyboard==false) {
            
            dispatch(betAmt(parseInt(betamount)))
            dispatch(togglemain(false))
            setDisablefooter(true)
            dispatch(togglefooter(true))
            
        }
    }
    const openkeyboard = () => {
        setKeyboard(!keyboard)
         if(betamount>=100&&keyboard==true){
         setBetamount("100")
        }
    }
    const changevalue = (num)=>{
       if (num=="delete") {
        setBetamount(betamount.slice(0,-1))
       } else {
       setBetamount(betamount+num.toString())
       }
    }
    
    useEffect(() => {
        console.log(footerselector, "heee")
        setDisablefooter(footerselector)
    }, [footerselector])

    return (
        <footer className={`bg-blue-800  w-full md:h-20 h-2/10 rounded-2xl flex md:flex-row flex-col-reverse gap-x-2 gap-y-2 justify-center cursor-pointer items-center ${disablefooter ? "disable-div" : ""}`}>
            <div className='bg-sky-700 md:w-1/3 w-9/10 md:h-7/10 h-1/3 rounded-full flex' >
                <div className={`h-70 w-60 bg-sky-700 rounded-2xl fixed md:bottom-22 bottom-23 md:left-52  ${keyboard ? "" : "hidden"}`}>
                    <div className=' m-2 h-9/12 rounded-2xl bg-sky-700 flex flex-wrap gap-x-2 gap-y-2 justify-center items-center'>
                        {numkeys.map((num, index) => {
                            return <span onClick={()=>changevalue(num)} className='w-2/7 h-1/5 rounded-xl border-black flex border justify-center items-center text-white bg-sky-700'>{(num=="delete")?<FiDelete />:`${num}`}</span>
                        })}
                    </div>
                    <div onClick={openkeyboard} className=' m-2 h-2/12 bg-sky-900 text-white rounded-2xl flex justify-center items-center'><MdOutlineDone /></div>
                </div>
                <div className='flex justify-center gap-y-2 items-center flex-col w-1/2'>
                    <div className='text-white  text-xs font-semibold font-sans'>Bet USD</div>
                    <div onClick={openkeyboard} className='bg-sky-900 border border-black w-8/10 h-6 rounded-full text-white text-center'>
                        {betamount}
                    </div>
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