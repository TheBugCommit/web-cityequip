import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
})

export default function initMap(mapId = 'equipment-map', equipments = [], defaultLat = 41.12, defaultLng = 1.25, defaultZoom = 13) {
    const mapContainer = document.getElementById(mapId)
    if (!mapContainer) return

    if (!mapContainer._leaflet_id) {
        const map = L.map(mapId).setView([defaultLat, defaultLng], defaultZoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy OpenStreetMap contributors'
        }).addTo(map)

        equipments.forEach(eq => {
            if (eq.latitud && eq.longitud) {
                L.marker([eq.latitud, eq.longitud])
                    .addTo(map)
                    .bindPopup(`<b>${eq.nom}</b><br>${eq.localitzacio || ''}`)
            }
        })

        const mapTab = document.querySelector('#map-tab')
        if (mapTab) {
            mapTab.addEventListener('shown.bs.tab', () => {
                map.invalidateSize()
            })
        }
    }
}