

// const SEARCH = 'search/SEARCH'


// export const searchBusiness = (businesses) => ({
//   type: SEARCH,
//   businesses
// })

// export const search = (name) => async(dispatch) => {
//   const response = await fetch(`/api/searched/${name}`)
//   if (response.ok) {
//       const searchResults = await response.json();
//       dispatch(searchBusiness(searchResults))
//       return searchResults
//   }
// }

// const initialState = {};

// const searchReducer = (state = initialState, action) => {
//     let newState;
//   switch(action.type){
//       case SEARCH:{
//         newState = { ...state }
//         action.payload.businesses.map((business) => { newState[business.name] = business })
//         return newState
//       }
//       default:
//           return state
//   }
// }

// export default searchReducer
