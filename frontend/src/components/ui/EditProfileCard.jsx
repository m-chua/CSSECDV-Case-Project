import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/shadcn/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/shadcn/dialog'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { Edit, Camera } from 'lucide-react'
import CuisineSelector from './CuisineSelector'
import InputPassword from './InputPassword'
import AvatarUploader from './AvatarUploader'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const EditProfile = ({ user, isEditDialogOpen, setIsEditDialogOpen, setUserData }) => {
    const token = localStorage.getItem('token')
    const [error, setError] = useState('')
    const [usernameExists, setUsernameExists] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setUserData((prevData) => ({ ...prevData, [id]: value }))
    }

    useEffect(() => {
        const checkUsernameExists = async () => {
            if (user.newUsername && user.newUsername !== user.username) {
                // Only check if username has changed
                try {
                    const response = await fetch(`http://localhost:5000/api/users/check-username/${user.newUsername}`)
                    const data = await response.json()
                    setUsernameExists(data.exists)
                } catch (error) {
                    console.error('Error checking username:', error)
                }
            } else {
                setUsernameExists(false)
            }
        }
        checkUsernameExists()
    }, [user.newUsername, user.username])

    useEffect(() => {
        if (!user.newPassword) {
            return
        }
        // console.log(user.newPassword)
        if (user.newPassword.length > 0 && user.newPassword.length < 8) {
            setError('Password must be at least 8 characters.')
        }else if (formData.password && !(/[a-zA-Z]/.test(formData.password) && /[0-9]/.test(formData.password))) {
            setError('Passwords should contain both numbers and letters.')//'Passwords should contain both numbers and letters.'
        } else if (user.newPassword !== user.confirmPassword) {
            setError('Passwords do not match.')
        } else if (user.password == user.newPassword) {
            setError('Entered current and new password is the same')
        } else {
            setError('')
        }
    }, [user.newPassword, user.confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!error && !usernameExists) {
            try {
                const updatedProfile = new FormData()

                updatedProfile.append('oldUsername', user.username)
                updatedProfile.append('username', user.newUsername)
                updatedProfile.append('bio', user.newBio || '')
                updatedProfile.append('password', user.password)
                updatedProfile.append('cuisines', JSON.stringify(user.newCuisines))
                updatedProfile.append('avatar', user.newAvatarUrl)
                if (user.newPassword) updatedProfile.append('newPassword', user.newPassword)

                const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: updatedProfile
                })

                if (!response.ok) {
                    throw new Error('Failed to update profile')
                }
                window.location.reload()
            } catch (error) {
                console.error('Error updating profile:', error)
            }
        }
    }

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
                <Button name="editProf" variant='outline'>
                    <Edit className='w-4 h-4 mr-2' /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto scrollable-area'>
                {' '}
                {/* Set max height and enable scrolling */}
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
                    <div className='flex items-center gap-4'>
                        <Label htmlFor='avatar' className='block text-sm font-medium'>
                            Avatar
                        </Label>
                        <AvatarUploader
                            id='newAvatarUrl'
                            setAvatar={(file) => {
                                setUserData((prevData) => ({ ...prevData, newAvatarUrl: file }))
                            }}
                            user={user}
                            currentAvatar={user.avatarUrl}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input id='newUsername' value={user.newUsername} onChange={handleInputChange} />
                        {usernameExists && <p className='text-red-500 text-sm'>Username already exists.</p>}
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='bio'>Bio</Label>
                        <Textarea id='newBio' value={user.newBio} onChange={handleInputChange} />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Current Password</Label>
                        <InputPassword id='password' handlePasswordChange={handleInputChange} />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='newPassword'>New Password</Label>
                        <InputPassword
                            id='newPassword'
                            handlePasswordChange={(e) => setUserData((prevData) => ({ ...prevData, newPassword: e.target.value }))}
                        />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <InputPassword id='confirmPassword' handlePasswordChange={handleInputChange} />
                    </div>
                    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
                    <CuisineSelector id='newCuisines' formData={user} setFormData={setUserData} />
                    <Button name="submit" type='submit' className='w-full' disabled={usernameExists}>
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
