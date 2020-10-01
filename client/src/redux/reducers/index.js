import { combineReducers } from 'redux'

// IMPORT REDUCERS
import authReducer from './authReducer'
import errorReduces from './errorReducer'

// COMBINED REDUCERS
const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReduces
})

export default rootReducer