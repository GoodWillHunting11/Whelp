import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GoogleMap } from 'react-google-maps'
import { withScriptjs } from 'react-google-maps'
import { withGoogleMap } from 'react-google-maps'
import { Marker } from 'react-google-maps'
import { InfoWindow } from 'react-google-maps'

const WrappedMap = withScriptjs(withGoogleMap(Map))
function Map() {
    const { id } = useParams()
    const businesses = useSelector(state => state.businessState.entries)
    const singleMap = businesses.find(single => single.id === +id)
    console.log('Single Map', singleMap?.map[0])

    const [selectedBusiness, setSelectedBusiness] = useState(null)

    return (
            <GoogleMap
            defaultZoom={9}
            defaultCenter={{lat:singleMap?.map[0]?.lat, lng:singleMap?.map[0]?.long}}
            >
               <Marker position={{lat:singleMap?.map[0]?.lat, lng:singleMap?.map[0]?.long}}
                onClick={() => {
                    setSelectedBusiness(singleMap)
                }}
               />
               {selectedBusiness && (
                   <InfoWindow                   // info window used to pop up info for a selected business
                   position={{lat:singleMap?.map[0]?.lat, lng:singleMap?.map[0]?.long}} //position lat & lng = current selected business
                   onCloseClick = {() => {
                       setSelectedBusiness(null);
                   }}>
                   <div>
                       <h2>{`${singleMap?.name}`}</h2>
                       <p>{`${singleMap?.phone}`}</p>
                   </div></InfoWindow>
               )}
            </GoogleMap>
    )
}

const BusinessMap = () => {
    return(
        <div style={{ width: '40vw', height: '50vh' }}>
            <WrappedMap googleMapURL ={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBFE2JjLif0k10_tLpKkhSIC_XxoSOon3M'}
            loadingElement = { <div style={{ height: "100%" }}/>}
            containerElement = { <div style={{ height: "100%" }}/>}
            mapElement = { <div style={{ height: "100%" }}/>}
            />
        </div>
    )
}


export default BusinessMap
