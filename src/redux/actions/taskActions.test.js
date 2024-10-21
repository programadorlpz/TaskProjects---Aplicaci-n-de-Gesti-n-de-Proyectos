import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from './taskActions';
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from '../types';

import { toast } from 'react-toastify';

// Mock de axios
jest.mock('axios');

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('taskActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { role: 'jefe', id: 1 } },
    });
    store.clearActions();
    jest.clearAllMocks();
  });

  test('fetchTasks dispatches FETCH_TASKS_SUCCESS', async () => {
    const users = [
      { id: 1, name: 'Jefe' },
      { id: 8, name: 'Implementador 1' },
      { id: 9, name: 'Implementador 2' },
      { id: 10, name: 'Implementador 3' },
    ];

    const tasks = [
      { id: 1, title: 'Task 1', completed: false, userId: 8 },
      { id: 2, title: 'Task 2', completed: true, userId: 9 },
    ];

    axios.get.mockImplementation((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/users') {
        return Promise.resolve({ data: users });
      } else if (url === 'https://jsonplaceholder.typicode.com/todos?_limit=20') {
        return Promise.resolve({ data: tasks });
      }
      return Promise.reject(new Error('not found'));
    });

    await store.dispatch(fetchTasks());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: FETCH_TASKS_SUCCESS,
      payload: [
        { ...tasks[0], userName: 'Implementador 1' },
        { ...tasks[1], userName: 'Implementador 2' },
      ],
    });
  });

  test('addTask dispatches ADD_TASK_SUCCESS', async () => {
    const taskData = {
      title: 'Nueva Tarea',
      description: 'Descripción',
      userId: '8',
    };

    const users = [
      { id: 8, name: 'Implementador 1' },
    ];

    axios.get.mockResolvedValueOnce({ data: users });

    await store.dispatch(addTask(taskData));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: ADD_TASK_SUCCESS,
      payload: {
        id: expect.any(Number),
        title: 'Nueva Tarea',
        description: 'Descripción',
        completed: false,
        userId: 8,
        userName: 'Implementador 1',
      },
    });

    expect(toast.success).toHaveBeenCalledWith('Tarea creada exitosamente');
  });

  test('updateTask dispatches UPDATE_TASK_SUCCESS', async () => {
    const id = 1;
    const taskData = {
      title: 'Tarea Actualizada',
      description: 'Descripción Actualizada',
      completed: true,
      userId: 8,
    };

    const users = [
      { id: 8, name: 'Implementador 1' },
    ];

    axios.get.mockResolvedValueOnce({ data: users });

    await store.dispatch(updateTask(id, taskData));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UPDATE_TASK_SUCCESS,
      payload: {
        id: 1,
        title: 'Tarea Actualizada',
        description: 'Descripción Actualizada',
        completed: true,
        userId: 8,
        userName: 'Implementador 1',
      },
    });

    expect(toast.success).toHaveBeenCalledWith('Tarea actualizada exitosamente');
  });

  test('deleteTask dispatches DELETE_TASK_SUCCESS', async () => {
    const id = 1;

    await store.dispatch(deleteTask(id));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: DELETE_TASK_SUCCESS,
      payload: 1,
    });

    expect(toast.success).toHaveBeenCalledWith('Tarea eliminada exitosamente', {
      style: { marginBottom: '10px' },
    });
  });

  test('toggleTaskCompletion dispatches UPDATE_TASK_SUCCESS', async () => {
    const task = { id: 1, title: 'Task 1', completed: false, userId: 8 };

    const users = [
      { id: 8, name: 'Implementador 1' },
    ];

    axios.get.mockImplementation((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/users') {
        return Promise.resolve({ data: users });
      }
      return Promise.reject(new Error('not found'));
    });

    await store.dispatch(toggleTaskCompletion(task));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UPDATE_TASK_SUCCESS,
      payload: { ...task, completed: true, userName: 'Implementador 1' },
    });

    expect(toast.success).toHaveBeenCalledWith('Estado de la tarea actualizado exitosamente');
  });
});
