import React from 'react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from '@/components/ui/shadcn/dropdown-menu'
import SortIcon from './icons/sorticon'

const SortDropdown = ({ sortCriteria, setSortCriteria, sortOrder, setSortOrder }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className='cursor-pointer flex items-center text-center'>
                    <SortIcon className='w-2 h-2' />
                </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='bg-white p-3'>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-[#f2f2f2]' />
                <DropdownMenuRadioGroup value={sortCriteria} onValueChange={setSortCriteria}>
                    <DropdownMenuRadioItem value='rating' className='cursor-pointer'>
                        Rating
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='price' className='cursor-pointer'>
                        Avg Price
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator className='bg-[#f2f2f2]' />
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                    <DropdownMenuRadioItem value='asc' className='cursor-pointer'>
                        Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='desc' className='cursor-pointer'>
                        High to Low
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortDropdown
