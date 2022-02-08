import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { removeBusiness, getAllBusinesses } from '../../../store/business'
import { getAllReviews, removeOneReview } from '../../../store/review'

// Import components
import SingleHero from './Hero'
import PhotoThumbnail from './Photos'
import BusinessMap from '../Maps'
import ReviewSection from './ReviewSection'

import './SingleBusiness.css'


const SingleBusiness = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const reviews = useSelector(state => state.reviewState.entries)

    const single = businesses.find(single => single.id === +id)
    console.log(single?.photos)
    const formatPhone = (number) => {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    }

    let phone = '';

    if(single) {
        phone = formatPhone(single.phone)
    }

    useEffect(() => {
        (async() => {
            await dispatch(getAllBusinesses())
            await dispatch(getAllReviews(id))
        })();
    }, [dispatch, id])



    const handleDeleteBusiness = async (e) => {
        e.preventDefault()

        await dispatch(removeBusiness(id))
        history.push('/')
    }

    const handleDeleteReview = async (e) => {
        e.preventDefault()

        let reviewToDeleteId = parseInt(e.target.id, 10)
        const payload = {
            reviewToDeleteId,
            businessId: id
        }

        await dispatch(removeOneReview(payload))
    }

    if(!single) {
        return (
            <h1 className='roll-heading'>Whelp! There's nothing here.</h1>
        )
    }

    return (
        <>
            <SingleHero single={single} reviews={reviews} />
            <div className='data-col-container'>
                <div className='data-col-left'>
                    <div className='action-buttons'>
                        <Link className='action-button-photo' to={`/businesses/${id}/photos/upload`}>Add Photo</Link>
                        <Link className='action-button' to={`/businesses/${id}/photos`}>See All Photos</Link>
                        <Link className='action-button' to={`/businesses/${id}/reviews/new`}>Add a review</Link>
                        {user.role === 'admin' ? <button className='action-button' onClick={handleDeleteBusiness}>Delete Business</button>:<></>}
                        {user.role === 'admin' ? <Link className='action-button' to={`/businesses/edit/${id}`} >Edit Business</Link>:<></>}
                    </div>
                    <div className='business-photos'>
                        <h2 className='business-photos-h2'>Photos</h2>
                        <div className='photo-bucket'>
                            {single?.photos?.map((photo, idx) => (
                                <PhotoThumbnail key={idx} url={photo.url} />
                            ))}
                        </div>
                    </div>
                    <ReviewSection user={user} id={id} reviews={reviews} handleDeleteReview={handleDeleteReview}/>
                </div>
                <div className='data-col-right'>
                    <div className='business-meta'>
                        <div className='web'>
                            <h3 className='meta-h3'>Website</h3>
                            <a href={single.website} target="_blank" rel="noreferrer">{single.website}</a>
                        </div>
                        {phone ? <div className='phone'><h3 className='meta-h3'>Contact</h3>{phone}</div>:<></>}
                        <div className='address'>
                            <h3 className='meta-h3'>Address</h3>
                            {single.address} {single.city}, {single.state} {single.zipcode}
                        </div>
                    </div>
                    <div className='business-map'>
                        <BusinessMap />
                    </div>
                </div>
            </div>

        </>
    )

}

export default SingleBusiness
