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
        return await Review.find({ user: userId }).sort('-updatedAt')
    } catch (err) {
        throw handleMongooseError(err, 'Error getting user reviews')
    }
}

const getGlobalRanking = async (limit = 3) => {
    try {
        return await Review.aggregate([
            {
                $group: {
                    _id: '$equipmentUuid',
                    avgRating: { $avg: '$rating' },
                    reviewsCount: { $sum: 1 }
                }
            },
            { $sort: { avgRating: -1 } },
            { $limit: limit }
        ])
    } catch (err) {
        throw handleMongooseError(err, 'Error getting global ranking')
    }
}

const getPersonalRanking = async (userId, limit = 3) => {
    try {
        return await Review.find({ user: userId })
            .sort({ rating: -1, updatedAt: -1 })
            .limit(limit)
    } catch (err) {
        throw handleMongooseError(err, 'Error getting personal ranking')
    }
}

const getAvgRatingForEquipment = async (equipmentUuid) => {
    try {
        const result = await Review.aggregate([
            { $match: { equipmentUuid: equipmentUuid } },
            {
                $group: {
                    _id: "$equipmentUuid",
                    avgRating: { $avg: "$rating" }
                }
            }
        ])

        const avgRating = result.length > 0 ? result[0].avgRating : 0
        return avgRating
    } catch (err) {
        throw handleMongooseError(err, 'Error calculating avg rating')
    }
}


const getAvgRatingForAllEquipments = async () => {
    try {
        const result = await Review.aggregate([
            {
                $group: {
                    _id: "$equipmentUuid",
                    avgRating: { $avg: "$rating" }
                }
            }
        ])

        return result
    } catch (err) {
        throw handleMongooseError(err, 'Error getting avg ratings for all equipments')
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
    getGlobalRanking,
    getPersonalRanking,
    getReviewsByEquipment,
    deleteReviewsByEquipment,
    getAvgRatingForAllEquipments,
    getAvgRatingForEquipment
}

export default reviewService
