import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = (redirectPath = '/') => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token')

            // If no token, redirect to login
            if (!token) {
                navigate(redirectPath)
                return
            }

            try {
                const response = await fetch('http://localhost:5000/api/users/checkToken', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (response.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    const data = await response.json()
                    console.log(data.message)
                }
            } catch (error) {
                console.error('Error checking token:', error)
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        // Call the token check function on component mount
        checkTokenValidity()
    }, [navigate, redirectPath])
}

export default useAuthRedirect
