const FETCH_CONTENT = 'FETCH_CONTENT'

const intitialState = {
  content: [],
  totalPages: 1,
  currentPage: 1,
  fetching: false,
}

export const profileContentReducer = (state = intitialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
