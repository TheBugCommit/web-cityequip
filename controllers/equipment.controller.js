const home = (req, res) => { 
    res.render('index')
}

const createEquipment = (req, res) => {
    res.json({ content: 'Create Equipment' })
}

const updateEquipment = (req, res) => {
    res.json({ content: 'Update Equipment' })
}

const deleteEquipment = (req, res) => {
    res.json({ content: 'Delete Equipment' })
}

const equipmentCreateForm = (req, res) => {
    res.json({ content: 'Render equipment create form' })
}

const equipmentUpdateForm = (req, res) => {
    res.json({ content: 'Render equipment update form' })
}

const equipmentsByType = (req, res) => {
    res.json({content: 'Filter equipment by type'})
} 

const showEquipment = (req, res) => {
    res.json({content: 'Render Detailed equipment uuid'})
} 

const showEquipmentsMap = (req, res) => {
    res.json({content: 'Render global map view'})
} 

const showGlobalRanking = (req, res) => {
    res.json({content: 'Global equipments puntuation ranking'})
}

const createReview = (req, res) => {
    res.json({content: 'Create review'})
}

const updateReview = (req, res) => {
    res.json({content: 'Update review'})
}

const equipmentController = {
    home,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    equipmentCreateForm,
    equipmentUpdateForm,
    equipmentsByType,
    showEquipment,
    showEquipmentsMap,
    showGlobalRanking,
    createReview,
    updateReview
}

export default equipmentController
