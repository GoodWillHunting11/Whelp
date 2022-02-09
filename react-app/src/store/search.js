const LOAD_SEARCHES = 'searches/LOAD_SEARCHES'

export const loadSearches = payload => {
    return {
        type: LOAD_SEARCHES,
        payload
    }
}

export const getAllSearches = (payload) => async dispatch => {
    const response = await fetch(`/api/search/:${payload}`)

    if (response.ok) {
        const searches = await response.json()
        dispatch(loadSearches(searches))
        return searches
    }
}


const initialState = { entries: [] }

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SEARCHES:
            return {...state, entries: [...action.payload.searches]}
        default:
            return state
    }
}


export default searchReducer
