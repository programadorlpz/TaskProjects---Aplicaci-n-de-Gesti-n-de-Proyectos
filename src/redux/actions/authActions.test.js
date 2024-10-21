import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { login, logout } from './authActions';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

import { toast } from 'react-toastify';

// Mock de axios
jest.mock('axios');

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.clearActions();
    jest.clearAllMocks();
  });

  test('dispatches LOGIN_SUCCESS when login is successful', async () => {
    const email = 'test@example.com';
    const users = [
      { id: 1, email: 'test@example.com', name: 'Test User' },
      // otros usuarios
    ];
    const roles = [
      { id: 1, role: 'jefe' },
      // otros roles
    ];

    axios.get.mockImplementation((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/users') {
        return Promise.resolve({ data: users });
      } else if (url === '/https://programadorlpz.github.io/TaskProjects---Aplicaci-n-de-Gesti-n-de-Proyectos/assets/role.json') {
        return Promise.resolve({ data: roles });
      }
      return Promise.reject(new Error('not found'));
    });

    await store.dispatch(login(email));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: LOGIN_SUCCESS,
      payload: {
        id: 1,
        email: 'test@example.com',
        role: 'jefe',
        name: 'Test User',
      },
    });

    expect(toast.success).toHaveBeenCalledWith('Inicio de sesión exitoso');
  });

  test('dispatches LOGIN_FAILURE when email is not found', async () => {
    const email = 'nonexistent@example.com';
    const users = [
      { id: 1, email: 'test@example.com', name: 'Test User' },
      // otros usuarios
    ];

    axios.get.mockImplementation((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/users') {
        return Promise.resolve({ data: users });
      }
      return Promise.reject(new Error('not found'));
    });

    await store.dispatch(login(email));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOGIN_FAILURE });
    expect(toast.error).toHaveBeenCalledWith('Email no encontrado. Verifica tu dirección de correo electrónico.');
  });

  test('dispatches LOGIN_FAILURE when role is not found', async () => {
    const email = 'test@example.com';
    const users = [
      { id: 1, email: 'test@example.com', name: 'Test User' },
    ];
    const roles = [
      // No role for user id 1
      { id: 2, role: 'jefe' },
    ];

    axios.get.mockImplementation((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/users') {
        return Promise.resolve({ data: users });
      } else if (url === '/assets/role.json') {
        return Promise.resolve({ data: roles });
      }
      return Promise.reject(new Error('not found'));
    });

    await store.dispatch(login(email));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOGIN_FAILURE });
    expect(toast.error).toHaveBeenCalledWith('No se ha encontrado un rol asignado para este usuario.');
  });

  test('dispatches LOGOUT action and clears localStorage', () => {
    store.dispatch(logout());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOGOUT });
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(toast.info).toHaveBeenCalledWith('Sesión cerrada');
  });
});
