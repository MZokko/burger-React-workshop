import React from 'react';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducter', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'someToken', // the value doesnt matter for the test
          userId: 'some user id',
        }
      )
    ).toEqual({
        token: 'someToken',
        userId: 'some user id',
        error: null,
        loading: false,
        authRedirectPath: '/',
      });
  });
});
