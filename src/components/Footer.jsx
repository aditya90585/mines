import React, { useMemo, useRef } from 'react'
import { store } from '../app/store.js'
import { handleFlip } from '../utils/handleFlip'
import { calculateSpribeMultiplier } from '../utils/multiplier'
import { useSelector, useDispatch } from 'react-redux'
import { addfixBet, toggleMenu, togglehowtoplay, triggerFlip, resetFlip, betAmt, boxesSet, cashOutbetamount, changefixbettomin, changebetFix, changebetValue, clearCashoutNotification, fixBets, revealedFalse, setcashOutamount, setCashoutNotification, setNavcashout, togglefooter, togglemain, revealAll, toggleStartAutoGameSelector, SetautoGameRound, revealedOne, toggleAutoGame, SetbetState, SetautorevealState, Setautogamingstate, SetroundLeft, SetstopGamestate } from '../features/mines/mineSlices'
import { useState, useEffect } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";


const Footer = () => {
    const revealed = useSelector(state => state.revealed);
    const minesCount = useSelector(state => state.minesCount);
    const betamount = useSelector(state => state.betamount)
    const cashoutAmount = useSelector(state => state.cashOutamount)
    const statemultiplier = useSelector(state => state.multiplier)
    const soundSelector = useSelector(state => state.soundSelector)
    const autogameSelector = useSelector(state => state.autoGame)
    const autoGameRoundsArray = useSelector(state => state.autoGameRoundsArray)
    const autoGameRound = useSelector(state => state.autoGameRound)
    const betState = useSelector(state => state.betState)
    const roundLeft = useSelector(state => state.roundLeft)
    const autogamingstate = useSelector(state => state.autogamingstate)
    const [disablefooter, setDisablefooter] = useState(false)
    const [keyboard, setKeyboard] = useState(false)
    const [numkeys, setNumkeys] = useState([1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, ".", 0.00, "delete"])
    const [fixedBetArray, setFixedBetArray] = useState([0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 1.20, 2.00, 4.00, 10.00, 20.00, 50.00, 100.00])
    const [togglefixedamt, setTogglefixedamt] = useState(false)
    const dispatch = useDispatch()
    const footerselector = useSelector(state => state.disablefooter)
    const mainselector = useSelector(state => state.disablemain)
    const totalAmt = useSelector(state => state.totalAmt)
    const selectAutoBoxes = useSelector(state => state.selectAutoBoxes)
    const StartAutoGameSelector = useSelector(state => state.startAutoGameSelector)
    const boxes = useSelector(state => state.boxes)
    const stopGamesstate = useSelector(state => state.stopGamestate)


    const boxesRef = useRef([]);
    const roundLeftRef = useRef(roundLeft);



    const safeClicks = revealed.filter(val => val === true).length;
    const multiplier = () => calculateSpribeMultiplier(safeClicks, minesCount)
    const autogamemultiplier = useSelector(state => state.multiplier)


    useEffect(() => {
        dispatch(setcashOutamount(multiplier()))
    }, [safeClicks, minesCount])



    useEffect(() => {
        boxesRef.current = boxes;
    }, [boxes]);

    useEffect(() => {
        roundLeftRef.current = roundLeft;
    }, [roundLeft]);

    const stopGamestateRef = useRef(stopGamesstate);

    useEffect(() => {
        stopGamestateRef.current = stopGamesstate;
    }, [stopGamesstate]);

    const safeClickCountauto = useMemo(() => {
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


        dispatch(togglemain(true))
        dispatch(boxesSet(newBoxes))
        dispatch(revealedFalse())
        // setRevealed(Array(5 * 5).fill(false))
    }

    const bet = (e) => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        resetGame()
        if (keyboard == false && Number(betamount) > 0 && autogameSelector == false) {
            let minestapsound = "/sounds/bet-click.mp3"
            let audio = new Audio(minestapsound)
            if (soundSelector) {
                audio.play()
            }

            dispatch(betAmt(Number(betamount)))
            dispatch(togglemain(false))
            setDisablefooter(true)
            dispatch(togglefooter(true))
            setTogglefixedamt(false)
            dispatch(setcashOutamount(multiplier()))
            dispatch(SetbetState(!betState))
        }
    }
    const openkeyboard = () => {
        setTogglefixedamt(false)
        setKeyboard(true)

        dispatch(changefixbettomin(keyboard))
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }
    const closekeyboard = () => {
        setTogglefixedamt(false)
        setKeyboard(false)
        let minestapsound = "/sounds/select-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        dispatch(changebetFix(keyboard))
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }
    const changevalue = (num) => {
        let minestapsound = "/sounds/keyboard-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        dispatch(changebetValue(num))
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }
    const togglefixedbet = () => {
        let minestapsound = "/sounds/cool-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        setKeyboard(false)
        setTogglefixedamt(!togglefixedamt)
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }
    const changefixedamt = (amount) => {
        let minestapsound = "/sounds/soft-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        dispatch(fixBets(amount))
        setTogglefixedamt(false)
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }


    const cashOut = () => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))

        if (safeClicks > 0) {

            const currentmultiplier = multiplier()

            const payout = parseFloat(betamount) * currentmultiplier;

            dispatch(cashOutbetamount(payout))
            dispatch(revealAll())
            dispatch(togglefooter(false));
            dispatch(togglemain(true));
            setDisablefooter(false);
            dispatch(setCashoutNotification(payout))
            handleFlip(dispatch)
            dispatch(SetbetState(!betState))

            let minestapsound = "/sounds/success-alert.mp3"
            let audio = new Audio(minestapsound)
            if (soundSelector) {
                audio.play()
            }
            setTimeout(() => {
                dispatch(clearCashoutNotification())
            }, 2000);
            // resetGame()
        }
    }
    const addfixamount = () => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let minestapsound = "/sounds/cool-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        let newbetamount
        fixedBetArray.forEach((e, index) => {
            if (betamount >= e) {

                
                if (index <= 13) {
                    newbetamount = fixedBetArray[index + 1].toFixed(2)
                }

                if (newbetamount <= 100) {
                    dispatch(addfixBet(newbetamount))
                }
            }

        })
    }
    const subtractfixamount = () => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let minestapsound = "/sounds/cool-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        let newbetamount
        fixedBetArray.forEach((e, index) => {
            if (betamount >= e) {

              
                if (index > 0) {
                    newbetamount = fixedBetArray[index - 1].toFixed(2)
                   
                }

                if (newbetamount >= 0.10) {

                    dispatch(addfixBet(newbetamount))
                }

            }

        })
    }

    useEffect(() => {

        setDisablefooter(footerselector)
    }, [footerselector])

    // const disablebars = () => {
    //     if (menuSelector) {
    //         dispatch(toggleMenu(false))
    //     }
    //     if (soundSelector) {
    //         dispatch(toggleSound(false))
    //     }
    //     if (howtoplaySelector) {
    //         dispatch(togglehowtoplay(false))
    //     }

    // }

    const togglestartautoGame = () => {
        if ((autogameSelector && safeClickCountauto > 0)) {
            dispatch(toggleStartAutoGameSelector(!StartAutoGameSelector))
            dispatch(SetstopGamestate(false))
        }

    }

    const selectRounds = (rounds) => {
        dispatch(SetautoGameRound(rounds))
        dispatch(SetroundLeft(rounds))
    }

    const startAutoGame = () => {
        dispatch(toggleStartAutoGameSelector(!StartAutoGameSelector))
        dispatch(togglemain(true))
        dispatch(togglefooter(true))
        dispatch(Setautogamingstate(true))
        dispatch(SetroundLeft(autoGameRound))
        roundLeftRef.current = autoGameRound

        // dispatch(toggleAutoGame(false))

        let currentRound = 0;

        const runRound = () => {
            if (stopGamestateRef.current) return;
            if (currentRound >= autoGameRound) {
                dispatch(toggleStartAutoGameSelector(false));
                dispatch(toggleAutoGame(false))
                dispatch(SetbetState(false))
                dispatch(togglemain(false))
                dispatch(togglefooter(false))
                dispatch(Setautogamingstate(false))
                resetGame()
                return;
            }

            dispatch(betAmt(Number(betamount)))
            dispatch(SetroundLeft(roundLeftRef.current - 1));
            resetGame()
            dispatch(SetautorevealState(false))

            setTimeout(() => {
                dispatch(SetautorevealState(true))
                let isLoss = false;
                for (let index = 0; index < 25; index++) {
                    if (selectAutoBoxes[index] == true) {
                        dispatch(SetautorevealState(true))
                        dispatch(revealedOne(index))
                        handleFlip(dispatch)
                        dispatch(revealAll())

                        if (boxesRef.current[index] === "mines") {
                            isLoss = true;
                        }


                        // dispatch(toggleAutoGame(false))
                        // dispatch(SetautorevealState(true))
                        // dispatch(revealAll())
                    }
                }
                if (isLoss) {



                    let minestapsound = "/sounds/lose.mp3"
                    let audio = new Audio(minestapsound)
                    if (soundSelector) {
                        audio.play()
                    }


                } else {
                    const payout = parseFloat(betamount) * autogamemultiplier;

                    dispatch(cashOutbetamount(payout))
                    dispatch(setCashoutNotification(payout))
                    setTimeout(() => {
                        dispatch(clearCashoutNotification())
                    }, 800);

                    let minestapsound = "/sounds/success-alert.mp3"
                    let audio = new Audio(minestapsound)
                    if (soundSelector) {
                        audio.play()
                    }
                }
                currentRound++;
                setTimeout(runRound, 2000); // wait between rounds
            }, 800);

        }
        runRound()
    }

    const stopAutogame = () => {
        dispatch(SetstopGamestate(true))
        dispatch(togglemain(false))
        dispatch(togglefooter(false))
        dispatch(toggleStartAutoGameSelector(false));
        dispatch(toggleAutoGame(false))
        dispatch(SetbetState(false))

        dispatch(Setautogamingstate(false))
        resetGame()
    }
    return (
        <footer className={`bg-blue-800  w-full md:h-20 h-4/16 rounded-2xl flex md:flex-row flex-col-reverse gap-x-2 gap-y-2 justify-center  items-center md:static relative bottom-9 `}>
            <div className={`bg-sky-700 border-[1px] border-gray-800 md:w-1/4 w-9/10 md:h-7/10 h-1/3  rounded-full flex inset-shadow-[0px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)] ${(autogameSelector || betState) ? "disable-div" : ""}`} >
                <div className={`h-50 w-60 bg-sky-700 rounded-2xl fixed md:bottom-22 bottom-30 md:left-70  ${keyboard ? "" : "hidden"} inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)]`}>
                    <div className='m-2 h-9/12 pb-2 rounded-xl bg-[#0267A5] flex flex-wrap gap-x-1 gap-y-1  justify-center items-center'>
                        {numkeys.map((num, index) => {
                            return <span key={index} onClick={() => changevalue(num)} className='w-2/7 cursor-pointer h-1/4 rounded-md border-black flex border justify-center items-center text-white hover:bg-[#02578C] bg-[#0267A5] inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)] active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'>{(num == "delete") ? <FiDelete /> : `${num}`}</span>
                        })}
                    </div>
                    <div onClick={closekeyboard} className=' m-2 mx-4  h-1/7 cursor-pointer bg-[#013352] text-white rounded-2xl flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'><MdOutlineDone /></div>
                </div>
                <div className='flex justify-around items-center flex-col w-1/2 '>
                    <div className='text-white  text-xs font-semibold font-sans'>Bet USD</div>
                    <div onClick={openkeyboard} className='bg-sky-900 cursor-text overflow-hidden mb-0.5 border border-black w-8/10 md:h-6 h-4 rounded-full text-white flex justify-center items-center'>
                        {betamount}
                    </div>
                </div>
                <div className={`md:w-1/4 w-9/10 h-90 rounded-xl bg-slate-800 fixed md:bottom-22 bottom-30 flex flex-col ${togglefixedamt ? "" : "hidden"}`}>
                    <h1 className='text-white font-semibold text-center mx-auto my-2'>BET USD</h1>
                    <div className='flex flex-wrap mx-5 h-10/12 gap-y-3 justify-between'>
                        {fixedBetArray.map((amount, index) => {
                            return <div key={index} onClick={() => changefixedamt(amount)} className={`w-4/9 cursor-pointer rounded-xl text-white flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 ${(amount == betamount) ? "bg-sky-700" : "bg-sky-900"}`}>{amount.toFixed(2)}</div>
                        })}
                    </div>
                </div>
                <div className='w-1/2 h-full  flex justify-center items-center gap-x-2'>
                    <div onClick={subtractfixamount} className=' p-2 cursor-pointer  border border-gray-700  rounded-full text-white active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)]'><FaMinus /></div>
                    <div onClick={togglefixedbet} className='p-2 cursor-pointer border border-gray-700 rounded-full text-white text-xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)]'><BiSolidCoinStack /></div>
                    <div onClick={addfixamount} className=' p-2 cursor-pointer border border-gray-700 rounded-full text-white active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150  inset-shadow-[0.8px_0.6px_0px_#94dcf7] shadow-[1px_1px_1px_rgb(0,0,0)]'><FaPlus /></div>
                </div>
                <div>
                </div>
            </div>
            <div className=' md:w-1/3 w-9/10 md:h-7/10 h-1/3 rounded-full flex  items-center' >

                {!autogamingstate ? <div onClick={togglestartautoGame} className={`w-15 cursor-pointer mr-5 h-full bg-[#0257C0] border-2 border-black shadow-md shadow-black rounded-full flex justify-center items-center text-slate-300 text-3xl aspect-square ${(autogameSelector && safeClickCountauto > 0) ? "" : "disable-div"}`}><MdOutlineAutorenew /></div>
                    : <div onClick={stopAutogame} className={`w-15 cursor-pointer mr-5 h-full bg-[#D2000F] border-2 border-black shadow-md shadow-black rounded-full flex justify-center items-center text-slate-300 text-3xl aspect-square font-sans ${(autogameSelector && safeClickCountauto > 0) ? "" : "disable-div"}`}>{roundLeft}</div>
                }
                <div className={`fixed flex  flex-col items-center bg-[#212226] z-20 md:h-[80%] h-[80%] md:w-[40%] w-[90%] md:top-9 bottom-30 md:left-[30%] left-[5%] rounded-xl  ${StartAutoGameSelector ? "" : "hidden"}`}>

                    <div className=' flex justify-between w-[90%] items-center text-white m-4'><span className='font-semibold font-sans'>AUTO PLAY</span>
                        <span onClick={() => dispatch(toggleStartAutoGameSelector(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>

                    <div className='w-full h-px bg-[#38393C]'></div>
                    <div className='w-[90%]  h-43 flex items-center flex-col my-6 bg-[#1A1B1E] rounded-xl'>
                        <h1 className='text-white text-xs m-2'>Number Of Rounds</h1>
                        <div className='w-[99%] h-[90%] mb-3  flex-wrap gap-x-2 gap-y-2 flex justify-center'>
                            {autoGameRoundsArray.map((rounds, index) => {
                                return <div key={rounds} onClick={() => selectRounds(rounds)} className={` ${(autoGameRound == rounds) ? "bg-[#555961]" : "bg-[#393B3F]"} cursor-pointer w-[48%] h-[30%] rounded-sm flex justify-between items-center`}>
                                    <div className='w-1/10 h-full flex justify-center items-center ml-1'>
                                        <span className={`${(autoGameRound == rounds) ? "bg-[#5BA100]" : "bg-[#6C6E71]"}  size-3 rounded-full flex`}></span>
                                    </div>
                                    <div className='w-9/10 flex justify-center items-center text-white mr-2'>{rounds}</div>
                                </div>
                            })}




                        </div>
                    </div>
                    <div className='text-center text-white'></div>
                    <div className='text-center text-white mx-5 mt-2'></div>
                    <div className='w-full h-px bg-[#38393C] absolute bottom-17'></div>
                    <div onClick={startAutoGame} className={` ${autogameSelector ? "" : ""} flex absolute bottom-3 cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#94dcf7] shadow-[1px_1px_8px_rgb(0,0,0)] items-center justify-between w-9/10 bg-radial-[at_50%_60%] from-[#5CA003] to-[#327A00] to-60% h-12 rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150`}><span className='text-white font-bold w-full  flex justify-center'>START AUTO</span></div>
                </div>


                {(autogameSelector == false) ? (!disablefooter) ? <div onClick={bet} className={` ${autogameSelector ? "disable-div" : ""} flex cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#94dcf7] shadow-[1px_1px_8px_rgb(0,0,0)] items-center justify-between w-9/10 bg-radial-[at_50%_60%] from-[#5CA003] to-[#327A00] to-60% h-full rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150`}><CiPlay1 className='text-white font-bold text-3xl ml-5 ' /><span className='text-white font-bold text-xl w-8/10  mr-10 flex justify-center'>BET</span></div>
                    : <div onClick={cashOut} className='flex cursor-pointer items-center justify-between w-9/10 bg-yellow-400 h-full rounded-2xl border-2 border-black inset-shadow-[0.4px_0.6px_0px_#94dcf7] shadow-[1px_1px_8px_rgb(0,0,0)] bg-radial-[at_50%_60%] from-[#D79E4E] to-[#C4872E] to-60% active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'><span className='text-white font-bold text-xl w-full flex justify-center '>CASHOUT : {cashoutAmount.toFixed(2)}</span></div>
                    : <div onClick={bet} className={` ${autogameSelector ? "disable-div" : ""} flex cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#94dcf7] shadow-[1px_1px_8px_rgb(0,0,0)] items-center justify-between w-9/10 bg-radial-[at_50%_60%] from-[#5CA003] to-[#327A00] to-60% h-full rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150`}><CiPlay1 className='text-white font-bold text-3xl ml-5 ' /><span className='text-white font-bold text-xl w-8/10  mr-10 flex justify-center'>BET</span></div>
                }
            </div>

        </footer>
    )
}

export default Footer