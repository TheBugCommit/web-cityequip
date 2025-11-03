import equipmentForm from './modules/equipment_form.js';
import { FlashNotifications } from './modules/flash_notifications.js';

document.addEventListener('DOMContentLoaded', main)

function main() {
    const flashNotifications = new FlashNotifications()
    equipmentForm()
}