import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../redux/reducers';
import NewTaskModal from './NewTaskModal';

// Mock de los hooks personalizados
jest.mock('../../hooks/api/useFetchUsers', () => ({
  __esModule: true,
  default: () => ({
    users: [
      { id: 8, name: 'Implementador 1' },
      { id: 9, name: 'Implementador 2' },
      { id: 10, name: 'Implementador 3' },
    ],
    loadingUsers: false,
    errorUsers: null,
  }),
}));

jest.mock('../../hooks/api/useFetchRoles', () => ({
  __esModule: true,
  default: () => ({
    roles: [
      { id: 8, role: 'implementador' },
      { id: 9, role: 'implementador' },
      { id: 10, role: 'implementador' },
    ],
    loadingRoles: false,
    errorRoles: null,
  }),
}));

describe('NewTaskModal Component', () => {
  const onCloseMock = jest.fn();
  const onCreateMock = jest.fn();

  let store;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk)); // Crear store para pruebas
    onCloseMock.mockClear();
    onCreateMock.mockClear();
  });

  test('renders NewTaskModal when open', () => {
    render(
      <Provider store={store}>
        <NewTaskModal open={true} onClose={onCloseMock} onCreate={onCreateMock} />
      </Provider>
    );

    expect(screen.getByText(/Crear Nueva Tarea/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asignado a/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear/i })).toBeInTheDocument();
  });

  test('shows alert when title is empty', () => {
    window.alert = jest.fn(); // Mock de alert

    render(
      <Provider store={store}>
        <NewTaskModal open={true} onClose={onCloseMock} onCreate={onCreateMock} />
      </Provider>
    );

    const createButton = screen.getByRole('button', { name: /Crear/i });
    fireEvent.click(createButton);

    expect(window.alert).toHaveBeenCalledWith('El título es obligatorio.');
  });

  test('shows alert when implementer is not selected', () => {
    window.alert = jest.fn(); // Mock de alert

    render(
      <Provider store={store}>
        <NewTaskModal open={true} onClose={onCloseMock} onCreate={onCreateMock} />
      </Provider>
    );

    const titleInput = screen.getByLabelText(/Título/i);
    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });

    const createButton = screen.getByRole('button', { name: /Crear/i });
    fireEvent.click(createButton);

    expect(window.alert).toHaveBeenCalledWith('Por favor, selecciona un implementador.');
  });

  test('calls onCreate with correct data when form is valid', async () => {
    render(
      <Provider store={store}>
        <NewTaskModal open={true} onClose={onCloseMock} onCreate={onCreateMock} />
      </Provider>
    );

    const titleInput = screen.getByLabelText(/Título/i);
    const descriptionInput = screen.getByLabelText(/Descripción/i);
    const assignSelect = screen.getByLabelText(/Asignado a/i);

    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción de la tarea' } });
    fireEvent.mouseDown(assignSelect); // Abre el menú desplegable
    const option = await screen.findByText('Implementador 1');
    fireEvent.click(option);

    const createButton = screen.getByRole('button', { name: /Crear/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(onCreateMock).toHaveBeenCalledWith({
        title: 'Nueva Tarea',
        description: 'Descripción de la tarea',
        userId: '8',
      });
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
