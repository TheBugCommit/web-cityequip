import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
import apiService from "./api.service.js"
import reviewService from "./review.service.js"

const getAll = async () => {
    return (await apiService.get("/equipments")).data
}

const getEquipmentsByType = async (type) => {
    return await apiService.get(`/equipments?${type}`)
}

const getEquipmentById = async (uuid) => {
    return await apiService.get(`/equipments/${uuid}`)
}

const createEquipment = async (data) => {
    if (!data.uuid) data.uuid = uuidv4()
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

