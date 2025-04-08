import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AvatarUploader = ({ id, currentAvatar, setAvatar, user }) => {
    const [avatarPreview, setAvatarPreview] = useState(currentAvatar || '')
    const [imageError, setImageError] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result)
                setAvatar(file)
                setImageError(false)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleError = () => {
        setImageError(true)
    }

    return (
        <div className='flex justify-center'>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='relative cursor-pointer'
                onClick={() => {
                    document.getElementById(id)?.click()
                }}
            >
                {/* Avatar Image */}
                <img
                    src={avatarPreview}
                    alt='Profile Picture'
                    className={`rounded-full w-24 h-24 object-cover border-2 border-black ${imageError ? 'hidden' : 'block'}`}
                    onError={handleError}
                />

                {/* Initials Fallback */}
                <div className={`flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full ${imageError ? 'flex' : 'hidden'}`}>
                    <span className='text-white text-2xl font-bold'>{user.username.slice(0, 2).toUpperCase()}</span>
                </div>

                <input id={id} type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
            </motion.div>
        </div>
    )
}

export default AvatarUploader
