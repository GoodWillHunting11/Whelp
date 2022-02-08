import React from 'react'
import ReviewDropDown from './ReviewDropDown';
import './ReviewSection.css'

const ReviewSection = ({ user, reviews, handleDeleteReview, id }) => {
    return (
        <div className='business-reviews'>
            <h2 className='reviews-header'>Customer Reviews</h2>
            {reviews.map((review, idx) => (
                <div className='individual-review' key={idx}>
                    <p className='review-user'>{review.user.username}</p>
                    { user.id === review.user_id ?
                        <ReviewDropDown review={review} handleDeleteReview={handleDeleteReview} id={id} />
                    : <></>}
                    <span className="stars review-stars" style={{"--rating": `${review.rating}`}}></span>
                    <pre className='review-message'>{review.review}</pre>
                </div>
            ))}
        </div>
    )
}

export default ReviewSection
