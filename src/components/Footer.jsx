import React from 'react'
import { calculateSpribeMultiplier } from '../utils/multiplier'
import { useSelector, useDispatch } from 'react-redux'
import { addfixBet, betAmt, boxesSet, cashOutbetamount, changebetFix, changebetValue, fixBets, revealedFalse, setcashOutamount, togglefooter, togglemain } from '../features/mines/mineSlices'
import { useState, useEffect } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";


const Footer = () => {
    const revealed = useSelector(state => state.revealed);
    const minesCount = useSelector(state => state.minesCount);
    const betamount = useSelector(state => state.betamount)
    const cashoutAmount = useSelector(state => state.cashOutamount)
    const statemultiplier = useSelector(state => state.multiplier)
    const [disablefooter, setDisablefooter] = useState(false)
    const [keyboard, setKeyboard] = useState(false)
    const [numkeys, setNumkeys] = useState([1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, ".", 0.00, "delete"])
    const [fixedBetArray, setFixedBetArray] = useState([0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 1.20, 2.00, 4.00, 10.00, 20.00, 50.00, 100.00])
    const [togglefixedamt, setTogglefixedamt] = useState(false)
    const dispatch = useDispatch()
    const footerselector = useSelector(state => state.disablefooter)
    const mainselector = useSelector(state => state.disablemain)
    const totalAmt = useSelector(state => state.totalAmt)

    const safeClicks = revealed.filter(val => val === true).length;
    const multiplier = () => calculateSpribeMultiplier(safeClicks, minesCount)


    useEffect(() => {
        dispatch(setcashOutamount(multiplier()))
    }, [safeClicks, minesCount])

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


        dispatch(togglemain(true))
        dispatch(boxesSet(newBoxes))
        dispatch(revealedFalse())
        // setRevealed(Array(5 * 5).fill(false))
    }

    const bet = (e) => {
        if (mainselector && keyboard == false) {

            dispatch(betAmt(Number(betamount)))
            dispatch(togglemain(false))
            setDisablefooter(true)
            dispatch(togglefooter(true))
            setTogglefixedamt(false)
            dispatch(setcashOutamount(multiplier()))
        }
    }
    const openkeyboard = () => {
        setTogglefixedamt(false)
        setKeyboard(!keyboard)
        dispatch(changebetFix(keyboard))
    }
    const changevalue = (num) => {
        dispatch(changebetValue(num))
    }
    const togglefixedbet = () => {
        setKeyboard(false)
        setTogglefixedamt(!togglefixedamt)
    }
    const changefixedamt = (amount) => {
        dispatch(fixBets(amount))
        setTogglefixedamt(false)
    }

    const cashOut = () => {


        if (safeClicks > 0) {
            const currentmultiplier = multiplier()

            const payout = parseFloat(betamount) * currentmultiplier;

            dispatch(cashOutbetamount(payout))

            dispatch(togglefooter(false));
            dispatch(togglemain(true));
            setDisablefooter(false);
            resetGame()
        }
    }
    const addfixamount = () => {
        let newbetamount
        fixedBetArray.forEach((e, index) => {
            if (betamount >= e) {

                console.log(e, index)
                if (index <= 13) {
                    newbetamount = fixedBetArray[index + 1].toFixed(2)
                }

                if (newbetamount <= 100) {
                    dispatch(addfixBet(newbetamount))
                }
            }

        })
    }
    const subtractfixamount = ()=>{
          let newbetamount
        fixedBetArray.forEach((e, index) => {
            if (betamount >= e) {

                console.log(e, index)
                if(index>0){
                    newbetamount = fixedBetArray[index - 1].toFixed(2)
                console.log(newbetamount)
                }

                if(newbetamount>=0.10){
                    dispatch(addfixBet(newbetamount))
            }
            
            }

        })
    }

    useEffect(() => {
        console.log(footerselector, "heee")
        setDisablefooter(footerselector)
    }, [footerselector])

    return (
        <footer className={`bg-blue-800  w-full md:h-20 h-2/13 rounded-2xl flex md:flex-row flex-col-reverse gap-x-2 gap-y-2 justify-center  items-center md:static relative bottom-9 `}>
            <div className={`bg-sky-700 md:w-1/4 w-9/10 md:h-7/10 h-1/3 rounded-full flex ${disablefooter ? "disable-div" : ""}`} >
                <div className={`h-70 w-60 bg-sky-700 rounded-2xl fixed md:bottom-22 bottom-18 md:left-70  ${keyboard ? "" : "hidden"}`}>
                    <div className=' m-2 h-9/12 rounded-2xl bg-sky-700 flex flex-wrap gap-x-2 gap-y-2 justify-center items-center'>
                        {numkeys.map((num, index) => {
                            return <span key={index} onClick={() => changevalue(num)} className='w-2/7 cursor-pointer h-1/5 rounded-xl border-black flex border justify-center items-center text-white bg-sky-700'>{(num == "delete") ? <FiDelete /> : `${num}`}</span>
                        })}
                    </div>
                    <div onClick={openkeyboard} className=' m-2 h-2/12 cursor-pointer bg-sky-900 text-white rounded-2xl flex justify-center items-center'><MdOutlineDone /></div>
                </div>
                <div className='flex justify-around items-center flex-col w-1/2'>
                    <div className='text-white  text-xs font-semibold font-sans'>Bet USD</div>
                    <div onClick={openkeyboard} className='bg-sky-900 cursor-text overflow-hidden mb-0.5 border border-black w-8/10 md:h-6 h-4 rounded-full text-white flex justify-center items-center'>
                        {betamount}
                    </div>
                </div>
                <div className={`md:w-1/4 w-9/10 h-90 rounded-xl bg-slate-800 fixed md:bottom-22 bottom-18 flex flex-col ${togglefixedamt ? "" : "hidden"}`}>
                    <h1 className='text-white font-semibold text-center mx-auto my-2'>BET USD</h1>
                    <div className='flex flex-wrap mx-5 h-10/12 gap-y-3 justify-between'>
                        {fixedBetArray.map((amount, index) => {
                            return <div key={index} onClick={() => changefixedamt(amount)} className={`w-4/9 cursor-pointer rounded-xl text-white flex justify-center items-center ${(amount == betamount) ? "bg-sky-700" : "bg-sky-900"}`}>{amount.toFixed(2)}</div>
                        })}
                    </div>
                </div>
                <div className='w-1/2 h-full flex justify-center items-center gap-x-2'>
                    <div onClick={subtractfixamount} className='p-2 cursor-pointer  border border-gray-700 rounded-full text-slate-300'><FaMinus /></div>
                    <div onClick={togglefixedbet} className='p-2 cursor-pointer border border-gray-700 rounded-full text-slate-300 text-2xl'><BiSolidCoinStack /></div>
                    <div onClick={addfixamount} className='p-2 cursor-pointer border border-gray-700 rounded-full text-slate-300'><FaPlus /></div>
                </div>
                <div>
                </div>
            </div>
            <div className=' md:w-1/3 w-9/10 md:h-7/10 h-1/3 rounded-full flex  items-center' >
                <div className='w-15 mr-5 h-full bg-blue-600 rounded-full flex justify-center items-center text-slate-300 text-3xl'><MdOutlineAutorenew /></div>
                {!disablefooter ? <div onClick={bet} className='flex cursor-pointer items-center justify-between w-9/10 bg-green-600 h-full rounded-2xl'><CiPlay1 className='text-white font-bold text-3xl ml-5' /><span className='text-white font-bold text-xl w-8/10  mr-10 flex justify-center'>BET</span></div>
                    : <div onClick={cashOut} className='flex cursor-pointer items-center justify-between w-9/10 bg-yellow-400 h-full rounded-2xl'><CiPlay1 className='text-white font-bold text-3xl ml-5' /><span className='text-white font-bold text-xl w-8/10  mr-10 flex justify-center'>Cashout{cashoutAmount.toFixed(2)}</span></div>
                }
            </div>

        </footer>
    )
}

export default Footer