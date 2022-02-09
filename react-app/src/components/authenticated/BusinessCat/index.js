import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import './BusinessCat.css'



const BusinessCat = () => {
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const selectedBusinesses = businesses.filter(business => business.categories[0].id === +id)
    const single = businesses.find(single => single.id === +id)
    // const businessescat = useSelector(state => state.businessCatState.entries)
    // const singleCat = businessescat.find(single => single.id === +id)



    let rating = 0;
    const ratings = single?.reviews?.map(review => review.rating)
    if (ratings?.length) {
        ratings?.forEach(rate => rating = rate + rating)
        rating = rating / ratings.length
    }

    const formatPhone = (number) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    }

    return (
        <div className='main-cat-container'>
            <div className='search-title-container'>

                    <h1 className='search-stream-title' >Category: <span className="search-subtitle">{single?.categories[0]?.category}</span></h1>

            </div>
            <div className='business-roll'>
                <>
                    {selectedBusinesses?.map(business => (
                        <div className='roll-container'>
                            {business.photos.length > 1 ? <div className='roll-pic' style={{ backgroundImage: `url(${business?.photos[0]?.url})` }}> </div> : <div className='roll-no-pic'>

                            </div>}


                            <div className='roll-data'>
                                <Link className='roll-title' to={`/businesses/${business?.id}`}>{business?.name}</Link>
                                <p className="roll-info"><strong>Category:</strong> {business?.categories[0]?.category}</p>
                                <p className="roll-info"><strong>Contact:</strong> {formatPhone(business.phone)}</p>
                                <p className="roll-info"><strong>Address:</strong> {business?.address} {business?.city}, {business?.state} {business?.zipcode}</p>
                                <div className='rating-container'>
                                    <div className='roll-rating'><span className="stars" style={{ "--rating": `${rating}` }}></span></div>
                                    <div className='roll-more'><Link className='roll-more-link' to={`/businesses/${business?.id}`}>MORE...</Link></div>

                                </div>
                            </div>

                        </div>
                    ))}

                </>
            </div>
        </div>
    )

}


export default BusinessCat;
