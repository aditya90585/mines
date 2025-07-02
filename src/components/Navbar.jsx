import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const totalAmt = useSelector(state =>
    state.totalAmt
  )

  return (

    <nav className='md:bg-blue-800 md:w-full w-[99%] h-8 rounded-2xl flex justify-between items-center md:static absolute bottom-0'>
      <div className='flex w-1/3'>
        <div className='h-6 ml-1  w-35 p-1 text-white bg-blue-500 rounded-xl flex items-center justify-center'>Mines</div>
        <div className='h-6 ml-4 md:w-35 w-8 p-1 bg-orange-400 rounded-xl flex items-center justify-center'><span className='md:flex hidden'>How To Play</span> ?</div>
      </div>
      <div className='font-bold  w-1/3 mb-2 flex justify-center items-center '>
        <span className='bg-orange-400 px-3 text-white  rounded-b-xl md:flex hidden'>Fun Mode</span>
      </div>
      <div className='flex w-1/3 justify-center items-center'>
        <div className='text-white mr-1'>{totalAmt} USD</div>

      </div>
    </nav>

  )
}

export default Navbar