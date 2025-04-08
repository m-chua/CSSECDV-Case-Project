import React from 'react'
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/shadcn/table'
import SortDropdown from './SortDropdown'
import RestaurantRow from './RestaurantRow'

const RestaurantTable = ({ restaurants, sortCriteria, sortOrder, setSortCriteria, setSortOrder }) => {
    return (
        <Table className='bg-white shadow-md rounded-lg overflow-hidden'>
            <TableHeader>
                <TableRow className='bg-gray-100 text-gray-700'>
                    <TableHead>Name</TableHead>
                    <TableHead>Cuisine</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Avg Price/Person</TableHead>
                    <TableHead>
                        <SortDropdown
                            sortCriteria={sortCriteria}
                            setSortCriteria={setSortCriteria}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                        />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {restaurants.map((restaurant) => (
                    <RestaurantRow key={restaurant._id} restaurant={restaurant} />
                ))}
            </TableBody>
        </Table>
    )
}

export default RestaurantTable
