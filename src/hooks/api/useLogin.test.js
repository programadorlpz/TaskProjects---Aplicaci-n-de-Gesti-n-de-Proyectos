import { renderHook, act } from '@testing-library/react-hooks';
import useLogin from './useLogin';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock de las acciones de autenticación
jest.mock('../../redux/actions/authActions', () => ({
  login: jest.fn((email) => ({ type: 'LOGIN_SUCCESS', payload: { email } })),
}));

const mockStore = configureStore([thunk]);

describe('useLogin Hook', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  test('calls performLogin and dispatches login action', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.performLogin('test@example.com');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'LOGIN_SUCCESS', payload: { email: 'test@example.com' } });
  });
});
