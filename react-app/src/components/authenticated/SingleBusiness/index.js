import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link, Redirect } from 'react-router-dom'
import { removeBusiness } from '../../../store/business'

// Import states
import { getAllBusinesses } from '../../../store/business'
import './SingleBusiness.css'


const SingleBusiness = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const single = businesses.find(single => single.id === +id)

    useEffect(() => {
        (async() => {
          await dispatch(getAllBusinesses())
        })();
      }, [dispatch]);

    const handleDelete = async (e) => {
        e.preventDefault()

        const deleting = await dispatch(removeBusiness(id))
        history.push('/')
    }

    if(!single) {
        return (
            <p className='nope'>Nope. There's nothing here.</p>
        )
    }

    return (
        <div className='single-business-container'>
            {user.role === 'admin' ? <button onClick={handleDelete}>Delete Business</button>:<></>}
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
            {single?.reviews?.map((review, idx) => (
                <div key={idx}>
                    <p>{review.rating}</p>
                    <p>{review.review}</p>
                </div>
            ))}
            {single?.photos?.map((photo, idx) =>(
                <img key={idx} src={photo.url}/>
            ))}
        </div>
    )
}

export default SingleBusiness
