import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Footer Component', () => {
  test('renders Footer with user information when user is present', () => {
    const store = mockStore({
      auth: {
        user: { role: 'jefe', name: 'Juan Pérez' },
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText(/Rol: Jefe/i)).toBeInTheDocument();
    expect(screen.getByText(/Nombre: Juan Pérez/i)).toBeInTheDocument();
  });

  test('does not render user information when user is not present', () => {
    const store = mockStore({
      auth: {
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    // No debería haber elementos con información del usuario
    expect(screen.queryByText(/Rol:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Nombre:/i)).not.toBeInTheDocument();
  });
});
