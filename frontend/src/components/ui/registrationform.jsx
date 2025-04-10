import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/shadcn/label'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { Button } from '@/components/ui/shadcn/button'
import AvatarUploader from './AvatarUploader'
import CuisineSelector from './CuisineSelector'
import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const RegistrationForm = ({ isFlipped, setIsFlipped }) => {
    const initialFormData = {
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        avatar: null,
        cuisines: [],
        bio: ''
    }

    const [formData, setFormData] = useState(initialFormData)

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [usernameExists, setUsernameExists] = useState(false)

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData((prevData) => ({ ...prevData, [id]: value }))
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!error && !usernameExists) {
            try {
                const formDataToSend = new FormData()
                for (const key in formData) {
                    if (Array.isArray(formData[key])) {
                        formDataToSend.append(key, JSON.stringify(formData[key])) // Stringify the array
                    } else {
                        formDataToSend.append(key, formData[key])
                    }
                }

                const response = await fetch('http://localhost:5000/api/users/', {
                    method: 'POST',
                    body: formDataToSend
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                setFormData(initialFormData)
                setIsFlipped(true)
            } catch (error) {
                console.error('Error submitting the form:', error)
            }
        }
    }

    useEffect(() => {
        if (formData.password && formData.password.length < 8) {
            setError('Password must be at least 8 characters.')
        } else if (formData.password && !(/[a-zA-Z]/.test(formData.password) && /[0-9]/.test(formData.password))) {
            setError('Passwords should contain both numbers and letters.')//'Passwords should contain both numbers and letters.'
        } else if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.')
        } else {
            setError('')
        }
    }, [formData.password, formData.confirmPassword])

    useEffect(() => {
        const checkUsernameExists = async () => {
            if (formData.username) {
                try {
                    const response = await fetch(`http://localhost:5000/api/users/check-username/${formData.username}`)
                    const data = await response.json()
                    setUsernameExists(data.exists)
                } catch (error) {
                    console.error('Error checking username:', error)
                }
            } else {
                setUsernameExists(false) // Reset when the input is empty
            }
        }

        checkUsernameExists()
    }, [formData.username])

    return (
        <motion.div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}>
            <div className='bg-white space-y-6'>
                <h1 name="mode" className='text-3xl font-bold text-center text-primary'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='avatar' className='block text-sm font-medium'>
                            Avatar
                        </Label>
                        <AvatarUploader
                            setAvatar={(file) => setFormData((prevData) => ({ ...prevData, avatar: file }))}
                            id='avatar'
                            user={formData}
                            currentAvatar={formData.avatar}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='username' className='block text-sm font-medium'>
                            Username
                        </Label>
                        <Input
                            id='username'
                            placeholder='Your username'
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                        {usernameExists && <p name="UserExists" className='text-red-500 text-sm mt-1'>Username already exists.</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password' className='block text-sm font-medium'>
                            Password
                        </Label>
                        <div className='relative'>
                            <Input
                                id='password'
                                type={passwordVisible ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className='w-full pr-10'
                            />
                            <button
                                type='button'
                                onClick={togglePasswordVisibility}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            >
                                {passwordVisible ? (
                                    <EyeOffIcon className='h-5 w-5 text-gray-400' />
                                ) : (
                                    <EyeIcon className='h-5 w-5 text-gray-400' />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='confirmPassword' className='block text-sm font-medium'>
                            Confirm Password
                        </Label>
                        <Input
                            id='confirmPassword'
                            type={passwordVisible ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                        {error && <p name="PassDiff" className='text-red-500 text-sm mt-1'>{error}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='bio' className='block text-sm font-medium'>
                            Bio
                        </Label>
                        <Textarea
                            id='bio'
                            placeholder='Tell us a bit about yourself'
                            value={formData.bio}
                            onChange={handleInputChange}
                            className='w-full'
                        />
                    </div>

                    <CuisineSelector id='cuisines' formData={formData} setFormData={setFormData} />

                    <Button type='submit' className='w-full' disabled={usernameExists}>
                        Sign Up
                    </Button>
                </form>
                <p className='text-center text-sm pb-5'>
                    Already have an account?{' '}
                    <button
                        onClick={() => {
                            setFormData(initialFormData)
                            setIsFlipped(true)
                        }}
                        className='text-primary hover:underline focus:outline-none'
                    >
                        Log in
                    </button>
                </p>
            </div>
        </motion.div>
    )
}

export default RegistrationForm
