// TaskList.test.js

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // Asegúrate de importar redux-thunk
import TaskList from './TaskList'; // Asegúrate de que la ruta sea correcta

// Definir los middlewares
const middlewares = [thunk];
// Crear el mockStore con los middlewares
const mockStore = configureMockStore(middlewares);

describe('TaskList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: { role: 'jefe', id: 1 },
      },
      tasks: {
        loading: false,
        error: null,
        data: [{ id: 1, title: 'Tarea 1', status: 'pending' }],
      },
    });
  });

  it('renders TaskList with tasks', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    expect(getByText('Tarea 1')).toBeInTheDocument();
  });

  it('renders loading indicator when loading', () => {
    store = mockStore({
      auth: {
        user: { role: 'jefe', id: 1 },
      },
      tasks: {
        loading: true,
        error: null,
        data: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    store = mockStore({
      auth: {
        user: { role: 'jefe', id: 1 },
      },
      tasks: {
        loading: false,
        error: 'Error al cargar tareas',
        data: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    expect(getByText('Error al cargar tareas')).toBeInTheDocument();
  });
});
