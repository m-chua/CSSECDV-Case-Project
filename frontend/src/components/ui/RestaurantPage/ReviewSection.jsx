import { Star } from 'lucide-react'
import { Progress } from "@/components/ui/shadcn/progress"

const calculateReviewDistribution = (reviews) => {
  if(!reviews){
    return {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
  }
  const totalReviews = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    percentage: 0
  }));

  reviews.forEach((review) => {
    const rating = review.rating;
    const ratingObj = distribution.find(item => item.stars === rating);
    if (ratingObj) {
      ratingObj.percentage += 1;
    }
  });

  distribution.forEach(item => {
    item.percentage = ((item.percentage / totalReviews) * 100);
  });

  return distribution;
};


export default function ReviewSection({ rating, reviewCount, reviews }) {
  const reviewDistribution = calculateReviewDistribution(reviews)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center mb-6">
        <div className="text-5xl font-bold text-black mr-4">{rating.toFixed(1)}</div>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${i < Math.floor(rating) ? 'text-yellow-300 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">{reviewCount} reviews</div>
        </div>
      </div>
      <div className="space-y-2">
        {reviewDistribution.map((review) => (
          <div key={review.stars} className="flex items-center">
            <span className="w-12 text-xs">{review.stars} stars</span>
            <Progress value={review.percentage} className="h-3 mx-2" />
            <span className="w-12 text-xs text-right">{review.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

