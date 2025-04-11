import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/shadcn/label'
import { Input } from '@/components/ui/shadcn/input'
import { Button } from '@/components/ui/shadcn/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ isFlipped, setIsFlipped }) => {
    const initialFormData = {
        loginUsername: '',
        loginPassword: ''
    }

    const [formData, setFormData] = useState(initialFormData)

    const navigate = useNavigate()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData((prevData) => ({ ...prevData, [id]: value }))
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible)
    }

    const triggerLogin = async (link) => {
        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.loginUsername,
                password: formData.loginPassword
            }),
            credentials: 'include'
        })

        return response
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            let response = await triggerLogin('http://localhost:5000/api/users/login')
            let errorData = await response.json();
            console.log(errorData.message); // Access the message
            if(errorData.message == "Too many inavlid attempts. Account disabled. Try again in 5 days."){throw new Error(errorData.message);}

            if (!response.ok) {
                let response2 = await triggerLogin('http://localhost:5000/api/restaurants/login')
                errorData = await response2.json();
                console.log(errorData.message); // Access the message
                if(errorData.message == "Too many inavlid attempts. Account disabled. Try again in 5 days."){ throw new Error(errorData.message);}

                if (!response2.ok) {
                    let response3 = await triggerLogin('http://localhost:5000/api/admins/login')
                     errorData = await response3.json();
                console.log(errorData.message); // Access the message
                if(errorData.message == "Too many inavlid attempts. Account disabled. Try again in 5 days."){throw new Error(errorData.message);}

                    if(!response3.ok){
                        //const data = await response3.json()
                        throw new Error(errorData.message || 'Login failed')           
                    } else {
                        const data = errorData//await response.json()
    
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('adminId', data.userId)
                        
                        localStorage.setItem('password', data.password)
                        localStorage.setItem('isAdmin', true)
                        alert("Your last login was on: " + data.lastLogin)      
                        //navigate(`/restaurants/${data.userId}`)     
                        
                        navigate('/logs')
                    }
                } else {
                    const data = errorData//await response.json()
    
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('restaurantId', data.userId)

                    localStorage.setItem('isAdmin', false)
                    localStorage.setItem('password', data.password)
                    alert("Your last login was on: " + data.lastLogin)      
                    navigate(`/restaurants/${data.userId}`)        
                }
            } else {
                const data = errorData//await response.json()

                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('isAdmin', false)
                localStorage.setItem('password', data.password)
                alert("Your last login was on: " + data.lastLogin)
                navigate('/profile')
    
            }


        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token') // Retrieve token from local storage
        if (token) {
            navigate('/')
        }
    }, [])

    return (
        <motion.div
            className={`absolute w-full h-full backface-hidden ${!isFlipped ? 'hidden' : ''} mt-20`}
            style={{ transform: 'rotateY(180deg)' }}
        >
            <div className='bg-white p-8 rounded-xl  space-y-6'>
                <h1 name="mode" className='text-3xl font-bold text-center text-primary'>Log In</h1>

                {error && (
                    <div name="invalidAuth" className='rounded-md bg-red-50 p-4 text-sm text-red-800 mt-4'>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <CircleIcon className='h-5 w-5 text-red-400' />
                            </div>
                            <div className='ml-3'>
                                <h3 className='text-sm font-medium'>Unable to login</h3>
                                <div className='mt-2 text-sm'> {error}</div>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='loginUsername' className='block text-sm font-medium'>
                            Username
                        </Label>
                        <Input id='loginUsername' required className='w-full' onChange={handleInputChange} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='loginPassword' className='block text-sm font-medium'>
                            Password
                        </Label>
                        <div className='relative'>
                            <Input
                                id='loginPassword'
                                type={passwordVisible ? 'text' : 'password'}
                                required
                                className='w-full pr-10'
                                onChange={handleInputChange}
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

                    <Button type='submit' className='w-full'>
                        Log In
                    </Button>
                </form>
                <p className='text-center text-sm'>
                    Don't have an account?{' '}
                    <button name = "SignUp"
                        onClick={() => {
                            setFormData(initialFormData)
                            setIsFlipped(false)
                        }}
                        className='text-primary hover:underline focus:outline-none'
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </motion.div>
    )
}

function CircleIcon(props) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <circle cx='12' cy='12' r='10' />
        </svg>
    )
}

export default LoginForm
