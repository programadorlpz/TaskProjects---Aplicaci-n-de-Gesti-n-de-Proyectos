import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { taskReducer } from './reducers/taskReducer';

describe('Redux Store', () => {
  let store;

  beforeEach(() => {
    const rootReducer = combineReducers({
      auth: authReducer,
      tasks: taskReducer,
    });
    store = createStore(rootReducer, applyMiddleware(thunk));
  });

  test('initial state is correct', () => {
    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(false);
    expect(state.auth.user).toBeNull();
    expect(state.tasks.tasks).toEqual([]);
    expect(state.tasks.loading).toBe(false);
    expect(state.tasks.error).toBeNull();
  });

  test('dispatches LOGIN_SUCCESS and updates state', () => {
    const userData = { id: 1, email: 'test@example.com', role: 'jefe', name: 'Juan Pérez' };
    store.dispatch({ type: 'LOGIN_SUCCESS', payload: userData });

    const state = store.getState();
    expect(state.auth.isAuthenticated).toBe(true);
    expect(state.auth.user).toEqual(userData);
  });

  test('dispatches FETCH_TASKS_SUCCESS and updates state', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    store.dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: tasks });

    const state = store.getState();
    expect(state.tasks.tasks).toEqual(tasks);
    expect(state.tasks.loading).toBe(false);
  });
});
