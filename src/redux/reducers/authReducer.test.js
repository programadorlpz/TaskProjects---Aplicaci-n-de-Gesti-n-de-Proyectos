import { authReducer } from './authReducer';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle LOGIN_SUCCESS', () => {
    const userData = { id: 1, email: 'test@example.com', role: 'jefe', name: 'Juan Pérez' };
    const action = { type: LOGIN_SUCCESS, payload: userData };

    const expectedState = {
      isAuthenticated: true,
      user: userData,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle LOGIN_FAILURE', () => {
    const action = { type: LOGIN_FAILURE };

    const expectedState = {
      isAuthenticated: false,
      user: null,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle LOGOUT', () => {
    const currentState = {
      isAuthenticated: true,
      user: { id: 1, email: 'test@example.com', role: 'jefe', name: 'Juan Pérez' },
    };
    const action = { type: LOGOUT };

    const expectedState = {
      isAuthenticated: false,
      user: null,
    };

    expect(authReducer(currentState, action)).toEqual(expectedState);
  });
});
