import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { removeBusiness, getAllBusinesses } from '../../../store/business'
import { getAllReviews, removeOneReview } from '../../../store/review'

// Import components
import SingleHero from './Hero'
import PhotoThumbnail from './Photos'

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
            <p className='nope'>Nope. There's nothing here.</p>
        )
    }

    return (
        <>
            <SingleHero single={single} reviews={reviews} />
            <div className='data-col-container'>
                <div className='data-col-left'>
                    <div className='action-buttons'>
                        <Link className='action-button-photo' to=''>Add Photo</Link>
                        <Link className='action-button' to=''>See All Photos</Link>
                        <Link className='action-button' to={`/businesses/${id}/reviews/new`}>Add a review</Link>
                        {user.role === 'admin' ? <button className='action-button' onClick={handleDeleteBusiness}>Delete Business</button>:<></>}
                        {user.role === 'admin' ? <button className='action-button' >Edit Business</button>:<></>}
                    </div>
                    <div className='business-photos'>
                        <h2 className='business-photos-h2'>Photos</h2>
                        <div className='photo-bucket'>
                            {single?.photos?.map((photo, idx) => (
                                <PhotoThumbnail key={idx} url={photo.url} />
                            ))}
                        </div>
                    </div>
                    <div className='business-reviews'>
                        {reviews.map((review, idx) => (
                            <div className='individual-review' key={idx}>
                                <p>{review.rating}</p>
                                <p>{review.review}</p>
                                <div className='review-buttons'>
                                    {user.id === review.user_id &&
                                        <Link className='action-button' to={`/businesses/${id}/reviews/${review.id}/edit`}>Edit your review</Link>}
                                    {user.id === review.user_id &&
                                        <form onSubmit={handleDeleteReview} id={`${review.id}`}>
                                            <button className='action-button' type="submit">Delete</button>
                                        </form>}
                                </div>
                            </div>
                        ))}
                    </div>

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

                    </div>
                </div>
            </div>

        </>
    )

}

export default SingleBusiness
