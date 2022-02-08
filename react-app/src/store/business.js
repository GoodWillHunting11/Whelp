const LOAD_BUSINESSES = 'businesses/LOAD'
const ADD_BUSINESS = 'businesses/ADD'
const DELETE_BUSINESS = 'businesses/DELETE'
const EDIT_BUSINESS = 'businesses/EDIT'

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

export const deleteBusiness = deletedBusiness => {
    return {
        type: DELETE_BUSINESS,
        deletedBusiness
    }
}

export const editBusiness = editedBusiness => {
    return {
        type: EDIT_BUSINESS,
        editedBusiness
    }
}

export const editingBusiness = (id, name, address, city, state, zipcode, phone, website, category) => async dispatch => {

    const response = await fetch(`/api/businesses/edit/${id}`,
    {method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
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
        const updatedBiz = await response.json()
        dispatch(editBusiness(updatedBiz))
        return updatedBiz
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

export const removeBusiness = business => async dispatch => {
    const response = await fetch(`/api/businesses/delete/${business}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteBusiness(deleted))
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
        case DELETE_BUSINESS:
            newState = { ...state }

            let target = action.deletedBusiness.id
            let removing = newState.entries.find(one => one.id === target)
            let idx = newState.entries.indexOf(removing)
            console.log('here', idx)
            newState.entries.splice(idx, 1)
            return newState
        default:
            return state
    }
}


export default businessReducer
