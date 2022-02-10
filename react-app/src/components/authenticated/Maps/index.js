import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import './Maps.css'

let environment = process.env.REACT_APP_GOOGLE_MAP

const BusinessMap = () => {
    const { id } = useParams()
    const businesses = useSelector(state => state.businessState.entries)
    const singleMap = businesses.find(single => single.id === +id)

    return (
        <iframe
            className='embed-map'
            title='location-map'
            src={`https://www.google.com/maps/embed/v1/place?key=${environment}
            &q=${singleMap['address']},${singleMap['city']}+${singleMap['state']}`}>
        </iframe>
    )


}


export default BusinessMap
