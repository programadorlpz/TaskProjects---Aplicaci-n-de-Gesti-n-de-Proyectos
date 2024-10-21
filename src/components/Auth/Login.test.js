import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

// Realizar el mock dentro del ámbito del jest.mock
jest.mock('../../hooks/api/useLogin', () => {
  // Aquí defines el mock de performLogin dentro del ámbito
  const performLoginMock = jest.fn();
  return {
    __esModule: true,
    default: () => ({
      performLogin: performLoginMock,
    }),
    performLoginMock, // Exportas performLoginMock para poder limpiar o manipular en beforeEach
  };
});

describe('Login Component', () => {
  let store;
  let performLoginMock;

  beforeEach(() => {
    // Obtener performLoginMock del módulo mockeado
    performLoginMock = require('../../hooks/api/useLogin').performLoginMock;
    performLoginMock.mockClear();
    store = mockStore({
      auth: { isAuthenticated: false },
    });
  });

  test('renders Login component correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  
    // Usar getAllByText y luego confirmar que al menos un elemento está en el documento
    const iniciarSesionElements = screen.getAllByText(/Iniciar Sesión/i);
    expect(iniciarSesionElements[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });
  
  test('shows error message when email is not provided', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(await screen.findByText(/Por favor, ingresa tu correo electrónico/i)).toBeInTheDocument();
  });

  test('calls performLogin when email is provided', async () => {
    performLoginMock.mockResolvedValueOnce();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const loginButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(performLoginMock).toHaveBeenCalledWith('test@example.com');
    });
  });
});
