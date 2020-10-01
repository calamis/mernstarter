import fetch from 'isomorphic-unfetch'
import { returnErrors } from './errorAction'

import { 
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../actions/types'

// CHECK TOKEN & LOAD USER 
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  //GET REQUEST TO API
  fetch('http://localhost:5000/api/v1/users/login', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .then(err => {
      dispatch({
        type: AUTH_ERROR
      })
    });
}

// REGISTER USER 
export const userRegistration = ({ name, email, password }) => dispatch => {
  // HEADERS
  const config = {
    headers: {
      'Content-type': 'applicaiton/json'
    }
  }

  // REQUEST BODY
  const data = JSON.stringify({ name, email, password });

  fetch('http://localhost:5000/api/v1/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

  })
  // .then(res => res.json())
  .then(res => res.text())
  .then(text => console.log(text))
  .then(res => {
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data
    });
  })
  .catch(error => {
    dispatch({
      type: USER_REGISTER_FAIL
    })
  });
}

// SETUP CONFIG/HEADERS TOKEN
export const tokenConfig = getState => {

  //GET TOKEN FROM HEADER
  const token = getState().auth.token;

  //HEADERS
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // IF TOKEN, ADD TO HEADERS
  if (token) {
    config.headers['x-auth-token'] = token;
  }
}