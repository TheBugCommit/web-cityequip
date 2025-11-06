import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const initMap = ({
    mapId,
    equipments = [],
    defaultLat = 41.117,
    defaultLng = 1.244,
    defaultZoom = 13,
    tabId = null
}) => {
    let map

    const setupMap = () => {
        if (map) return
        map = L.map(mapId)

        const markers = equipments
            .filter(eq => eq.latitud && eq.longitud)
            .map(eq => L.marker([eq.latitud, eq.longitud])
                .bindPopup(`<b>${eq.nom}</b><br>${eq.localitzacio || ''}`))

        markers.forEach(marker => marker.addTo(map))

        if (markers.length === 0) {
            map.setView([defaultLat, defaultLng], defaultZoom)
        } else if (markers.length === 1) {
            map.setView(markers[0].getLatLng(), 13)
        } else {
            const group = L.featureGroup(markers)
            map.fitBounds(group.getBounds().pad(0.1), { maxZoom: 14 })
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map)
    }

    const tabEl = document.getElementById(tabId || '')
    if (tabEl) {
        tabEl.addEventListener('shown.bs.tab', () => {
            setupMap()
            map.invalidateSize()
        })
    } else {
        setupMap()
    }

    return map
}

export default initMap