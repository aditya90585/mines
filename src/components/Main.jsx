import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { betAmt, togglefooter, togglemain } from '../features/mines/mineSlices'



const Main = () => {
  const [minesCount, setMinesCount] = useState(3)
  const [boxes, setBoxes] = useState([])
  const [revealed, setRevealed] = useState([])
  const [maindisable, setMaindisable] = useState(true)
const [togglemine, setTogglemine] = useState(true)
const [totalmines, setTotalmines] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])

  const mainselector = useSelector(state => state.disablemain)
  const footerselector = useSelector(state => state.disablefooter)
  const dispatch = useDispatch()

  useEffect(() => {
    resetGame();
  }, [minesCount]);


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

    setMaindisable(true)
    dispatch(togglemain(true))
    setBoxes(newBoxes)
    setRevealed(Array(5 * 5).fill(false))
  }


  const handleBoxclick = (index) => {
    if(footerselector){

    const newRevealed = [...revealed]
    newRevealed[index] = "true"
    setRevealed(newRevealed)

    if (boxes[index] == "mines") {
      alert("you lose 💣💥")
      const revealall = Array(5 * 5).fill("true")
      setRevealed(revealall)
      setTimeout(() => {
        dispatch(togglefooter(false))
        resetGame()
      }, 1500);

    }
  }
  }

  const togglemineselector = () =>{
   setTogglemine(!togglemine)

  }

  const changemines= (mines)=>{
    setMinesCount(mines)
    setTogglemine(true)
  
  }


  return (
    <main className={`flex flex-col justify-between items-center h-8/10  `}>
      <div className={`flex flex-col md:w-1/3 w-9/10 mt-2 ${footerselector ? "disable-main" : ""}`}>

        <div className=' bg-blue-900 h-6 rounded-2xl flex justify-between items-center'>
          <div className='flex items-center h-5 mx-px '>
            <div onClick={togglemineselector} className='bg-sky-700 cursor-pointer rounded-xl px-8 h-5 text-white flex justify-center items-center' >
              Mines : {minesCount}
            </div>
            <div className={`h-55 w-43 bg-slate-800 fixed md:top-17 top-9 overflow-y-scroll rounded-xl ${togglemine?"hidden":""}`}>
             {totalmines.map((mines)=>{
             return <div onClick={()=>changemines(mines)} className={` cursor-pointer text-white mx-4 mt-4 mb-4 h-5 flex justify-center items-center rounded-xl ${(minesCount)==mines?"bg-sky-700":"bg-sky-900"}`}>{mines}</div>
             })}
             
            
            </div>
          </div>
          <div className='bg-orange-400 rounded-xl px-8 mx-px text-sm text-white h-5'>Next: 1.10X</div>
        </div>
        <div className=' bg-blue-900 h-1 my-2 rounded-2xl flex justify-between items-center'></div>
      </div>
      <div className={`md:w-1/3 md:h-86  h-1/3 w-8/10 bg-blue-600 rounded-2xl flex flex-wrap justify-between md:gap-x-2 gap-x-1 items-center ${mainselector ? "disable-main" : ""}`}>
        {boxes.map((box, index) => {
          return <div key={index} onClick={() => handleBoxclick(index)} className={`h-1/6 md:text-3xl text-xl cursor-pointer w-1/6 md:rounded-xl rounded-md border-4  flex justify-center items-center
          ${revealed[index]

              ? "grad2"
              : "grad"
            }
          `}>
            {revealed[index] ? box == "safe" ? "🌟" : "💣" :  <div className={`h-5 w-5 rounded-full gradcircle `}></div> }

            {/* <div className={`h-5 w-5 rounded-full gradcircle `}></div> */}
          </div>
        })}

      </div>
      <div className='flex md:w-1/3 w-9/10 h-8 justify-between items-center mt-3 mb-2 space-x-1'>
        <div className='w-1/2 bg-sky-700 border border-gray-800 rounded-xl flex justify-center items-center text-white font-semibold font-sans '>RANDOM</div>
        <div className='w-1/2 bg-blue-900 border border-gray-800 rounded-xl flex justify-center items-center text-white font-semibold font-sans '>

          AUTOGAME
        </div>

      </div>
    </main>

  )
}

export default Main