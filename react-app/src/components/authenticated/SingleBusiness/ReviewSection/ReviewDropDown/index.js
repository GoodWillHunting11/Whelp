import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewDropDown.css'


const ReviewDropDown = ({ review, handleDeleteReview, id}) => {


    return (
        <div className="dropdown-container" tabIndex="-1">
                        <div className="three-dots"></div>
                        <div className="review-dropdown">
                            <Link className='review-button' to={`/businesses/${id}/reviews/${review.id}/edit`}>Edit</Link>
                            <form onSubmit={handleDeleteReview} id={`${review.id}`}>
                                <button className='review-button' type="submit">Delete</button>
                            </form>
                        </div>
                    </div>
    )
}

export default ReviewDropDown
