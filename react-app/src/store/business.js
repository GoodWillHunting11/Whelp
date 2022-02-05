const LOAD_BUSINESSES = 'businesses/LOAD'
const ADD_BUSINESS = 'businesses/ADD'

export const loadBusinesses = payload => {
    return {
        type: LOAD_BUSINESSES,
        payload
    }
}

export const addBusiness = payload => {
    return {
        type: ADD_BUSINESS,
        payload
    }
}

export const getAllBusinesses = () => async dispatch => {

    const response = await fetch(`/api/businesses`, {
        method: 'GET'
    })

    if (response.ok) {
        const businesses = await response.json()
        console.log('hello', businesses)
        dispatch(loadBusinesses(businesses))
    }
}

export const newBusiness = (name, address, city, state, zipcode, phone, website, category) => async dispatch => {

    const response = await fetch(`/api/businesses/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            address,
            city,
            state,
            zipcode,
            phone,
            website,
            category
        })
    })
    if(response.ok) {
        const newBiz = await response.json()
        dispatch(addBusiness(newBiz))
        return newBiz
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return {'errors':data.errors};
        }
      } else {
        return ['An error occurred. Please try again.']
      }

    return response
}

export

const initialState = { entries: [] }

const businessReducer = ( state = initialState, action ) => {
    let newState
    switch (action.type) {
        case LOAD_BUSINESSES:
            return {...state, entries: [...action.payload['data']]}
        case ADD_BUSINESS:
            return {...state, entries: [...state.entries, action.payload]}
        default:
            return state
    }
}


export default businessReducer
