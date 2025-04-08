import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/shadcn/card'
import Header from './Header'
import ProfileCard from './ui/ProfileCard'
import Review from './ui/ReviewCard'
import useAuthRedirect from '@/CustomHooks/useAuthRedirect'
import ProfileCuisinesCard from './ProfileCuisinesCard'
import { FaSadCry } from 'react-icons/fa'

const UserProfile = () => {
    useAuthRedirect('/login')

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false)
    const [isEditReviewDialogOpen, setIsEditReviewDialogOpen] = useState(false)
    const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = useState(false)
    const [currentReview, setCurrentReview] = useState(null)

    const initialFormData = {
        name: '',
        username: '',
        newUsername: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        avatar: null,
        cuisines: [],
        newCusines: [],
        bio: '',
        newBio: '',
        reviews: [],
        memberSince: '',
        averageRating: 0.0
    }

    const [formData, setFormData] = useState(initialFormData)
    const [reviews, setReviews] = useState([])

    const fetchUserData = async () => {
        if (!userId) return // added layer of checking

        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }

            const data = await response.json()
            data['avatarUrl'] = `http://localhost:5000/${data['avatar']}`
            data['newAvatarUrl'] = `http://localhost:5000/${data['avatar']}`
            data['newUsername'] = data['username']
            data['newBio'] = data['bio']
            data['newCuisines'] = data['cuisines']
            setFormData(data)
            setReviews(data.reviews)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const handleEditReview = (id, newContent) => {
        setReviews(
            reviews.map((review) => (review.id === id ? { ...review, content: newContent, editedAt: new Date().toISOString() } : review))
        )
        setIsEditReviewDialogOpen(false)
    }

    const handleDeleteReview = (id) => {
        setReviews(reviews.filter((review) => review.id !== id))
        setIsDeleteReviewDialogOpen(false)
    }

    const ratingData = reviews.map((review) => ({
        name: review.restaurant,
        rating: review.rating
    }))

    useEffect(() => {
        fetchUserData()
        console.log('done')
        console.log(reviews)
    }, [])

    return (
        <div>
            <Header />
            <div className='container mx-auto p-4 max-w-7xl font-poppins'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                    {/* Left Sidebar */}
                    <ProfileCard
                        user={formData}
                        isEditDialogOpen={isEditProfileDialogOpen}
                        setIsEditDialogOpen={setIsEditProfileDialogOpen}
                        setUserData={setFormData}
                    />

                    {/* Main Content */}
                    <div className='md:col-span-2'>
                        <h2 className='text-2xl font-bold mb-4'>My Reviews</h2>
                        {reviews.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-10 text-black '>
                                <FaSadCry className='h-12 w-12 animate-bounce' />
                                <p className='mt-2 text-lg'>You have no reviews yet.</p>
                                <p className='text-sm'>Why not add some?</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <Review
                                    key={review._id} // Make sure to include a unique key for each review
                                    isEditReviewDialogOpen={isEditReviewDialogOpen}
                                    setIsEditReviewDialogOpen={setIsEditReviewDialogOpen}
                                    isDeleteReviewDialogOpen={isDeleteReviewDialogOpen}
                                    setIsDeleteReviewDialogOpen={setIsDeleteReviewDialogOpen}
                                    currentReview={currentReview}
                                    setCurrentReview={setCurrentReview}
                                    handleEditReview={handleEditReview}
                                    handleDeleteReview={handleDeleteReview}
                                    review={review}
                                />
                            ))
                        )}
                    </div>

                    {/* Right Sidebar */}

                    <div className='md:col-span-1 md:sticky md:top-4 md:self-start'>
                        <Card className='mb-6 p-5'>
                            <CardHeader>
                                <h2 className='text-xl font-semibold'>Main Cuisines</h2>
                            </CardHeader>
                            <CardContent>
                                <ProfileCuisinesCard givenCuisines={formData.cuisines} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
