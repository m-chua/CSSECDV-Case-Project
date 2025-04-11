import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/shadcn/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/shadcn/avatar'
import { Separator } from '@/components/ui/shadcn/separator'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from './icons/profileIcon'
import LogOutIcon from './icons/logouticon'

export default function ProfileDropdown({ onLogout, username, avatarUrl, isAdmin }) {
    const navigate = useNavigate()
    console.log(isAdmin)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='h-11 w-11 cursor-pointer'>
                    <AvatarImage src={avatarUrl} alt='User Avatar' className='object-cover' />
                    <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56 p-2 bg-white shadow-lg rounded-md'>
                <div className='flex flex-col gap-2 p-2'>
                    {/* User Info Section */}
                    <div className='flex items-center gap-2'>
                        <Avatar className='h-10 w-10'>
                            <AvatarImage src={avatarUrl} alt='User Avatar' className='object-cover' />
                            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className='text-left'>
                            <div className='text-sm font-medium'>{username}</div>
                        </div>
                    </div>

                    <Separator />

                    {/* Status Options */}
                    {/*{isAdmin  && (<DropdownMenuItem onClick={() => navigate('/logs') } >
                        <div className='flex items-center gap-2'>
                            <ProfileIcon className='h-4 w-4' />
                            <span>View Logs</span>
                        </div>
                    </DropdownMenuItem>)} */} 

                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <div className='flex items-center gap-2'>
                            <ProfileIcon className='h-4 w-4' />
                            <span>View Profile</span>
                        </div>
                    </DropdownMenuItem>

                    {/* Logout Option */}
                    <DropdownMenuItem onClick={onLogout} className='text-red-500' name = "logoutButton">
                        <div className='flex items-center gap-2'>
                            <LogOutIcon className='h-4 w-4' />
                            <span>Logout</span>
                        </div>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
