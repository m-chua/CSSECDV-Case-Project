import React from 'react'
import { FaPizzaSlice, FaUtensils, FaPepperHot, FaFish, FaDrumstickBite, FaHamburger } from 'react-icons/fa' // Example icons from FontAwesome
const cuisines = ['Italian', 'Chinese', 'Mexican', 'Japanese', 'Filipino', 'American']

const cuisineTags = {
    Italian: { icon: <FaPizzaSlice className='h-4 w-4 text-red-600' />, bgColor: 'bg-red-100', textColor: 'text-red-600' },
    Chinese: { icon: <FaUtensils className='h-4 w-4 text-yellow-600' />, bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
    Mexican: { icon: <FaPepperHot className='h-4 w-4 text-green-600' />, bgColor: 'bg-green-100', textColor: 'text-green-600' },
    Japanese: { icon: <FaFish className='h-4 w-4 text-purple-600' />, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
    Filipino: { icon: <FaDrumstickBite className='h-4 w-4 text-blue-600' />, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    American: { icon: <FaHamburger className='h-4 w-4 text-orange-600' />, bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
}

const ProfileCuisinesCard = ({ givenCuisines }) => {
    return (
        <div className='flex flex-wrap items-center gap-2 pb-5'>
            {givenCuisines.length === 0 ? (
                <p className='text-gray-500 text-sm'>No main cuisine</p>
            ) : (
                cuisines
                    .filter((cuisine) => givenCuisines.includes(cuisine))
                    .map((cuisine) => (
                        <div
                            name={cuisine}
                            key={cuisine}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${cuisineTags[cuisine].bgColor} ${cuisineTags[cuisine].textColor}`}
                        >
                            {cuisineTags[cuisine].icon}
                            {cuisine}
                        </div>
                    ))
            )}
        </div>
    )
}

export default ProfileCuisinesCard
