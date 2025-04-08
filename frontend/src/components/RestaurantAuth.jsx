import RestaurantHome from '@/components/RestaurantHome';
import Restaurant from '@/components/Restaurant';

const RestaurantAuth = () => {
    const isRestoLogged = localStorage.getItem('restaurantId');

    return isRestoLogged ? <RestaurantHome /> : <Restaurant />;
};

export default RestaurantAuth;
