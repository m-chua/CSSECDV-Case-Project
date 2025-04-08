import React from 'react'
import { Link } from 'react-router-dom' // Use react-router for routing
import Header from './Header'
import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { motion, AnimatePresence } from 'framer-motion'

import { Star, Coffee, Wifi, ParkingCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const amenityIcons = {
    1: <Coffee className='w-4 h-4' />,
    2: <Wifi className='w-4 h-4' />,
    3: <ParkingCircle className='w-4 h-4' />
}

const Home = () => {
    const cuisines = ['All', 'Italian', 'Chinese', 'Mexican', 'Japanese', 'Filipino', 'American']

    const [restaurants, setRestaurants] = useState([])
    const [selectedCuisine, setSelectedCuisine] = useState('All')

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/restaurants')
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurants')
                }
                const data = await response.json()
                setRestaurants(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchRestaurants()
    }, [])

    const filteredRestaurants =
        selectedCuisine === 'All' ? restaurants : restaurants.filter((restaurant) => restaurant.cuisine === selectedCuisine)

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1'>
                <section className='py-12 md:py-16'>
                    <div className='container px-4 mx-auto md:px-6'>
                        <Tabs defaultValue='All' className='w-full mb-8'>
                            <TabsList className='w-full justify-start '>
                                {cuisines.map((cuisine) => (
                                    <TabsTrigger
                                        key={cuisine}
                                        value={cuisine}
                                        onClick={() => setSelectedCuisine(cuisine)}
                                        className='px-4 py-2 relative'
                                    >
                                        {cuisine}
                                        {selectedCuisine === cuisine && (
                                            <motion.div
                                                className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                                                layoutId='underline'
                                                initial={false}
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={selectedCuisine}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
                            >
                                {filteredRestaurants.map((restaurant) => (
                                    <motion.div
                                        key={restaurant.id}
                                        className='bg-white rounded-lg shadow-lg overflow-hidden'
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <img
                                            src={`http://localhost:5000/${restaurant.media}`}
                                            alt={`${restaurant.name} restaurant`}
                                            className='w-full h-48 object-cover'
                                        />
                                        <div className='p-4'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <h2 className='text-xl font-semibold'>{restaurant.name}</h2>
                                                <div className='flex items-center bg-yellow-400 text-yellow-800 px-2 py-1 rounded'>
                                                    <Star className='w-4 h-4 mr-1' />
                                                    <span>{restaurant.averageRating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <p className='text-gray-600 mb-4'>{restaurant.cuisine}</p>
                                            <p className='text-sm text-gray-500 mb-4 line-clamp-2'>{restaurant.description}</p>

                                            <div className='mt-4'>
                                                <Link
                                                    to={`/restaurants/${restaurant._id}`}
                                                    className='text-primary hover:underline font-semibold'
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>
            </main>
            <footer className='py-8 bg-black text-white'>
                <div className='container px-4 mx-auto md:px-6'>
                    <div className='flex flex-col items-center justify-between md:flex-row'>
                        <p className='mb-4 md:mb-0'>&copy; 2024 Taft Eats. All rights reserved.</p>
                        <nav className='flex gap-4'>
                            <Link to='/restaurant-register' className='hover:text-gray-400'>
                                Add Your Restaurant
                            </Link>
                            <Link id="About" to='/about' className='hover:text-gray-400'>
                                About
                            </Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
