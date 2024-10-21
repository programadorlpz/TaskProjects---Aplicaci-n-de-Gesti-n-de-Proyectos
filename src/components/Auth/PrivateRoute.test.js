import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockStore = configureStore([]);

const TestComponent = () => <div>Protected Content</div>;

describe('PrivateRoute Component', () => {
  test('renders children when authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <TestComponent />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  test('redirects to login when not authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <TestComponent />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});
