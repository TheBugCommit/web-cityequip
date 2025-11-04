import mongoose from "mongoose"
import apiService from "./api.service.js"
import reviewService from "./review.service.js"

const mergeEquipmentsWithAvgRating = (equipments, avgRatings) => {
    const avgRatingIndex = avgRatings.reduce((acc, rating) => {
        acc[rating._id] = rating.avgRating
        return acc
    }, {})

    return equipments.map(equipment => ({
        ...equipment,
        avgRating: avgRatingIndex[equipment.uuid] || null,
    }))
}

const getAll = async () => {
    const [equipaments, avgRatings] = await Promise.all([
        apiService.get("/equipments"),
        reviewService.getAvgRatingForAllEquipments()
    ])

    const equipments = equipaments.data
    return mergeEquipmentsWithAvgRating(equipments, avgRatings)
}

const getEquipmentsByType = async (type) => {
    const [equipaments, avgRatings] = await Promise.all([
        apiService.get(`/equipments?type=${type}`),
        reviewService.getAvgRatingForAllEquipments()
    ])

    const equipments = equipaments.data
    return mergeEquipmentsWithAvgRating(equipments, avgRatings)
}

const getEquipmentById = async (uuid) => {
    const [equipament, reviews, avgRating] = await Promise.all([
        apiService.get(`/equipments/${uuid}`),
        reviewService.getReviewsByEquipment(uuid),
        reviewService.getAvgRatingForEquipment(uuid)
    ])

    const equipment = equipament.data
    equipment.reviews = reviews
    equipment.avgRating = avgRating
    
    return equipment
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
    getEquipmentsByType
}

export default equipmentService

