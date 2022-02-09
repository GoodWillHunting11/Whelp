import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReviewDropDown.css'


const ReviewDropDown = ({ review, handleDeleteReview, id }) => {

    const [showDropDown, setShowDropDown] = useState(false)

    const toggleClick = () => {
        setShowDropDown(!showDropDown)
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            console.log(ref.current)

        if (showDropDown && ref.current && !ref.current.contains(e.target)) {
            setShowDropDown(false)
        }
    }

    document.addEventListener("click", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [showDropDown])

    return (
        <div className="dropdown-container" tabIndex="-1">
                        <div className="three-dots" onClick={toggleClick}></div>
                        {showDropDown ?
                            <div className="review-dropdown" ref={ref}>
                                <Link className='review-button' to={`/businesses/${id}/reviews/${review.id}/edit`}>Edit</Link>
                                <form onSubmit={handleDeleteReview} id={`${review.id}`}>
                                    <button className='review-button' type="submit">Delete</button>
                                </form>
                        </div> : <></>}

                    </div>
    )
}

export default ReviewDropDown
