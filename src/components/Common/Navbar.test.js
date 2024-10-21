import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const mockStore = configureStore([]);

describe('Navbar Component', () => {
  test('renders Navbar with login button when not authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar toggleTheme={jest.fn()} currentTheme="light" />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/TaskProjects/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  test('renders Navbar with logout button when authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /Cerrar Sesión/i })).toBeInTheDocument();
  });

  test('calls logout when Cerrar Sesión button is clicked', () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const logoutButton = screen.getByRole('button', { name: /Cerrar Sesión/i });
    fireEvent.click(logoutButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    // Puedes verificar que se haya llamado a la acción de logout
  });
});
