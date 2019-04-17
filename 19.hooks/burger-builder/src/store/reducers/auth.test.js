import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should store the token upon login', () => {
    const idToken = 'some-token';
    const userId = 'some-user-id';
    const initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      idToken,
      userId
    };
    const expectedState = {
      ...initialState,
      token: idToken,
      userId
    };
    expect(reducer(initialState, action))
      .toEqual(expectedState);
  });
});