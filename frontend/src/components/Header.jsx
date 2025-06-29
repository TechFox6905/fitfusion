import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContent'

const Header = () => {
  const {userData} = useContext(AppContent);
  return (
    <div className='flex flex-col items-center justify-cente p-8 rounded-lg shadow-lg mt-22 px-4 text-center text-gray-800'>
        <img src={assets.header_img} alt="Header Image" className='w-36 h-36 rounded-full mb-6'/>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData? userData.name : 'Developer'}! <img className='w-8 aspect-square' src={assets.hand_wave} alt="Hand Wave" /></h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to FitFusion</h2>
        <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-200 transition-all'>Get Started</button>
    </div>
  )
}

export default Header