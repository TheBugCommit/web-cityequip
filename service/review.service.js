import Review from '../models/review.model.js'
import createError from '../utils/error.utils.js'
import handleMongooseError from '../utils/handleMongooseError.utils.js'

const createReview = async ({ userId, equipmentUuid, rating, comment = '' }) => {
    try {
        const reviewData = {
            user: userId,
            equipmentUuid: equipmentUuid,
            rating: rating,
            comment: comment
        }
        const newReview = new Review(reviewData)
        return await newReview.save()
    } catch (err) {
        throw handleMongooseError(err, 'Error creating review')
    }
}

const updateReview = async ({ reviewId, userId, equipmentUuid, rating, comment }) => {
    try {
        const updatedReview = await Review.findOneAndUpdate(
            {
                uuid: reviewId,
                equipmentUuid: equipmentUuid,
                user: userId
            },
            {
                $set: { rating, comment }
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedReview)
            throw createError(`Review { ${reviewId} } not found`, 404)

        return updatedReview
    } catch (err) {
        throw handleMongooseError(err, 'Error updating review')
    }
}

const deleteReviewsByEquipment = async (equipmentUuid, session) => {
    try {
        if (equipmentUuid == null) throw createError("No ID passed", 400)
        await Review.deleteMany({ equipmentUuid: equipmentUuid }, { session })
    } catch (err) {
        throw handleMongooseError(err, 'Error deleting many reviews')
    }
}

const getUserReviews = async (userId) => {
    try {
        const reviews = await Review.find({ user: userId })
        return reviews
    } catch (err) {
        throw handleMongooseError(err, 'Error getting user reviews')
    }
}

const getPersonalRanking = async (userId, limit = 3) => {
    try {
        const ranking = await Review
            .find({ user: userId })
            .sort({ rating: -1 })
            .limit(limit)

        return ranking
    } catch (err) {
        throw handleMongooseError(err, 'Error getting personal ranking')
    }
}

const getEquipmentRatingStats = async (equipmentUuid) => {
    try {
        const result = await Review.aggregate([
            { $match: { equipmentUuid } },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" },
                    reviewsCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    avgRating: 1,
                    reviewsCount: 1
                }
            }
        ])

        return result.length > 0 ? result[0] : { avgRating: 0, reviewsCount: 0 }
    } catch (err) {
        throw handleMongooseError(err, "Error calculating avg rating")
    }
}

const getAllEquipmentRatingStats = async () => {
    try {
        const result = await Review.aggregate([
            {
                $group: {
                    _id: "$equipmentUuid",
                    avgRating: { $avg: "$rating" },
                    reviewsCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    equipmentUuid: "$_id",
                    avgRating: 1,
                    reviewsCount: 1
                }
            }
        ])

        return result
    } catch (err) {
        throw handleMongooseError(err, "Error getting avg ratings for all equipments")
    }
}

const getReviewsByEquipment = async (equipmentUuid) => {
    try {
        return await Review.find({ "equipmentUuid": equipmentUuid }).sort({ createdAt: -1 })
    } catch (err) {
        throw handleMongooseError(err, 'Error getting reviews by equipment')
    }
}

const reviewService = {
    createReview,
    updateReview,
    getUserReviews,
    getPersonalRanking,
    getReviewsByEquipment,
    deleteReviewsByEquipment,
    getAllEquipmentRatingStats,
    getEquipmentRatingStats
}

export default reviewService
