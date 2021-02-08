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
  //clear the local storage
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
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
        //add token and expiration date to local storage 
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', response.data.localId)
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(AuthcheckTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) =>{
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = ()=>{
  return dispatch=>{
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logOut())
    }else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      
      if (expirationDate <= new Date()) {
        dispatch(logOut())
      }else{
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token,userId))
        dispatch(AuthcheckTimeOut((expirationDate.getTime()-new Date().getTime())/1000))
      }
    }
    
  }
}
