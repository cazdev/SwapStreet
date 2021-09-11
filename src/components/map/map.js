import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import '../../../node_modules/leaflet/dist/leaflet.css'
import './react-leaflet-geosearch.css'

import SearchControl from './searchControl'
import OpenStreetMapProvider from './openStreetMapProvider'



const MapComp = () => {

    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = SearchControl;

    return (
        <MapContainer
            center={[-33.77432, 151.11271]}
            zoom={14}
            zoomControl={true}
        >
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <GeoSearchControlElement
                provider={prov}
                showMarker={true}
                showPopup={true}
                popupFormat={({ query, result }) => result.label}
                maxMarkers={3}
                retainZoomLevel={false}
                animateZoom={true}
                autoClose={false}
                searchLabel={"Enter address, please"}
                keepResult={true}
            />
            <Marker position={[-33.77432, 151.11271]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
export default MapComp;