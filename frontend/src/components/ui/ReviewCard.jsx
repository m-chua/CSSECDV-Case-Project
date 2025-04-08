import { Card, CardContent } from '@/components/ui/shadcn/card'
import ReviewHeader from './ReviewHeader'
import ReviewFooter from './ReviewFooter'
import ReplySection from './ReplySection'

const ReviewContentText = ({ review }) => {
    return <p className='revsearch ml-5 mb-0 mr-5 text-gray-700 text-sm'>{review.review}</p>
}

const ReviewContentGrid = ({ review }) => {
    return (
        <div
            className={`p-4 grid gap-2 ${
                review.media.length === 1
                    ? 'grid-cols-2' // Still allow two columns even if there's one image
                    : review.media.length === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-2 sm:grid-cols-4'
            }`}
        >
            {review.media.map((image, index) => (
                <img
                    key={index}
                    src={`http://localhost:5000/${image}`}
                    alt={`Review image ${index + 1}`}
                    width={400}
                    height={300} 
                    className='rounded-lg object-cover'
                />
            ))}
        </div>
    )
}

const Review = ({
    review,
    isEditReviewDialogOpen,
    isDeleteReviewDialogOpen,
    setIsDeleteReviewDialogOpen,
    setIsEditReviewDialogOpen,
    currentReview,
    setCurrentReview,
    handleEditReview,
    handleDeleteReview
}) => {

    const isLoggedIn = !!localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const isReviewOwner = userId && review && review.userId === userId;  
    const restaurantId = localStorage.getItem('restaurantId')

    return (
        <Card name="review" key={review._id} className='mb-6 p-5'>
            <ReviewHeader review={review} />
            <CardContent>
                <ReviewContentText review={review} />
                {review.media.length > 0 && <ReviewContentGrid review={review} />}
                {review.replies && (
                    <ReplySection 
                        replies={review.replies}
                        restaurantName="Restaurant Name"
                        
                        isLoggedIn={isLoggedIn}
                        userId={userId}
                        isReviewOwner={isReviewOwner}
                        restaurantId={restaurantId}
                    />
                )}
            </CardContent>
            <ReviewFooter
                isDeleteReviewDialogOpen={isDeleteReviewDialogOpen}
                isEditReviewDialogOpen={isEditReviewDialogOpen}
                currentReview={currentReview}
                review={review}
                // setters
                setCurrentReview={setCurrentReview}
                setIsDeleteReviewDialogOpen={setIsDeleteReviewDialogOpen}
                setIsEditReviewDialogOpen={setIsEditReviewDialogOpen}
                handleDeleteReview={handleDeleteReview}
                handleEditReview={handleEditReview}
                // states
                isLoggedIn={isLoggedIn}
                userId={userId}
                isReviewOwner={isReviewOwner}
                restaurantId={restaurantId}
            />
        </Card>
    )
}

export default Review
