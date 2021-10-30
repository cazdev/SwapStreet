//          AUTHORS - JOSHUA DODANDUWA
//          Macquarie University Student\
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, CircleMarker } from 'react-leaflet'
import { Link } from "react-router-dom";
import { RangeStepInput } from 'react-range-step-input';

import '../../../node_modules/leaflet/dist/leaflet.css'
import './react-leaflet-geosearch.css'

import SearchControl from './searchControl'
import OpenStreetMapProvider from './openStreetMapProvider'



const MapComp = (props) => {

    const [jobList, setJobList] = useState([])
    const [sliderVal, setSliderVal] = useState(5)
    const [srch, setSrch] = useState({})

    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = SearchControl;

    useEffect(() => {
        if (props.jobList) {
            setJobList(props.jobList)
            console.log(props.jobList)
        }
    }, [props.jobList])

    function SetViewOnClick({ coords }) {
        const map = useMap();
        if (coords.length > 0) {
            map.setView(coords, map.getZoom());
        } else if (Object.entries(srch).length > 0) {
            map.setView([srch.y, srch.x], map.getZoom());
        } else {
            map.setView([-33.77432, 151.11271], 10);
        }
        return null;
    }

    const fillBlueOptions = { fillColor: 'blue' }

    return (
        <>
            {Object.entries(srch).length > 0 && (
                <div className="srch-range">
            <div className="row mb-3">
                <div className="col-md-12 ">
                    Search Radius
                </div>
                <div className="col-md-12">
                    <RangeStepInput className=" " min={0} max={500} value={sliderVal} step={1} onChange={(e) => setSliderVal(e.target.value)} />
                    <input className="form-control flt-lf mr-2  " type="text" value={sliderVal} onChange={(e) => setSliderVal(e.target.value)} /> km
                </div>
            </div>
            </div>)}
            <div className="row mb-3">
                <div className=" col-md-12 ">
                    <MapContainer
                        center={jobList.length > 0 ? [jobList[0].location.y, jobList[0].location.x] : [-33.77432, 151.11271]}
                        zoom={15}
                    >
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        {Object.entries(srch).length > 0 && <Circle center={[srch.y, srch.x]} pathOptions={fillBlueOptions} radius={sliderVal * 1000} />}


                        <GeoSearchControlElement
                            provider={prov}
                            showMarker={true}
                            showPopup={true}
                            popupFormat={({ query, result }) => { console.log(result); setSrch(result); return result.label }}
                            maxMarkers={1}
                            retainZoomLevel={false}
                            animateZoom={true}
                            keepResult={true}
                            searchLabel={"search favours in your area"}
                        />
                        {jobList.map((item, index) => {
                            if (jobList.length === 1) {
                                return item.location.x !== 100000 && (<Marker position={[item.location.y, item.location.x]}>
                                    <Popup>
                                        <Link to={`/job/${item._id}`}> <h3>{item.title}</h3>

                                            <span className="txt-default txt-dblue my-2"><h4>Price: {item.price} coins</h4></span>

                                            <span className="txt-default">{item.description}</span>
                                        </Link>
                                    </Popup>
                                </Marker>)
                            }
                            else {
                                return item.location.x !== 100000 && item.status === 0 && (<Marker position={[item.location.y, item.location.x]}>
                                    <Popup>
                                        <Link to={`/job/${item._id}`}> <h3>{item.title}</h3>

                                            <span className="txt-default txt-dblue my-2"><h4>Price: {item.price} coins</h4></span>

                                            <span className="txt-default">{item.description}</span>
                                        </Link>
                                    </Popup>
                                </Marker>)
                            }
                        })}
                        <SetViewOnClick coords={jobList.length === 1 && jobList[0].location.x !== 100000 ? [jobList[0].location.y, jobList[0].location.x] : []} />
                    </MapContainer>

                </div></div>

        </>
    )
}
export default MapComp;