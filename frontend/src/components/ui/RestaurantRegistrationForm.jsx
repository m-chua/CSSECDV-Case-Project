import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/shadcn/label'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { Button } from '@/components/ui/shadcn/button'
import { Progress } from '@/components/ui/shadcn/progress'  // Import Progress component
import { motion } from 'framer-motion'
import { ConstructionIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import AvatarUploader from '@/components/ui/AvatarUploader'
import CuisineSelector from '@/components/ui/CuisineSelector'
import AmenitiesSelector from './AmenitiesSelector'

const RestaurantRegistrationForm = () => {
    const initialFormData = {
        name: '',
        cuisine: '',
        averageCost: '',
        media: null,
        description: '',
        amenities: [],
        address: '',
        phone: '',
        website: '',
        hours: '',
        username: '',
        password: '',
        confirmPassword: ''
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
                        console.log("is array", formData[key])
                        formDataToSend.append(key, JSON.stringify(formData[key])) // Stringify the array
                    } else {
                        formDataToSend.append(key, formData[key])
                    }
                }

                for (let [key, value] of formDataToSend.entries()) {
                    console.log(`${key}:`, value);
                  }

                const response = await fetch('http://localhost:5000/api/restaurants/', {
                    method: 'POST',
                    body: formDataToSend,
                    credentials: 'include',

                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                setFormData(initialFormData)
            } catch (error) {
                console.error('Error submitting the form:', error)
            }
        }
    }



    useEffect(() => {
        if (formData.password && formData.password.length < 8) {
            setError('Password must be at least 8 characters.')
        } else if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.')
        } else {
            setError('')
        }
    }, [formData.password, formData.confirmPassword])

    // useEffect(() => {
    //     const checkUsernameExists = async () => {
    //         if (formData.username) {
    //             try {
    //                 const response = await fetch(`http://localhost:5000/api/restaurants/check-username/${formData.username}`)
    //                 const data = await response.json()
    //                 setUsernameExists(data.exists)
    //             } catch (error) {
    //                 console.error('Error checking username:', error)
    //             }
    //         } else {
    //             setUsernameExists(false) // Reset when the input is empty
    //         }
    //     }

    //     checkUsernameExists()
    // }, [formData.username])

    // Function to calculate form completion progress
    const calculateProgress = () => {
        const totalFields = Object.keys(initialFormData).length
        const filledFields = Object.values(formData).filter(value => value !== '' && value !== null && value.length !== 0).length
        return (filledFields / totalFields) * 100
    }

    return (
        <motion.div className={`absolute w-full h-full backface-hidden`}>
            <div className='bg-white space-y-6'>
                <h1 className='text-3xl font-bold text-center text-black-700'>Restaurant Sign Up</h1>

                {/* Progress Bar */}
                <div className='pb-4'>
                    <Progress value={calculateProgress()} max={100} className="h-2 bg-gray-500 rounded-lg" />
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='name' className='block text-sm font-medium'>
                            Restaurant Name <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id='name'
                            placeholder='Restaurant Name'
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                    </div>

                    <div className='space-y-2'>
                        <CuisineSelector
                            id='cuisine'
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>

                    {/* Avatar in its own section */}
                    <div className='space-y-2'>
                        <Label htmlFor='media' className='block text-sm font-medium'>
                            Restaurant Media (Avatar) <span className='text-red-500'>*</span>
                        </Label>
                        <AvatarUploader
                            setAvatar={(file) => setFormData((prevData) => ({ ...prevData, media: file }))} 
                            id='media' 
                            user={formData} 
                            currentAvatar={formData.media}
                            required
                        />
                    </div>

                    {/* Average Cost in separate columns */}
                   
                    <div className='space-y-2'>
                        <Label htmlFor='averageCost' className='block text-sm font-medium'>
                            Average Cost <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id='averageCost'
                            type='number'
                            value={formData.averageCost}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <Label htmlFor='description' className='block text-sm font-medium'>
                            Description <span className='text-red-500'>*</span>
                        </Label>
                        <Textarea
                            id='description'
                            placeholder='Restaurant Description'
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Contact info in two columns */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='address' className='block text-sm font-medium'>
                                Address <span className='text-red-500'>*</span>
                            </Label>
                            <Input
                                id='address'
                                placeholder='Restaurant Address'
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className='w-full'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='phone' className='block text-sm font-medium'>
                                Phone Number <span className='text-red-500'>*</span>
                            </Label>
                            <Input
                                id='phone'
                                placeholder='Phone Number'
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className='w-full'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='website' className='block text-sm font-medium'>
                                Website <span className='text-red-500'>*</span>
                            </Label>
                            <Input
                                id='website'
                                placeholder='Restaurant Website'
                                value={formData.website}
                                onChange={handleInputChange}
                                required
                                className='w-full'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='hours' className='block text-sm font-medium'>
                                Hours of Operation <span className='text-red-500'>*</span>
                            </Label>
                            <Input
                                id='hours'
                                placeholder='Operating Hours'
                                value={formData.hours}
                                onChange={handleInputChange}
                                required
                                className='w-full'
                            />
                        </div>
                    </div>

                    {/* Other fields (Username, Password, etc.) */}

                        {/* Username and password fields */}
                        <div className='space-y-2'>
                        <Label htmlFor='username' className='block text-sm font-medium'>
                            Username <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id='username'
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                        {usernameExists && <p className='text-red-500 text-sm mt-1'>Username already exists.</p>}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='password' className='block text-sm font-medium'>
                            Password <span className='text-red-500'>*</span>
                        </Label>
                        <div className='relative'>
                            <Input
                                id='password'
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className='w-full'
                            />
                            <button
                                type='button'
                                onClick={togglePasswordVisibility}
                                className='absolute right-3 top-3'
                            >
                                {passwordVisible ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='confirmPassword' className='block text-sm font-medium'>
                            Confirm Password <span className='text-red-500'>*</span>
                        </Label>
                        <Input
                            id='confirmPassword'
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className='w-full'
                        />
                        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
                    </div>


                    <div className='space-y-2 pb-5'>
                        <AmenitiesSelector
                            id='amenities'
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>

                    <div className='pb-10'>
                        <Button
                            id = "submit"
                            type='submit'
                            className='w-full py-2 bg-black text-white rounded-lg hover:bg-primary'
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

export default RestaurantRegistrationForm
