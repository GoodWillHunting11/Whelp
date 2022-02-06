import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { getAllReviews, newReview } from '../../../store/review';
import './NewReviewForm.css'

const NewReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams()
    console.log(params)

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            rating: parseInt(rating),
            review,
            url
        }

        console.log(payload)

        const newRev = await dispatch(newReview(payload))

        if(newRev.errors) {
            setErrors(newRev.errors)
        }
        else if (!newRev.errors) {
            history.push(`/businesses/${newBiz.id}`)
        }

    }

    return (
        <div className='new-review-form-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <label className="new-review-label" htmlFor="rating"> Rating
                <div className="rating" id="rating" onChange={e => setRating(e.target.value)}>
                        <input
                            className="star star-1"
                            type="radio"
                            name="stars"
                            id="star-1"
                            value="5"
                        />
                        <label className="star star-1 star-label" htmlFor="star-1"></label>
                        <input
                            className="star star-2"
                            type="radio"
                            name="stars"
                            id="star-2"
                            value="4"
                        />
                        <label className="star star-2 star-label" htmlFor="star-2"></label>
                        <input
                            className="star star-3"
                            type="radio"
                            name="stars"
                            id="star-3"
                            value="3"
                        />
                        <label className="star star-3 star-label" htmlFor="star-3"></label>
                        <input
                            className="star star-4"
                            type="radio"
                            name="stars"
                            id="star-4"
                            value="2"
                        />
                        <label className="star star-4 star-label" htmlFor="star-4"></label>
                        <input
                            className="star star-5"
                            type="radio"
                            name="stars"
                            id="star-5"
                            value="1"
                        />
                        <label className="star star-5 star-label" htmlFor="star-5"></label>
                </div>
                </label>
                <div>
                    <label className="new-review-label"> Review
                        <textarea
                            className='new-review-input'
                            id="review-text"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Review"
                        />
                    </label>
                </div>
                <div>
                    <label className="new-review-label"> Picture
                        <input
                            className="new-review-input"
                            type="text"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            autoComplete='off'
                            placeholder="Image URL"
                        />
                    </label>
                </div>
                <div>
                    <button className='add-review-button' type='submit'>Add Review</button>
                </div>
            </form>
        </div>
    )
}

export default NewReviewForm
