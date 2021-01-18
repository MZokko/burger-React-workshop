//setting up my authentication actionTypes
import * as actionTypes from './actionTypes';
import axios from 'axios';

//use this action to show spinning state during authentification
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    //authenticate the user
    dispatch(authStart()); //will set the state
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyCZIWf4I5Mk9NzrnH_0HaQd73D3NqMUHRI]',
      authData
    )
    .then(
        response =>{
            console.log(response)
            dispatch(authSuccess(response.data))
        }
    )
    .catch((error) => {
        console.log(error)
        dispatch(authFail(error))
    });
  };
};
