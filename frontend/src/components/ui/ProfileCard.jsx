import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar'
import { Card, CardFooter, CardHeader } from '@/components/ui/shadcn/card'
import EditProfile from './EditProfileCard'

const ProfileCard = ({ user, isEditDialogOpen, setIsEditDialogOpen, setUserData }) => {
    return (
        <div className='md:col-span-1 md:sticky md:top-4 md:self-start'>
            <Card className='mb-6'>
                <CardHeader className='flex flex-col items-center'>
                    <Avatar className='w-24 h-24 border-4 border-gray-200'>
                        <AvatarImage src={user.avatarUrl} alt={user.username} className='object-cover' />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h1 name="user" className='text-2xl font-bold mt-4'>{user.username}</h1>
                    <p name="bio" className='text-sm text-gray-600 mt-2 text-center'>{user.bio}</p>
                    <p className='text-sm text-gray-600 mt-2'>Member since {user.memberSince}</p>
                </CardHeader>
                <CardFooter className='justify-center'>
                    <EditProfile
                        isEditDialogOpen={isEditDialogOpen}
                        setIsEditDialogOpen={setIsEditDialogOpen}
                        user={user}
                        setUserData={setUserData}
                    />
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProfileCard
