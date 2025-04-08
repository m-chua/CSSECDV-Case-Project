const Review = require('../models/review');  // Assuming you have a Review model

const createReview = async (data) => {
    const review = new Review(data);
    return await review.save();
};

const getReviewById = async (id) => {
    return await Review.findById(id).populate('user').populate('restaurant');
};

const updateReview = async (id, data) => {
    const updatedData = {
        ...data,
        isEdited: new Date().toISOString()
    };

    return await Review.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteReview = async (id) => {
    return await Review.findByIdAndDelete(id);
};


const addResponseToReview = async (responseId, reviewId) => {
    const review = await Review.findById(reviewId)
    review.replies.push(responseId)
    await review.save();

    return { message: 'Response successfully associated with review' };

}

const deleteResponseFromReview = async (responseId, reviewId) => {
    const review = await Review.findById(reviewId);
    review.replies = review.replies.filter((id) => id.toString() !== responseId.toString());
    await review.save();
    return { message: 'Response successfully removed from review' };
};


module.exports = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
    addResponseToReview,
    deleteResponseFromReview
};
