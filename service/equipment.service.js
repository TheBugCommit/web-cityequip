import mongoose from "mongoose"
import apiService from "./api.service.js"
import reviewService from "./review.service.js"

const addEquipmentsRatingStats = (equipments, ratingStats) => {
    const ratingStatsIndex = ratingStats.reduce((acc, ratingStat) => {
        acc[ratingStat.equipmentUuid] = ratingStat
        return acc
    }, {})

    return equipments.map(equipment => ({
        ...equipment,
        ...ratingStatsIndex[equipment.uuid]
    }))
}

const equipmentsFilter = (equipments, reviews) => {
    const reviewsIndex = reviews.reduce((acc, item) => {
        delete item.uuid
        acc[item.equipmentUuid] = item
        return acc
    }, {})

    return equipments
        .filter(eq => reviewsIndex[eq.uuid])
}

const getAll = async () => {
    const [equipaments, ratingStats] = await Promise.all([
        apiService.get("/equipments"),
        reviewService.getAllEquipmentRatingStats()
    ])

    const equipments = equipaments.data
    return addEquipmentsRatingStats(equipments, ratingStats)
}

const getEquipmentsByType = async (type) => {
    const [equipaments, ratingStats] = await Promise.all([
        apiService.get(`/equipments?type=${type}`),
        reviewService.getAllEquipmentRatingStats()
    ])

    const equipments = equipaments.data
    return addEquipmentsRatingStats(equipments, ratingStats)
}

const getEquipmentById = async (uuid) => {
    const [equipament, reviews, ratingStats] = await Promise.all([
        apiService.get(`/equipments/${uuid}`),
        reviewService.getReviewsByEquipment(uuid),
        reviewService.getEquipmentRatingStats(uuid)
    ])

    const equipment = equipament.data
    equipment.reviews = reviews
    equipment.avgRating = ratingStats.avgRating
    equipment.reviewsCount = ratingStats.reviewsCount

    return equipment
}

const getGlobalBestEquipments = async (limit) => {
    const equipments = await getAll()
    const equipmentsWithAvgRating = equipments.filter(e => e.avgRating !== undefined)
    const topEquipments = equipmentsWithAvgRating
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, limit)

    return topEquipments
}

const getGlobalBestEquipmentsByUser = async (userId, limit) => {
    const [equipments, bestReviewedEquipments] = await Promise.all([
        getAll(),
        reviewService.getPersonalRanking(userId, limit)
    ])

    const equipamentsUuids = bestReviewedEquipments.map(item => item.equipmentUuid)
    const topEquipments = equipmentsFilter(equipments, bestReviewedEquipments)
    
    const positionMap = equipamentsUuids.reduce((acc, uuid, idx) => {
        acc[uuid] = idx
        return acc
    }, {})
    topEquipments.sort((a, b) => {
        return positionMap[a.uuid] - positionMap[b.uuid]
    })

    return topEquipments
}

const getEquipmentsReviewedByUser = async (userId) => {
    const [equipments, reviewedEquipments] = await Promise.all([
        getAll(),
        reviewService.getUserReviews(userId),
    ])

    return equipmentsFilter(equipments, reviewedEquipments)
}

const createEquipment = async (data) => {
    return await apiService.post(`/equipments`, data)
}

const updateEquipment = async (uuid, data) => {
    return await apiService.put(`/equipments/${uuid}`, data)
}

const deleteEquipment = async (uuid) => {
    const session = await mongoose.startSession()
    try {
        await session.withTransaction(async () => {
            await reviewService.deleteReviewsByEquipment(uuid, session)
            await apiService.delete(`/equipments/${uuid}`)
        })
    } catch (err) {
        throw err
    } finally {
        session.endSession()
    }
}

const equipmentService = {
    getAll,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getEquipmentsByType,
    getGlobalBestEquipments,
    getGlobalBestEquipmentsByUser,
    getEquipmentsReviewedByUser
}

export default equipmentService

