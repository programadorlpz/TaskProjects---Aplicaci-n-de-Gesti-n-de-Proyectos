import { taskReducer } from './taskReducer';
import {
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from '../types';

describe('taskReducer', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(taskReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle FETCH_TASKS_SUCCESS', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    const action = { type: FETCH_TASKS_SUCCESS, payload: tasks };

    const expectedState = {
      tasks: tasks,
      loading: false,
      error: null,
    };

    expect(taskReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ADD_TASK_SUCCESS', () => {
    const newTask = { id: 3, title: 'Task 3', completed: false };
    const action = { type: ADD_TASK_SUCCESS, payload: newTask };

    const currentState = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
      loading: false,
      error: null,
    };

    const expectedState = {
      ...currentState,
      tasks: [newTask, ...currentState.tasks],
    };

    expect(taskReducer(currentState, action)).toEqual(expectedState);
  });

  test('should handle UPDATE_TASK_SUCCESS', () => {
    const updatedTask = { id: 2, title: 'Task 2 Updated', completed: false };
    const action = { type: UPDATE_TASK_SUCCESS, payload: updatedTask };

    const currentState = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
      loading: false,
      error: null,
    };

    const expectedState = {
      ...currentState,
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        updatedTask,
      ],
    };

    expect(taskReducer(currentState, action)).toEqual(expectedState);
  });

  test('should handle DELETE_TASK_SUCCESS', () => {
    const action = { type: DELETE_TASK_SUCCESS, payload: 1 };

    const currentState = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
      loading: false,
      error: null,
    };

    const expectedState = {
      ...currentState,
      tasks: [{ id: 2, title: 'Task 2', completed: true }],
    };

    expect(taskReducer(currentState, action)).toEqual(expectedState);
  });
});
