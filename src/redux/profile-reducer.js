const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
const SET_CONTENT_FETCHING = 'SET_CONTENT_FETCHING'

const intitialState = { searchQuery: '', contentFetching: false }

export const profileReducer = (state = intitialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    case SET_CONTENT_FETCHING:
      return { ...state, contentFetching: action.payload }
    default:
      return state
  }
}

export const setSearchQueryAction = (payload) => ({
  type: SET_SEARCH_QUERY,
  payload,
})

export const setContentFetchingAction = (payload) => ({
  type: SET_CONTENT_FETCHING,
  payload,
})
