import React from 'react'

const ProfileIcon = (props) => {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-label='Profile Icon'
        >
            <path d='M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12z' />
            <path d='M12 12c4.5 0 9 2 9 6v1H3v-1c0-4 4.5-6 9-6z' />
        </svg>
    )
}

export default ProfileIcon
