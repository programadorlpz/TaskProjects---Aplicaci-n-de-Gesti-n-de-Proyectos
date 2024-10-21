import * as types from './types';

describe('Action Types', () => {
  // Auth types
  test('should have LOGIN_SUCCESS', () => {
    expect(types.LOGIN_SUCCESS).toBe('LOGIN_SUCCESS');
  });

  test('should have LOGIN_FAILURE', () => {
    expect(types.LOGIN_FAILURE).toBe('LOGIN_FAILURE');
  });

  test('should have LOGOUT', () => {
    expect(types.LOGOUT).toBe('LOGOUT');
  });

  // Task types
  test('should have FETCH_TASKS_SUCCESS', () => {
    expect(types.FETCH_TASKS_SUCCESS).toBe('FETCH_TASKS_SUCCESS');
  });

  test('should have ADD_TASK_SUCCESS', () => {
    expect(types.ADD_TASK_SUCCESS).toBe('ADD_TASK_SUCCESS');
  });

  test('should have UPDATE_TASK_SUCCESS', () => {
    expect(types.UPDATE_TASK_SUCCESS).toBe('UPDATE_TASK_SUCCESS');
  });

  test('should have DELETE_TASK_SUCCESS', () => {
    expect(types.DELETE_TASK_SUCCESS).toBe('DELETE_TASK_SUCCESS');
  });

  // Project types
  test('should have FETCH_PROJECTS_SUCCESS', () => {
    expect(types.FETCH_PROJECTS_SUCCESS).toBe('FETCH_PROJECTS_SUCCESS');
  });

  test('should have ADD_PROJECT_SUCCESS', () => {
    expect(types.ADD_PROJECT_SUCCESS).toBe('ADD_PROJECT_SUCCESS');
  });

  test('should have UPDATE_PROJECT_SUCCESS', () => {
    expect(types.UPDATE_PROJECT_SUCCESS).toBe('UPDATE_PROJECT_SUCCESS');
  });

  test('should have DELETE_PROJECT_SUCCESS', () => {
    expect(types.DELETE_PROJECT_SUCCESS).toBe('DELETE_PROJECT_SUCCESS');
  });
});
