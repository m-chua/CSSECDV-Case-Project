import React, { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import AvatarUploader from "@/components/ui/avataruploader";
import CuisineSelector from "@/components/ui/CuisineSelector";
import AmenitiesSelector from "./AmenitiesSelector";

const EditRestaurantForm = ({ restaurant }) => {
  const [formData, setFormData] = useState({
    name: restaurant?.name || "",
    address: restaurant?.address || "",
    phone: restaurant?.phone || "",
    website: restaurant?.website || "",
    hours: restaurant?.hours || "",
    averageCost: restaurant?.averageCost || "",
    cuisine: restaurant?.cuisine || "",
    amenities: restaurant?.amenities || [],
    username: restaurant?.name || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

        try {
            const processedFormData = { ...formData };

            Object.keys(processedFormData).forEach((key) => {
              if (Array.isArray(processedFormData[key])) {
                  processedFormData[key] = JSON.stringify(processedFormData[key]);
                }
            });


            const jsonString = JSON.stringify(processedFormData);
          
            const response = await fetch(`http://localhost:5000/api/restaurants/${restaurant._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonString, // Send JSON stringified data
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Server Response:", data);
            window.location.reload()

            setFormData(initialFormData);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
      
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Hours</label>
        <input
          type="text"
          name="hours"
          value={formData.hours}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Average Cost</label>
        <input
          type="number"
          name="averageCost"
          value={formData.averageCost}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <CuisineSelector
          id="cuisine"
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div>
        <AmenitiesSelector
          id="amenities"
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      
      <Button name="submit" type="submit">Save Changes</Button>
    </form>
  );
};

export default EditRestaurantForm;
