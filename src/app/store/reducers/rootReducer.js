import { combineReducers } from 'redux'
import authReducer from './authReducer'
import cursoReducer from './cursoReducer'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
  // set global state
  modal: modalReducer,
  auth: authReducer,
  curso: cursoReducer
})

export default rootReducer
