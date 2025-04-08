import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog'
import { Button } from '@/components/ui/shadcn/button'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { Star, XCircle } from 'lucide-react'
import { useState } from 'react'

const StarRating = ({ rating, setRating, size = 5 }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(size)].map((_, index) => (
          <Star
            name = {index+1}
            key={index}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>
    )
  }
  

const ReviewDialog = ({
  isOpen,
  onClose,
  onSave,
  review = { title: '', rating: 0, review: '', media: [] },  // Default review if adding
  dialogType = 'add',  // 'add' or 'edit'
  restaurantId
}) => {
  const [editedReview, setEditedReview] = useState(review)
  const [images, setImages] = useState(review.media || [])
  const [errorMessage, setErrorMessage] = useState('');


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
  
    if (files.length + images.length <= 4) {
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          // Store both the file and its base64 Data URL
          newImages.push({ file, url: reader.result });
  
          if (newImages.length === files.length) {
            setImages([...images, ...newImages]); // Update images state with both file and url
          }
        };
  
        reader.readAsDataURL(file); // Read the file as a Data URL for previewing
      });
    } else {
      toast({
        title: 'Image Limit Exceeded',
        description: 'You can upload a maximum of 4 images.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSubmit = async () => {

    if (!editedReview.title || !editedReview.rating || !editedReview.review) {
      setErrorMessage('Title, rating, and review are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', editedReview.title);
    formData.append('rating', editedReview.rating);
    formData.append('review', editedReview.review);

  
    
    images.forEach((image) => {
      if (image.file) {
        formData.append('media', image.file);  // Always append files individually to 'media'
      } else {
        formData.append('existingMedia', image);  // Always append URLs individually to 'existingMedia'
      }
    });
  
    // Log the form data (optional)
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await fetch(
        dialogType === 'edit'
          ? `http://localhost:5000/api/reviews/${review._id}`
          : `http://localhost:5000/api/reviews/${restaurantId}`,
        {
          method: dialogType === 'edit' ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Something went wrong');
        return;
      }
  
      window.location.reload() // Uncomment if you want to reload after successful submission
  
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
  };

  
  const removeImage = (index) => {
    console.log(images)
    setImages(images.filter((_, idx) => idx !== index))
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogType === 'edit' ? 'Edit Review' : 'Add Review'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedReview.title}
              onChange={(e) => setEditedReview({ ...editedReview, title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rating">Rating</Label>
            <StarRating
              rating={editedReview.rating}
              setRating={(rating) => setEditedReview({ ...editedReview, rating })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Review</Label>
            <Textarea
              id="content"
              value={editedReview.review}
              onChange={(e) => setEditedReview({ ...editedReview, review: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => document.getElementById('image-upload').click()}
            >
              <span>Upload Images (Max 4)</span>
            </Button>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={typeof(img) === "string" ? `http://localhost:5000/${img}` :  `${img.url}` }
                    info-try={typeof(img)}
                    alt={`uploaded ${idx + 1}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                     <XCircle
                        onClick={() => removeImage(idx)}
                        className="w-5 h-5 absolute top-1 right-1 text-red-600 cursor-pointer"
                      />
                </div>
              ))}
            </div>
          </div>
          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        </div>
        <DialogFooter>
          <Button name="submit" onClick={handleSubmit}>
            {dialogType === 'add' ? 'Add Review' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog
