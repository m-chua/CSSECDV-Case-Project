import { CardHeader } from '@/components/ui/shadcn/card'

import { Star, Clock } from 'lucide-react'

const ReviewTimeData = ({ review }) => {
    return (
    <div className='flex items-center text-sm text-gray-500 mt-1 text-xs'>
        <Clock className='w-2.5 h-2.5 mr-1' />
        {new Date(review.isEdited || review.date).toLocaleString()}
        {review.isEdited && (
            <span className='ml-2 text-gray-500 text-xs'>
                (Edited)
            </span>
        )}
    </div>
    )
}

const ReviewStars = ({ review }) => {
    return (
        <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    )
}

const ReviewHeader = ({ review }) => {
    return (
        <CardHeader>
            <div className='flex justify-between items-center'>
                <h3 name={review.title} className='revsearch text-xl font-semibold'>{review.title}</h3>
                <ReviewStars review={review} />
            </div>
            <ReviewTimeData review={review} />
        </CardHeader>
    )
}

export default ReviewHeader
