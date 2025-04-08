import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import RegistrationForm from './ui/RegistrationForm'
import LoginForm from './ui/LoginForm'

const AuthForm = () => {
    const [isFlipped, setIsFlipped] = useState(true)

    return (
        <div>
            <Header isLoggedIn={false} />
            <div className='flex items-center justify-center h-screen mt-20'>
                <motion.div
                    className='w-full max-w-md h-full perspective mb-20'
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                >
                    <div className='relative w-full h-full flex flex-col justify-center items-center'>
                        <LoginForm isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                        <RegistrationForm isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AuthForm
