import { Link } from 'react-router-dom'
import './BusinessRoll.css'

const BusinessRoll = ({biz}) => {


    let rating = 0;
    const ratings = biz?.reviews?.map( review => review.rating)
    if (ratings.length){
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }

    const formatPhone = (number) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    }

    let phone = '';

    if(biz?.phone) {
        phone = formatPhone(biz.phone)
    }

    let fullAddress = biz?.address + " " + biz?.city + ", " + biz?.state + " " + biz?.zipcode;
    if (fullAddress.length > 40) fullAddress = fullAddress.slice(0, 34) + "..."

    if(!biz.photos.length) {

        return (
            <div className='roll-container'>
                <div className='roll-no-pic'>

                </div>
                <div className='roll-data'>
                    <Link className='roll-title' to={`/businesses/${biz?.id}`}>{biz?.name}</Link>
                    <p className="roll-info"><strong>Category:</strong> {biz?.categories[0]?.category}</p>
                    <p className="roll-info"><strong>Contact:</strong> {phone}</p>
                    <p className="roll-info"><strong>Address:</strong> {biz?.address} {biz?.city}, {biz?.state} {biz?.zipcode}</p>
                    <div className='rating-container'>
                        <div className='roll-rating'><span className="stars" style={{"--rating": `${rating}`}}></span></div>
                        <div className='roll-more'><Link className='roll-more-link' to={`/businesses/${biz?.id}`}>MORE...</Link></div>

                    </div>
                </div>

        </div>
        )
    }

    return (
        <div className='roll-container'>
            <div className='roll-pic' style={{backgroundImage: `url(${biz.photos[0].url})`}}>

            </div>
            <div className='roll-data'>
                <Link className='roll-title' to={`/businesses/${biz?.id}`}>{biz?.name}</Link>
                <p className="roll-info"><strong>Category:</strong> {biz?.categories[0]?.category}</p>
                <p className="roll-info"><strong>Contact:</strong> {phone}</p>
                <p className="roll-info"><strong>Address:</strong> {fullAddress}</p>
                <div className='rating-container'>
                    <div className='roll-rating'><span className="stars" style={{"--rating": `${rating}`}}></span></div>
                    <div className='roll-more'><Link className='roll-more-link' to={`/businesses/${biz?.id}`}>MORE...</Link></div>

                </div>
            </div>

        </div>
    )
}

export default BusinessRoll
