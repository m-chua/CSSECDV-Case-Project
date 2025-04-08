import React from 'react'
import { FaPizzaSlice, FaUtensils, FaPepperHot, FaFish, FaDrumstickBite, FaHamburger } from 'react-icons/fa'

// Italian Icon Component
export const ItalianIcon = () => (
    <div className='bg-red-100 p-2 rounded flex items-center mb-2'>
        <FaPizzaSlice className='h-4 w-4 text-red-600' />
        <span className='text-red-600 ml-2'>Italian</span>
    </div>
)

// Chinese Icon Component
export const ChineseIcon = () => (
    <div className='bg-yellow-100 p-2 rounded flex items-center mb-2'>
        <FaUtensils className='h-4 w-4 text-yellow-600' />
        <span className='text-yellow-600 ml-2'>Chinese</span>
    </div>
)

// Mexican Icon Component
export const MexicanIcon = () => (
    <div className='bg-green-100 p-2 rounded flex items-center mb-2'>
        <FaPepperHot className='h-4 w-4 text-green-600' />
        <span className='text-green-600 ml-2'>Mexican</span>
    </div>
)

// Japanese Icon Component
export const JapaneseIcon = () => (
    <div className='bg-purple-100 p-2 rounded flex items-center mb-2'>
        <FaFish className='h-4 w-4 text-purple-600' />
        <span className='text-purple-600 ml-2'>Japanese</span>
    </div>
)

// Filipino Icon Component
export const FilipinoIcon = () => (
    <div className='bg-blue-100 p-2 rounded flex items-center mb-2'>
        <FaDrumstickBite className='h-4 w-4 text-blue-600' />
        <span className='text-blue-600 ml-2'>Filipino</span>
    </div>
)

// American Icon Component
export const AmericanIcon = () => (
    <div className='bg-orange-100 p-2 rounded flex items-center mb-2'>
        <FaHamburger className='h-4 w-4 text-orange-600' />
        <span className='text-orange-600 ml-2'>American</span>
    </div>
)
