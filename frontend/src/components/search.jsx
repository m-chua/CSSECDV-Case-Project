import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/shadcn/popover'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/shadcn/card'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import RestaurantTable from './ui/RestaurantTable'
import PaginationControls from './ui/PaginationControls'

const ITEMS_PER_PAGE = 5

const RestaurantFilter = ({ selectedCuisine, setSelectedCuisine, minRating, setMinRating, maxPrice, setMaxPrice }) => {
    const cuisines = ['All', 'Japanese', 'Italian', 'American', 'Indian', 'Unknown']
    const ratings = [0, 1, 2, 3, 4, 5]

    return (
        <div className='mb-4 space-y-4'>
            <div>
                <label htmlFor='cuisine-filter' className='block text-sm font-medium text-gray-700'>
                    Cuisine
                </label>
                <select
                    id='cuisine-filter'
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                >
                    {cuisines.map((cuisine) => (
                        <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rating Filter */}
            <div>
                <label htmlFor='rating-filter' className='block text-sm font-medium text-gray-700'>
                    Minimum Rating
                </label>
                <select
                    id='rating-filter'
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                >
                    {ratings.map((rating) => (
                        <option key={rating} value={rating}>
                            {rating} {rating === 1 ? 'star' : 'stars'}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price Filter */}
            <div>
                <label htmlFor='price-filter' className='block text-sm font-medium text-gray-700'>
                    Maximum Price
                </label>
                <input
                    id='price-filter'
                    type='number'
                    value={maxPrice === Infinity ? '' : maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
                    placeholder='Max Price'
                    className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                />
            </div>
        </div>
    )
}

const SearchResult = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')

    const [restaurants, setRestaurants] = useState([])
    const [sortCriteria, setSortCriteria] = useState('rating')
    const [sortOrder, setSortOrder] = useState('desc')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCuisine, setSelectedCuisine] = useState('')
    const [minRating, setMinRating] = useState(0)
    const [maxPrice, setMaxPrice] = useState(Infinity)
    const [indexOfFirstRestaurant, setIndexOfFirstRestaurant] = useState(0)
    const [indexOfLastRestaurant, setIndexOfLastRestaurant] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentRestaurants, setCurrentRestaurants] = useState([])

    useEffect(() => {
        const indexOfLastRestaurant = currentPage * ITEMS_PER_PAGE
        const indexOfFirstRestaurant = indexOfLastRestaurant - ITEMS_PER_PAGE
        const currentRestaurants = restaurants
            .filter(
                (restaurant) =>
                    (selectedCuisine ? restaurant.cuisine === selectedCuisine : true) &&
                    restaurant.rating >= minRating &&
                    restaurant.avgPrice <= maxPrice
            )
            .sort((a, b) => sortRestaurants(a, b, sortCriteria, sortOrder))
            .slice(indexOfFirstRestaurant, indexOfLastRestaurant)

        const totalPages = Math.ceil(restaurants.length / ITEMS_PER_PAGE)

        setIndexOfLastRestaurant(indexOfLastRestaurant)
        setIndexOfFirstRestaurant(indexOfFirstRestaurant)
        setCurrentRestaurants(currentRestaurants)
        setTotalPages(totalPages)
    }, [restaurants, currentPage, selectedCuisine, minRating, maxPrice, sortCriteria, sortOrder])

    useEffect(() => {
        if (query) {
            const fetchRestaurants = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/restaurants/search?query=${query}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    if (response.ok) {
                        const data = await response.json()
                        setCurrentPage(1)
                        setRestaurants(data) // This will trigger the second useEffect
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error)
                }
            }
            fetchRestaurants()
        }
    }, [query])

    return (
        <div>
            <Header isLoggedIn={true} />
            <main className='flex-1 max-w-5xl mx-auto py-8 px-6'>
                <Card className='p-6 bg-white shadow-md rounded-lg'>
                    <CardHeader>
                        <CardTitle>Search results for "{query}"</CardTitle>
                    </CardHeader>

                    <Popover>
                        <PopoverTrigger className='text-black text-sm cursor-pointer float-right opacity-50 p-2'>Filter</PopoverTrigger>
                        <PopoverContent className='bg-white rounded-lg shadow-lg p-4'>
                            <RestaurantFilter
                                selectedCuisine={selectedCuisine}
                                setSelectedCuisine={setSelectedCuisine}
                                minRating={minRating}
                                setMinRating={setMinRating}
                                maxPrice={maxPrice}
                                setMaxPrice={setMaxPrice}
                            />
                        </PopoverContent>
                    </Popover>

                    <CardContent>
                    {currentRestaurants.length > 0 ? (
                            <>
                                <RestaurantTable
                                    restaurants={currentRestaurants}
                                    sortCriteria={sortCriteria}
                                    sortOrder={sortOrder}
                                    setSortCriteria={setSortCriteria}
                                    setSortOrder={setSortOrder}
                                />
                                <PaginationControls currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                            </>
                        ) : (
                            <div name="noResult" className="text-center text-gray-500 py-6">
                                No results found for "{query}". Try adjusting the filters or search criteria.
                            </div>
                        )}
                        
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

const sortRestaurants = (a, b, sortCriteria, sortOrder) => {
    if (sortCriteria === 'rating') {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating
    } else if (sortCriteria === 'price') {
        return sortOrder === 'desc' ? b.avgPrice - a.avgPrice : a.avgPrice - b.avgPrice
    }
    return 0
}

export default SearchResult
