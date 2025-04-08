import React from 'react'
import { Button } from './shadcn/button'

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className='flex justify-between items-center mt-4'>
            <Button
                variant='outline'
                size='sm'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
                Previous
            </Button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant='outline'
                size='sm'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
                Next
            </Button>
        </div>
    )
}

export default PaginationControls
