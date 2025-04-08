
import { Star } from 'lucide-react'
import { Badge } from "@/components/ui/shadcn/badge"

const  RestaurantHeader = ({ restaurant, reviewCount }) => {
  return (
    <div className="border-b mb-10">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img
                src={`http://localhost:5000/${restaurant.media}`}
                alt={restaurant.name}
                width={220}
                height={220}
                className="rounded-md object-cover"

            />
          </div>
          <div>
            <h1 name="restoName" className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(restaurant.averageRating)
                        ? 'text-yellow-300 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">{reviewCount} reviews</span>
            </div>
            <div className="flex items-center space-x-2">
            {
              Array.isArray(restaurant.cuisine) && 
              restaurant.cuisine.map((cuisine, index) => (
                <Badge key={index} variant="secondary">{cuisine}</Badge>
              ))
            }

              <span className="text-gray-500">{restaurant.priceRange}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
