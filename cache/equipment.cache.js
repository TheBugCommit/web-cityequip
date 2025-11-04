import equipmentService from '../service/equipment.service.js'

class EquipmentCache {
  constructor() {
    this.unicTypes = new Set()
    this.originalMap = new Map()
    this.loaded = false
    this.lastSync = null
  }

  normalize(tipus) {
    return tipus?.trim().toLowerCase()
  }

  async init() {
    if (this.loaded) return;
    await this.sync();
    this.loaded = true;
  }



  async sync() {
    const allEquipments = await equipmentService.getAll();
    this.unicTypes.clear();
    this.originalMap.clear();

    allEquipments
      .map(e => e.tipus)
      .filter(Boolean)
      .forEach(t => this.addType(t));

    this.lastSync = new Date();
    console.log(`[EquipmentCache] Synced ${this.unicTypes.size} tipus at ${this.lastSync.toLocaleTimeString()}`);
  }

  scheduleAutoSync(intervalMs = 5 * 60 * 1000) {
    setInterval(() => {
      this.sync().catch(err => console.error('Error auto-syncing cache:', err));
    }, intervalMs);
  }

  getAllTypes() {
    return Array.from(this.originalMap.values()).sort((a, b) => a.localeCompare(b))
  }

  addType(tipus) {
    if (!tipus) return

    const normalized = this.normalize(tipus)

    if (!this.unicTypes.has(normalized)) {
      this.unicTypes.add(normalized)
      this.originalMap.set(normalized, tipus.trim())
    }
  }

  hasType(tipus) {
    return this.unicTypes.has(this.normalize(tipus))
  }

  clear() {
    this.unicTypes.clear()
    this.originalMap.clear()
    this.loaded = false
  }
}

const equipmentCache = new EquipmentCache()
export default equipmentCache
