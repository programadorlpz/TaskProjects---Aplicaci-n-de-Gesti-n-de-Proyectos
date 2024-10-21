import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from './useAuth';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('useAuth Hook', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isAuthenticated: false, user: null },
    });

    store.dispatch = jest.fn();
  });

  test('should return initial auth state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test('should perform login', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      result.current.performLogin('test@example.com');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    // Puedes verificar que se haya llamado a la acción de login con los argumentos correctos
  });

  test('should perform logout', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.performLogout();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    // Puedes verificar que se haya llamado a la acción de logout
  });
});
