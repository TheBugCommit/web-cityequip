import Review from '../models/review.model.js'

const updateReview = async ({ userId, equipmentUuid, rating, comment }) => {
    return Review.findOneAndUpdate(
        { user: userId, equipmentUuid },
        { rating, comment },
        { upsert: true, new: true }
    )
}

const getUserReviews = async (userId) => {
    return Review.find({ user: userId })
        .select('equipmentUuid rating comment updatedAt')
        .sort('-updatedAt')
}

const getGlobalRanking = async (limit = 3) => {
    return Review.aggregate([
        {
            $group: {
                _id: '$equipmentUuid',
                avgRating: { $avg: '$rating' },
                reviewsCount: { $sum: 1 }
            }
        },
        { $sort: { avgRating: -1, reviewsCount: -1 } },
        { $limit: limit }
    ])
}

const getPersonalRanking = async (userId, limit = 3) => {
    return Review.find({ user: userId })
        .select('equipmentUuid rating comment updatedAt')
        .sort({ rating: -1, updatedAt: -1 })
        .limit(limit)
}

const getReviewsByEquipment = async (equipmentUuid) => {
    return Review.find({ equipmentUuid })
        .populate('user', 'name email') 
        .select('rating comment createdAt updatedAt')
        .sort({ createdAt: -1 })
}

const reviewService = {
    updateReview,
    getUserReviews,
    getGlobalRanking,
    getPersonalRanking,
    getReviewsByEquipment,
}

export default reviewService
