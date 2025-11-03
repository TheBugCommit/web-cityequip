import equipmentService from "../service/equipment.service.js"

const ensureUnicTypes = async (req, res, next) => {
  try {
    const allEquipments = await equipmentService.getAll()
    const unicTypes = [...new Set(
      allEquipments
        .map(eq => eq.tipus)
        .filter(Boolean)
    )].sort()

    req.session.unicTypes = unicTypes

    next()
  } catch (error) {
    next(error)
  }
}

export default ensureUnicTypes