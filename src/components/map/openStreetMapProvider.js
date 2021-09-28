import { OpenStreetMapProvider as LeafletOpenStreetMapProvider } from 'leaflet-geosearch'

const OpenStreetMapProvider = () => new LeafletOpenStreetMapProvider({
    params: {
      countrycodes: 'au', // limit search results to the Netherlands
      addressdetails: 1, // include additional address detail parts
    },
  })

export default OpenStreetMapProvider