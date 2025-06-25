import React, { useState, useEffect } from 'react'

const Main = () => {
  const minesCount = 10
  const [boxes, setBoxes] = useState([])
  const [revealed, setRevealed] = useState([])

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newBoxes = Array(5 * 5).fill("safe")

    for (let index = 0; index < minesCount; index++) {
      const random = Math.floor(Math.random() * newBoxes.length)
      if (newBoxes[random] !== "mines") {
        newBoxes[random] = "mines"
      }
    }
    setBoxes(newBoxes)
    setRevealed(Array(5 * 5).fill(false))
  }


  const handleBoxclick = (index) => {

    const newRevealed = [...revealed]
    newRevealed[index] = "true"
    setRevealed(newRevealed)
    console.log("clicked", index)

  if(boxes[index]=="mines"){
    alert("you lose 💣💥")

      
  const revealall =   Array(5*5).fill("true")
  setRevealed(revealall)
      
    
    
  }

  }
  console.log(boxes, revealed)


  return (
    <main className='flex flex-col justify-between items-center h-8/10 '>
      <div className='flex flex-col md:w-1/3 w-9/10 mt-2'>

        <div className=' bg-blue-900 h-6 rounded-2xl flex justify-between items-center'>
          <div className='flex items-center h-5 mx-px'>
            <select name="Mines" className='bg-blue-700  rounded-xl  m-px text-white' >
              <option selected value="1">Mines 1</option>
              <option className='bg-red-200' value="2">Mines 2</option>
              <option value="3">Mines 3</option>
              <option value="4">Mines 4</option>
              <option value="5">Mines 5</option>
            </select>
          </div>
          <div className='bg-orange-400 rounded-xl px-1 mx-px text-sm text-white h-5'>Next: 1.10X</div>
        </div>
        <div className=' bg-blue-900 h-1 my-2 rounded-2xl flex justify-between items-center'></div>
      </div>
      <div className='md:w-1/3 md:h-86  h-1/3 w-8/10 bg-blue-600 rounded-2xl flex flex-wrap justify-between md:gap-x-2 gap-x-1 items-center'>
        {boxes.map((box, index) => {
          return <div key={index} onClick={() => handleBoxclick(index)} className={`h-1/6 text-3xl cursor-pointer w-1/6 rounded-xl border-4  flex justify-center items-center
          ${revealed[index]

              ? "grad2"
              : "grad"
            }
          `}>
        {revealed[index]?box=="safe"?"🌟":"💣":"🔵"}
        
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