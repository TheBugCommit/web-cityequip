import confirmation from './modules/confirmation.module.js'
import equipmentForm from './modules/equipmentForm.module.js'
import { FlashNotifications } from './modules/flashNotifications.module.js'
import initMap from './modules/map.module.js'
import starRating from './modules/starRating.module.js'

document.addEventListener('DOMContentLoaded', main)

function main() {
    const flashNotifications = new FlashNotifications()
    equipmentForm()
    confirmation()
    starRating()
    if (window.equipments) {
        initMap({
            mapId: 'equipment-map',
            equipments: window.equipments,
            tabId: 'map-tab'
        })
    }
}