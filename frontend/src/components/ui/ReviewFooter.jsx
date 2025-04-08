import { Card, CardContent } from '@/components/ui/shadcn/card'
import { Button } from '@/components/ui/shadcn/button'
import { MessageCircle, Pencil, Trash2, Reply } from 'lucide-react'
import { useState } from 'react'
import ReviewDialog from './ReviewDialog'  // Import the new custom dialog component
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog'

const ReviewFooter = ({
  review,  // This can be null or an existing review
  onEdit,
  onAdd,
  onDelete,
  isLoggedIn,
  userId,
  isReviewOwner,
  restaurantId
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState(null)  // 'edit', 'add', or 'delete'
  const [replyText, setReplyText] = useState('')  // State to hold the reply text

  const openDialog = (type) => {
    setDialogType(type)
    setIsDialogOpen(true)
  }

  const handleReply = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/responses/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'

          },
          body: JSON.stringify({
            replyText: replyText,
            reviewId: review._id
          })


      })

      window.location.reload();
   } catch (error) {
      console.error('Error deleting review', error);
      alert('Error deleting review');
    } finally {
      setReplyText('');  
      setIsDialogOpen(false); 
    }
    
  };

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${review._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Ensure the token is passed
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete review');
        return;
      }
      window.location.reload();  // Reload after successful delete
  
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span>{review?.replies.length || 0} replies</span>
          </div>

          <div className="flex space-x-2">

          {isLoggedIn && isReviewOwner && (
              <>
              <Button
                name = "editReviewButton"
                variant="outline"
                size="sm"
                onClick={() => openDialog('edit')}
                className='border-green-500 text-green-700 hover:bg-green-500'

              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Review
              </Button>
              <Button
                name = "deleteReviewButton"
                variant="outline"
                size="sm"
                onClick={() => openDialog('delete')}
                className='border-red-500 text-red-700 hover:bg-red-500'
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Review
              </Button>
          </>)}

          {isLoggedIn && (
              <>
              {/* Reply Button */}
              <Button
              name = "replyToReview"
                variant="outline"
                size="sm"
                onClick={() => openDialog('reply')}
                className='border-blue-400 text-blue-400 hover:bg-blue-400 hover:border-blue-400'
              >
                <Reply className="w-4 h-4" />
                Reply
              </Button>
              </>

          )}
          </div>

        
        </div>
      </CardContent>

      {/* Use the custom ReviewDialog component */}
      <ReviewDialog
        isOpen={isDialogOpen && dialogType === "edit"}
        onClose={() => setIsDialogOpen(false)}
        onSave={dialogType === 'edit' ? onEdit : onAdd}
        review={review}
        dialogType={dialogType}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen && dialogType === "delete"} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this review? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button name="confirmDelete" variant='destructive' onClick={handleDeleteReview}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isDialogOpen && dialogType === "reply"} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          <textarea
            name = "replyContent"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Write your reply..."
            rows="4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button name="submitReply" variant="outline" onClick={handleReply}>
              Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ReviewFooter
