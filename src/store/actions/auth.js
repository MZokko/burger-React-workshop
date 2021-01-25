//setting up my authentication actionTypes
import * as actionTypes from './actionTypes';
import axios from 'axios';

//use this action to show spinning state during authentification
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

//check the validity of the token
export const AuthcheckTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    //authenticate the user
    dispatch(authStart()); //will set the state
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZIWf4I5Mk9NzrnH_0HaQd73D3NqMUHRI';
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZIWf4I5Mk9NzrnH_0HaQd73D3NqMUHRI';
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(AuthcheckTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};
