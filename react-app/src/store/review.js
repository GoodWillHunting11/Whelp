const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEW = 'reviews/ADD'
const DELETE_REVIEW = 'reviews/DELETE'

export const loadReviews = payload => {
    return {
        type: LOAD_REVIEWS,
        payload
    }
}

export const addReview = payload => {
    return {
        type: ADD_REVIEW,
        payload
    }
}

export const deleteReview = reviewToDelete => {
    return {
        type: DELETE_REVIEW,
        reviewToDelete
    }
}

export const getAllReviews = businessId => async dispatch => {

    const response = await fetch (`/api/businesses/${businessId}/reviews`)

    if (response.ok) {
        const reviews = response.json()
        console.log('hi reviews', reviews)
        dispatch(loadReviews(reviews))
    }
}

export const newReview = payload => async dispatch => {

    const response = await fetch()
}

const initialState = { entries: [] }

const reviewReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
        case ADD_REVIEW:
        case DELETE_REVIEW:
    }
}

export default reviewReducer
