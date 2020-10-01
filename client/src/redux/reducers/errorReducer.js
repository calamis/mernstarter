// IMPORT ACTION TYPES
import {  GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

// SET INITIAL STATE
const initialState = {
  message: {},
  status: null,
  id: null
}

// CREATE FUNCTION
export default function Error(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null
      }
    default:
      return state
  }
}