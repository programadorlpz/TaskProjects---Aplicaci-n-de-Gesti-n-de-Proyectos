import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from './TaskForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as taskActions from '../../redux/actions/taskActions';

// Mock de las acciones de Redux
jest.mock('../../redux/actions/taskActions');

const mockStore = configureStore([thunk]);

describe('TaskForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { role: 'jefe', id: 1 } },
      tasks: { tasks: [], error: null },
    });

    store.dispatch = jest.fn();
  });

  test('renders TaskForm for creating a new task', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tasks/create']}>
          <Routes>
            <Route path="/tasks/create" element={<TaskForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Crear Nueva Tarea/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completada/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear Tarea/i })).toBeInTheDocument();
  });

  test('shows error message when user with non-jefe role tries to access TaskForm', () => {
    store = mockStore({
      auth: { user: { role: 'implementador', id: 8 } },
      tasks: { tasks: [], error: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tasks/create']}>
          <Routes>
            <Route path="/tasks/create" element={<TaskForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No tienes permiso para acceder a esta página/i)).toBeInTheDocument();
  });

  test('submits form with correct data when creating a new task', async () => {
    taskActions.addTask.mockImplementation(() => ({ type: 'ADD_TASK_SUCCESS' }));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tasks/create']}>
          <Routes>
            <Route path="/tasks/create" element={<TaskForm />} />
            <Route path="/tasks" element={<div>Task List</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const titleInput = screen.getByLabelText(/Título/i);
    const descriptionInput = screen.getByLabelText(/Descripción/i);
    const completedCheckbox = screen.getByLabelText(/Completada/i);
    const submitButton = screen.getByRole('button', { name: /Crear Tarea/i });

    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción de la tarea' } });
    fireEvent.click(completedCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(taskActions.addTask).toHaveBeenCalledWith({
        title: 'Nueva Tarea',
        description: 'Descripción de la tarea',
      });
      expect(store.dispatch).toHaveBeenCalled();
      // Aquí podrías verificar la redirección a la lista de tareas
      expect(screen.getByText(/Task List/i)).toBeInTheDocument();
    });
  });

  test('shows error message when form submission fails', async () => {
    taskActions.addTask.mockImplementation(() => { throw new Error('Error creando tarea'); });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tasks/create']}>
          <Routes>
            <Route path="/tasks/create" element={<TaskForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const titleInput = screen.getByLabelText(/Título/i);
    const submitButton = screen.getByRole('button', { name: /Crear Tarea/i });

    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error al crear la tarea/i)).toBeInTheDocument();
    });
  });
});
