import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/shadcn/input'

const InputPassword = ({ id, handlePasswordChange }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible)
    }

    return (
        <div className='relative'>
            <Input id={id} type={passwordVisible ? 'text' : 'password'} onChange={handlePasswordChange} />
            <button type='button' onClick={togglePasswordVisibility} className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                {passwordVisible ? <EyeOffIcon className='h-5 w-5 text-gray-400' /> : <EyeIcon className='h-5 w-5 text-gray-400' />}
            </button>
        </div>
    )
}

export default InputPassword
