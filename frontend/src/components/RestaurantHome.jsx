import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantHeader from "@/components/ui/RestaurantPage/RestaurantHeader";
import ReviewSection from "@/components/ui/RestaurantPage/ReviewSection";
import AmenitiesSection from "@/components/ui/RestaurantPage/Amenities";
import { Separator } from "@/components/ui/shadcn/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/shadcn/tabs";
import { motion } from "framer-motion";

import { MapPin, Phone, Globe, Clock } from "lucide-react";
import Header from "@/components/header";
import Review from "./ui/ReviewCard";
import EditRestaurantForm from "@/components/ui/EditRestaurantForm";

const RestaurantHome = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("view");
  const [isEditReviewDialogOpen, setIsEditReviewDialogOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRestaurant(data);
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const handleReplyToReview = (id, replyContent) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, reply: replyContent } : review
      )
    );
  };

  useEffect(() => {
    fetchRestaurant();
    setIsAuthenticated(localStorage.getItem("token") ? true : false);
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mb-6">
            <TabsList className='w-full justify-start '>
              <TabsTrigger value="view" className='px-4 py-2 relative'>View Restaurant</TabsTrigger>
              <TabsTrigger name="editResto" value="edit" className='px-4 py-2 relative'>Edit Restaurant</TabsTrigger>
            </TabsList>

            <TabsContent value="view">
              {restaurant && (
                
                <>
                  <RestaurantHeader restaurant={restaurant} reviewCount={restaurant.reviews.length} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <ReviewSection
                        rating={restaurant.averageRating}
                        reviewCount={restaurant.reviews.length}
                        reviews={reviews}
                        />
                      <Separator className="my-8" />
                      <AmenitiesSection amenities={restaurant.amenities} />
                      <Separator className="my-8" />
                      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                      {reviews.map((review) => (
                        <Review
                          key={review.id}
                          review={review}
                          onReply={(replyContent) =>
                            handleReplyToReview(review.id, replyContent)
                          }
                        />
                      ))}
                    </div>
                    <div>
                      <div className="border p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">
                          Restaurant Info
                        </h2>
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
                            <a
                              name="restoWebsite"
                              href={restaurant.website}
                              className="text-blue-600 hover:underline"
                            >
                              {restaurant.website}
                            </a>
                          </div>
                          <div className="flex items-start">
                            <Clock className="w-5 h-5 mr-2 mt-1 text-gray-600" />
                            <p>{restaurant.hours}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent name="editResto" value="edit">
              <p className="text-center text-lg">Edit Restaurant Placeholder</p>
              <EditRestaurantForm restaurant={restaurant}></EditRestaurantForm>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RestaurantHome;
