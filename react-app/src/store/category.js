const LOAD_BUSINESSCAT = 'businessesCat/LOAD_BUSINESSCAT'


export const loadBusinessesCat = payload => {
    return {
        type: LOAD_BUSINESSCAT,
        payload
    }
}


export const getAllBusinessesCat = () => async dispatch => {

    const response = await fetch(`/api/categories/`)


    if (response.ok) {
        const businessesCat = await response.json()
        dispatch(loadBusinessesCat(businessesCat))
    }
}


export const initialState = { entries: [] }

const businessCatReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_BUSINESSCAT:
            return {...state, entries: [...action.payload['data']]}

        default:
            return state
    }
}


export default businessCatReducer
