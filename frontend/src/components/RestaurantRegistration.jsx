import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import RestaurantRegistrationForm from './ui/RestaurantRegistrationForm'

const RestaurantRegistration = () => {

    return (
        <div>
            <Header isLoggedIn={false} />
            <div className='flex items-center justify-center h-screen mt-20'>
                <motion.div
                    className='w-full max-w-md h-full perspective mb-20'
                    initial={false}
                    animate={{ rotateY: 0  }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                >
                    <div className='relative w-full h-full flex flex-col justify-center items-center'>
                        <RestaurantRegistrationForm />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default RestaurantRegistration
