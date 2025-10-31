import mongoose from "mongoose"
import apiService from "./api.service.js"
import reviewService from "./review.service.js"

const getAll = async () => {
    return (await apiService.get("/equipaments")).data
}

const getEquipmentsByType = async (type) => {
    return await apiService.get(`/equipaments?${type}`)
}

const getEquipmentById = async (uuid) => {
    return await apiService.get(`/equipaments/${uuid}`)
}

const createEquipment = async (data) => {
    return await apiService.post(`/equipaments`, data)
}

const updateEquipment = async (uuid, data) => {
    return await apiService.put(`/equipaments/${uuid}`, data)
}

const deleteEquipment = async (uuid) => {
    const session = await mongoose.startSession()
    try {
        await session.withTransaction(async () => {
            await reviewService.deleteReviewsByEquipment(uuid, session)
            await apiService.delete(`/equipaments/${uuid}`)
        })
    } catch (err) {
        throw err
    } finally {
        session.endSession();
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