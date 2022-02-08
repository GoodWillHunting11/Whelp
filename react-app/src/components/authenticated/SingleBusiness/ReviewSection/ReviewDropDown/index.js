import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';
import './ReviewDropDown.css'


const ReviewDropDown = ({ review, handleDeleteReview, id}) => {


    return (
        <div class="dropdown-container" tabindex="-1">
                        <div class="three-dots"></div>
                        <div class="review-dropdown">
                            <Link className='review-button' to={`/businesses/${id}/reviews/${review.id}/edit`}>Edit</Link>
                            <form onSubmit={handleDeleteReview} id={`${review.id}`}>
                                <button className='review-button' type="submit">Delete</button>
                            </form>
                        </div>
                    </div>
    )
}

export default ReviewDropDown
