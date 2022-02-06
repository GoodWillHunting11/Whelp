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
        const reviews = await response.json()
        dispatch(loadReviews(reviews))
        return reviews
    }
}

export const newReview = (payload) => async dispatch => {

    const response = await fetch(`/api/businesses/${payload.businessId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newRev = await response.json()
        console.log(newRev)

        dispatch(addReview(newRev))
        return newRev
    }
}

const initialState = { entries: [] }

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, entries: [...action.payload.reviews]}
        case ADD_REVIEW:
            return { ...state, entries: []}
        case DELETE_REVIEW:
            return state;
        default:
            return state;
    }
}

export default reviewReducer
