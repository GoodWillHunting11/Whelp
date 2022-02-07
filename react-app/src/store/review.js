const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEW = 'reviews/ADD'
const EDIT_REVIEW = 'reviews/EDIT'
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

export const editReview = payload => {
    return {
        type: EDIT_REVIEW,
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

        dispatch(addReview(newRev))
        return newRev
    }
}

export const editOneReview = payload => async dispatch => {

    const response = await fetch(`/api/businesses/${payload.businessId}/reviews/${payload.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const editedRev = await response.json()
        dispatch(editReview(editedRev))
        return editedRev
    }
}

const initialState = { entries: [] }

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, entries: [...action.payload.reviews]}
        case ADD_REVIEW:
            return { ...state, entries: [...state.entries, action.payload]}
        case EDIT_REVIEW:
            return { ...state, entries: [...state.entries, action.payload]}
        case DELETE_REVIEW:
            return state;
        default:
            return state;
    }
}

export default reviewReducer
