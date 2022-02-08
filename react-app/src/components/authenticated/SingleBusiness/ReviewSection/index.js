import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';
import ReviewDropDown from './ReviewDropDown';
import './ReviewSection.css'

const ReviewSection = ({ user, reviews, handleDeleteReview, id }) => {
    return (
        <div className='business-reviews'>
            <h2 className='business-photos-h2'>Customer Reviews</h2>
            {reviews.map((review, idx) => (
                <div className='individual-review' key={idx}>
                    <p className='review-user'>{review.user.username}</p>
                    { user.id === review.user_id ? <ReviewDropDown review={review} handleDeleteReview={handleDeleteReview} id={id} /> : <></>}
                    <span className="stars review-stars" style={{"--rating": `${review.rating}`}}></span>
                    <pre className='review-message'>{review.review}</pre>
                    {/* <div className='review-buttons-container'>
                        {user.id === review.user_id &&
                            <Link className='review-button' to={`/businesses/${id}/reviews/${review.id}/edit`}>Edit your review</Link>}
                        {user.id === review.user_id &&
                            <form onSubmit={handleDeleteReview} id={`${review.id}`}>
                                <button className='review-button' type="submit">Delete</button>
                            </form>}
                    </div> */}
                </div>
            ))}
        </div>
    )
}

export default ReviewSection
