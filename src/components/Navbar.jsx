import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu, toggleSound, togglehowtoplay } from '../features/mines/mineSlices';
import { setNavcashout } from '../features/mines/mineSlices'
import { RiMenu3Fill } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { FaVolumeHigh } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import { MdOutlineHistory } from "react-icons/md";
import { LuGamepad } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FaBalanceScaleLeft } from "react-icons/fa";

const Navbar = () => {
  const cashoutAmount = useSelector(state => state.cashOutamount)
  const menuSelector = useSelector(state => state.menuSelector)
  const soundSelector = useSelector(state => state.soundSelector)
  const howtoplaySelector = useSelector(state => state.howtoplay)
  const dispatch = useDispatch()
  const navcashout = useSelector(state => state.navcashout)
  const cashoutNotification = useSelector(state => state.cashoutNotification);
  // useEffect(() => {
  //   if(navcashout){
  //  setTimeout(() => {
  //   dispatch(setNavcashout())
  //  }, 1000);
  // }
  // }, [navcashout])

  const totalAmt = useSelector(state =>
    state.totalAmt
  )
  const disablebars = () => {
    if (menuSelector) {
      dispatch(toggleMenu(false))
    }
    if (soundSelector) {
      dispatch(toggleSound(false))
    }
    if (howtoplaySelector) {
      dispatch(togglehowtoplay(false))
    }

  }
  const togglehowplay = () => {
    dispatch(togglehowtoplay(!howtoplaySelector))
    dispatch(toggleMenu(false))
  }
  const togglenavmenu = () => {
    dispatch(toggleMenu(!menuSelector))
    dispatch(togglehowtoplay(false))
  }
  return (

    <nav className='md:bg-blue-800 md:w-full w-[99%] h-8 rounded-2xl flex justify-between items-center md:static absolute bottom-0'>
      <div className='flex w-1/3'>
        <div className='h-6 ml-1  w-35 p-1 text-white bg-blue-500 rounded-xl flex items-center justify-center'>Mines</div>
        <div onClick={togglehowplay} className={`h-6 ml-4 cursor-pointer md:w-35 w-8 p-1 bg-orange-400 rounded-xl flex items-center justify-between aspect-square `}><BsQuestionCircle className='size-5' /><span className='md:flex hidden mr-5 text-sm'>How To Play</span></div>
        <div className={`fixed bg-[#212226] z-20 md:h-[80%] h-[80%] md:w-[30%] w-[90%] md:top-9 bottom-30 md:left-[35%] left-[5%] rounded-xl  ${howtoplaySelector ? "" : "hidden"}`}>
          <div className=' flex justify-between items-center text-white m-4'><span className='font-semibold font-sans'>How To Play</span>
            <span onClick={() => dispatch(togglehowtoplay(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>
          <div className='w-full h-px bg-[#38393C]'></div>
          <h1 className='font-semibold mt-4 text-2xl text-center text-white'>MINES</h1>
          <div className='w-full flex justify-center my-10'><img className='w-50' src="/images/how-mines.png" alt="how-to-play" /></div>
          <div className='text-center text-white'>Each tile hides either a star or a mine</div>
          <div className='text-center text-white mx-5 mt-2'>Increase the total number of stars for bigger odds and higher rewards. You can cash out after each turn, or try for increased winnings.</div>
        </div>
      </div>
      <div className='font-bold  md:w-1/3 hidden mb-2 md:flex justify-center items-center '>
        <span className='bg-orange-400 px-3 text-white  rounded-b-xl md:flex hidden'>Fun Mode</span>
      </div>
      <div className='flex md:w-1/3 w-2/3 justify-between  items-center'>
        <div className='bg-green-500 text-white rounded-xl md:px-5 px-1 ml-8'>{(cashoutNotification != null) ? <span className={`${cashoutNotification ? "" : "hidden"}`}>+ {cashoutNotification.toFixed(2)}</span> : ""}</div>
        <div className='text-white mr-1 md:mr-3 flex items-center justify-between'>{totalAmt.toFixed(2)} USD   <span onClick={togglenavmenu} className='bg-[#0259D7] cursor-pointer rounded-full p-1 shadow-[0px_0px_5px_black] ml-2'><RiMenu3Fill className='size-4' /></span></div>
        <div className={`fixed bg-[#212226] h-96 w-80 md:top-9 md:right-2 bottom-9 flex items-center flex-col  right-2 rounded-2xl z-20  ${menuSelector ? "" : "hidden"}`}>
          <h1 className='text-white ml-4 mt-2'>demo_user1</h1>
          <div className='flex w-[96%] bg-[#1A1B1E] rounded-xl justify-between items-center p-2'><span className='flex items-center text-white'><FaVolumeHigh className='ml-2 mr-4' /> Sound</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={(() => dispatch(toggleSound(!soundSelector)))}
                checked={soundSelector}
              />
              <div className="w-11 h-6 bg-gray-200  rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5BA100]"></div>

            </label>
          </div>

          <div className='flex w-[96%] bg-[#323235] rounded-xl mt-2 flex-col gap-y-[1px]'>
            <div className='bg-[#1A1B1E] w-full cursor-pointer text-white rounded-t-xl py-2 px-4 flex items-center'><span className='mr-1'><CiStar className='size-5' /></span>Free Bets</div>
            <div className='bg-[#1A1B1E] w-full cursor-pointer text-white py-2 px-4 flex items-center'><span className='mr-1'><MdOutlineHistory className='size-5' /></span>Bet History</div>
            <div className='bg-[#1A1B1E] w-full cursor-pointer text-white  py-2 px-4 flex items-center'><span className='mr-1'><LuGamepad className='size-5' /></span>Game Limits</div>
            <div onClick={togglehowplay} className='bg-[#1A1B1E] w-full cursor-pointer text-white py-2 px-4 flex items-center'><span className='mr-1'><BsQuestionCircle className='size-5' /></span>How To Play</div>
            <div className='bg-[#1A1B1E] w-full cursor-pointer text-white py-2 px-4 flex items-center'><span className='mr-1'><LuClipboardList className='size-5' /></span>Game Rules</div>
            <div className='bg-[#1A1B1E] w-full cursor-pointer text-white rounded-b-xl py-2 px-4 flex items-center'><span className='mr-1'><FaBalanceScaleLeft className='size-5' /></span>Probably Fair Setting</div>

          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar