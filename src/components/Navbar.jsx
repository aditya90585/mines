import React, { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { setNavcashout } from '../features/mines/mineSlices'

const Navbar = () => {
  const cashoutAmount = useSelector(state => state.cashOutamount)
const dispatch = useDispatch()
  const navcashout = useSelector(state=> state.navcashout)
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

  return (

    <nav className='md:bg-blue-800 md:w-full w-[99%] h-8 rounded-2xl flex justify-between items-center md:static absolute bottom-0'>
      <div className='flex w-1/3'>
        <div className='h-6 ml-1  w-35 p-1 text-white bg-blue-500 rounded-xl flex items-center justify-center'>Mines</div>
        <div className='h-6 ml-4 md:w-35 w-8 p-1 bg-orange-400 rounded-xl flex items-center justify-center'><span className='md:flex hidden'>How To Play</span> ?</div>
      </div>
      <div className='font-bold  md:w-1/3 hidden mb-2 md:flex justify-center items-center '>
        <span className='bg-orange-400 px-3 text-white  rounded-b-xl md:flex hidden'>Fun Mode</span>
      </div>
      <div className='flex md:w-1/3 w-2/3 justify-between  items-center'>
      <div className='bg-green-500 text-white rounded-xl px-5 ml-8'>{ (cashoutNotification!=null) ? <span className={`${cashoutNotification?"":"hidden"}`}>+ {cashoutNotification.toFixed(2)}</span>:""}</div>
        <div className='text-white mr-1'>{totalAmt.toFixed(2)} USD</div>

      </div>
    </nav>

  )
}

export default Navbar