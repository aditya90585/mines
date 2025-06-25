import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {


  return (
    <div className="h-screen w-screen bg-black m-0 p-0 flex justify-center items-center">
        
      <div className='border-amber-500 bg-blue-600 border-2 rounded-2xl  w-screen h-screen'>

        <Navbar/>
        <Main/>
       <Footer/>
      </div>

    </div>
  )
}

export default App
