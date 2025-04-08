import CustomToggleButton from '@/components/ui/CustomToggleButton'

const AmenitiesSelector = ({ id, formData, setFormData }) => {
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

    const handleAmenityToggle = (amenityIndex) => {
        setFormData((prevData) => {
            const updatedAmenities = prevData[id].includes(amenityIndex)
                ? prevData[id].filter((index) => index !== amenityIndex)
                : [...prevData[id], amenityIndex]
            return { ...prevData, [id]: updatedAmenities }
        })
    }

    return (
        <div className='space-y-4'>
            <h2 className='block text-left text-2xl font-bold'>
                Choose your amenities<span className='text-red-500'>*</span>
            </h2>
            
            <div className='grid grid-cols-2 gap-4'>
                {amenitiesList.map((amenity, index) => (
                    <CustomToggleButton
                        key={amenity}
                        isActive={formData[id].includes(index)}
                        onClick={() => handleAmenityToggle(index)}
                        label={amenity}
                    />
                ))}
            </div>
        </div>
    )
}

export default AmenitiesSelector
