import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const restaurantId = localStorage.getItem('restaurantId');

    if (restaurantId) {
        return <Navigate to={`/restaurants/${restaurantId}`} replace />;
    }

    return children; 
};

export default PrivateRoute;
