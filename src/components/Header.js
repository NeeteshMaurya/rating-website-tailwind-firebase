import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Appstate } from '../App'

const Header = () => {
  console.log('API')
  const useAppState = useContext(Appstate)
  const navigate = useNavigate()
  
  return (
    <div className='sticky top-0 z-10 bg-gray-900 border-b-2 border-gray-400 flex justify-between'>
      <figure className='animate-slide'>
        <div onClick={()=>navigate("/")} className='cursor-pointer animate-bounce text-red-500 font-bold text-3xl p-4 '>
          <span>Rate<span className='text-white'>Karo</span></span>
        </div>
      </figure>
      { useAppState.loggedin ?
        <h3 onClick={()=>navigate("/add-movies")} className='flex m-6 items-center 
        text-lg font-semibold cursor-pointer hover:-translate-y-1'>
          <AiOutlinePlus className='mr-1' fontSize={20} color='white' />Add New
        </h3> :
        <button onClick={()=>navigate("/login")} type="button" class="text-gray-900 bg-gradient-to-r from-lime-200
         via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 pt-[-15px] 
         focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 
         font-semibold  rounded-lg text-lg pl-5 pr-5 text-center m-3 mr-6">Login
         </button> 
      }
    </div>
  )
}

export default Header