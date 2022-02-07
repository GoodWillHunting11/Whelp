import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { removeBusiness, getAllBusinesses } from '../../../store/business'
import { getAllReviews, removeOneReview } from '../../../store/review'


import './SingleBusiness.css'


const SingleBusiness = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const reviews = useSelector(state => state.reviewState.entries)

    const single = businesses.find(single => single.id === +id)

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
        <div className='single-business-container'>
            {user.role === 'admin' ? <button onClick={handleDeleteBusiness}>Delete Business</button>:<></>}
            {user.role === 'admin' ? <button>Edit Business</button>:<></>}
            <p>{single?.name}</p>
            <p>{single?.address}</p>
            <p>{single?.city}</p>
            <p>{single?.state}</p>
            <p>{single?.zip}</p>
            <p>{single?.phone}</p>
            <p>{single?.website}</p>
            {single?.categories?.map((cat, idx) => (
                <p key={idx}>{cat.category}</p>
            ))}
            <Link to={`/businesses/${id}/reviews/new`}>Add a review</Link>
            {reviews.map((review, idx) => (
                <div key={idx}>
                    <p>{review.rating}</p>
                    <p>{review.review}</p>
                    {user.id === review.user_id &&
                        <Link to={`/businesses/${id}/reviews/${review.id}/edit`}>Edit your review</Link>}
                    {user.id === review.user_id &&
                        <form onSubmit={handleDeleteReview} id={`${review.id}`}>
                            <button type="submit">Delete</button>
                        </form>}
                </div>
            ))}
            {single?.photos?.map((photo, idx) =>(
                <img alt="An adorable Whelp user's dog." key={idx} src={photo.url}/>
            ))}
        </div>
    )
}

export default SingleBusiness
