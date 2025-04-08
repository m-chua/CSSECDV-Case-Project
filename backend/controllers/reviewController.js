const reviewService = require('../services/reviewService');
const userService = require('../services/userService')
const restaurantService = require('../services/restaurantService')

const createReview = async (req, res) => {
    try {
        const { title, rating, review } = req.body;
        const media = req.files ? req.files.map(file => `uploads/media/${file.filename}`) : []; // Handle file uploads if any
        const user = await userService.getUserById(req.user.id);
        const restaurantId = req.params.id

        const newReview = await reviewService.createReview({
            title,
            rating,
            review,
            media,
            userId: req.user.id,  // Assuming you have the user ID in req.user
            username: user.username,
            restaurantId: restaurantId
        });

        await userService.addReviewToUser(req.user.id, newReview._id)
        await restaurantService.addReviewToRes(newReview._id, restaurantId)

        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating review' });
    }
};

const updateReview = async (req, res) => {
    try {
        let { title, rating, review, existingMedia = []} = req.body;
        const newMedia = req.files ? req.files.map(file => `uploads/media/${file.filename}`) : []; 
        

        if (typeof existingMedia === 'string') {
            existingMedia = [existingMedia]; // Convert to array if it's a single string
        }

        

        const media = [...existingMedia, ...newMedia];

        const updatedReview = await reviewService.updateReview(req.params.id, {
            title,
            rating,
            review,
            media,
        });

        restaurantService.recalculateRating(updatedReview.restaurantId)
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating review' });
    }
};

const getReview = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching review' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const deletedReview = await reviewService.deleteReview(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        } else {
            await userService.deleteReviewFromUser(deletedReview.userId, req.params.id)
            await restaurantService.deleteReviewFromRes(deleteReview.userId, deletedReview.restaurantId)
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review' });
    }
};

module.exports = {
    createReview,
    updateReview,
    getReview,
    deleteReview,
};
