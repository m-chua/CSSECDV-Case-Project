import RestaurantHeader from '@/components/ui/RestaurantPage/RestaurantHeader';
import ReviewSection from '@/components/ui/RestaurantPage/ReviewSection';
import AmenitiesSection from '@/components/ui/RestaurantPage/Amenities';
import { Separator } from "@/components/ui/shadcn/separator";
import { Button } from "@/components/ui/shadcn/button";
import { MapPin, Phone, Globe, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from "@/components/header";
import Review from './ui/ReviewCard'
import ReviewDialog from './ui/ReviewDialog';
import { Input } from '@/components/ui/shadcn/input'


const Restaurant = () => {
  const { id } = useParams();  

  const [isEditReviewDialogOpen, setIsEditReviewDialogOpen] = useState(false);
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState([]);
  const [restaurant, setRestaurant] = useState(null);  // State for a single restaurant
  const [reviews, setReviews] = useState(null);  // State for a single restaurant
  const [filteredReviews, setFilteredReviews] = useState(null);  // State for filtered reviews
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState(''); // State for search query

  const SearchIcon = (props) => (
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
    >
        <circle cx='11' cy='11' r='8' />
        <path d='m21 21-4.3-4.3' />
    </svg>
)

  const handleEditReview = (id, newContent) => {
    setReviews(
        reviews.map((review) => (review.id === id ? { ...review, content: newContent, editedAt: new Date().toISOString() } : review))
    );
    setIsEditReviewDialogOpen(false);
  };

  const handleDeleteReview = (id) => {
      setReviews(reviews.filter((review) => review.id !== id));
      setIsDeleteReviewDialogOpen(false);
  };

  const fetchRestaurant = async () => {
    try {
      console.log('Fetching restaurant...');
      const response = await fetch(`http://localhost:5000/api/restaurants/${id}`);
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received data:', data);
        setRestaurant(data);
        setReviews(data.reviews);
        setFilteredReviews(data.reviews); // Initialize filtered reviews with all reviews
      } else {
        console.error('Failed to fetch restaurant:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    } 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterReview();
  };

  const filterReview = () => {
    const lowerQuery = query.toLowerCase();
    const filtered = reviews.filter((review) =>
      review.review.toLowerCase().includes(lowerQuery)
    );
    setFilteredReviews(filtered)
    
  }

  useEffect(() => {
    if (!restaurant) {
      fetchRestaurant();
      setIsAuthenticated(localStorage.getItem('token') ? true : false);
    }
  }, []); 

  useEffect(() => {
    if (query === "") {
      setFilteredReviews(reviews); // Reset to all reviews when query is cleared
    } else {
      filterReview()
    }
  }, [query, reviews]);

  useEffect(() => {
    if (restaurant) {
      console.log('Updated restaurant reviews:', reviews);
      console.log('Updated restaurant reviews:', reviews.length);
    }
  }, [reviews]); // This effect will run whenever the `restaurant` state is updated
  
  console.log('Current restaurant state:', restaurant);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        {restaurant ? (
          <>
            <RestaurantHeader restaurant={restaurant} reviewCount={restaurant.reviews.length} />
            <div className="max-w-5xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Recommended Reviews</h2>
                   
                    {/* Conditionally render the "Write a Review" button based on auth status */}
                    <Button name="writeReviewButton" onClick={() => setIsEditReviewDialogOpen(true)} disabled={!isAuthenticated}>Write a Review</Button>
                  </div>
                  <ReviewSection
                    rating={restaurant.averageRating}
                    reviewCount={restaurant.reviews.length}
                    reviews={reviews} 
                  />
                  <Separator className="my-8" />
                  <AmenitiesSection amenities={restaurant.amenities} />
                  <Separator className="my-8" />
                   
                  <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
                  {/* Search bar */}
                  <form onSubmit={handleSearchSubmit} className='relative flex-1 max-w-full mb-5'>
                      <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                      <Input
                        id = "revsearch"
                        name='search'
                        type='search'
                        placeholder='Search for reviews...'
                        className='w-full pl-10 pr-4 rounded-md bg-white focus:outline-none'
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </form>

                  {
                    filteredReviews && filteredReviews.length > 0 ? (
                      filteredReviews.map((review) => (
                        <Review
                            key={review._id} // Make sure to include a unique key for each review
                            isEditReviewDialogOpen={isEditReviewDialogOpen}
                            setIsEditReviewDialogOpen={setIsEditReviewDialogOpen}
                            isDeleteReviewDialogOpen={isDeleteReviewDialogOpen}
                            setIsDeleteReviewDialogOpen={setIsDeleteReviewDialogOpen}
                            currentReview={currentReview}
                            setCurrentReview={setCurrentReview}
                            handleEditReview={handleEditReview}
                            handleDeleteReview={handleDeleteReview}
                            review={review}
                        />
                      ))
                    ) : (
                      <p>No reviews match your search.</p>
                    )
                  }
                </div>

                <div>
                  <div className="border p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Restaurant Info</h2>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-2 mt-1 text-gray-600" />
                        <p>{restaurant.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-gray-600" />
                        <p>{restaurant.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-gray-600" />
                        <a name="restoWebsite" href={restaurant.website} className="text-blue-600 hover:underline">{restaurant.website}</a>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 mr-2 mt-1 text-gray-600" />
                        <p>{restaurant.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Render placeholders or empty elements while waiting for the data
          <>
            <RestaurantHeader restaurant={{}} />
            <div className="max-w-5xl mx-auto px-4 py-8">
              <p>Loading content...</p>
            </div>
          </>
        )}
      </main>

      {/* Add the ReviewDialog component */}
      <ReviewDialog
        isOpen={isEditReviewDialogOpen}
        onClose={() => setIsEditReviewDialogOpen(false)}
        onSave={(newReview) => {
          setReviews([...reviews, newReview]);  
          setIsEditReviewDialogOpen(false);  
        }}
        dialogType="add"
        restaurantId={id}  
      />
    </div>
  );
};

export default Restaurant;
