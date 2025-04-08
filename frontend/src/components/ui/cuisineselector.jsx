import CustomToggleButton from '@/components/ui/CustomToggleButton'

const CuisineSelector = ({ id, formData, setFormData }) => {
    const handleCuisineToggle = (cuisine) => {
        setFormData((prevData) => {
            const updatedCuisines = prevData[id].includes(cuisine) ? prevData[id].filter((c) => c !== cuisine) : [...prevData[id], cuisine]
            return { ...prevData, [id]: updatedCuisines }
        })
    }

    return (
        <div className='space-y-4'>
            <h2 className='block text-left text-2xl font-bold'>Choose your cuisines<span className='text-red-500'>*</span></h2>
            <div className='grid grid-cols-2 gap-4'>
                {['Italian', 'Chinese', 'Mexican', 'Japanese', 'Filipino', 'American'].map((cuisine) => (
                    <CustomToggleButton
                        
                        key={cuisine}
                        isActive={formData[id].includes(cuisine)}
                        onClick={() => handleCuisineToggle(cuisine)}
                        label={cuisine}
                    />
                ))}
            </div>
        </div>
    )
}

export default CuisineSelector
