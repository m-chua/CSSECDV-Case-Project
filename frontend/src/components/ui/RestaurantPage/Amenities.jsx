import { Check, X } from 'lucide-react'


const amenitiesList = [
  'Offers Delivery',
  'Outdoor dining',
  'Indoor dining',
  'Good for Groups',
  'Music and TV',
  'Drive-thru',
  'Offers Takeout',
  'Accepts Credit Cards',
  'Accepts E-Wallet',
  'Good for Kids',
  'Good for Pets',
  'Vegetarian/Vegan Offerings'
]

const AmenitiesSection = ({ amenities }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Amenities and More</h2>
        <div className="grid grid-cols-2 gap-y-2">
            {amenitiesList.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
                {amenities.includes(index) ? (
                <Check className="w-5 h-5 text-green-500" />
                ) : (
                <X className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm">{amenity}</span>
            </div>
            ))}
        </div>
        </div>
    )
    
}

export default AmenitiesSection

