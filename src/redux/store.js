import { combineReducers, createStore } from 'redux'
import { profileContentReducer } from './profile-content-reducer'
import { profileReducer } from './profile-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  profileContent: profileContentReducer,
  profile: profileReducer,
})

export const store = createStore(reducers, composeWithDevTools())
