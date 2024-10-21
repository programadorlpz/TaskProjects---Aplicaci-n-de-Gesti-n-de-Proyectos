import { renderHook } from '@testing-library/react-hooks';
import useFetchUsers from './useFetchUsers'; // Ajusta la ruta según tu estructura
import axios from 'axios';

// Mock de axios
jest.mock('axios');

describe('useFetchUsers', () => {
  it('should return users when API call is successful', async () => {
    const mockData = {
      data: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    };

    // Simula una respuesta exitosa de axios
    axios.get.mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    // Espera a que el hook haga la actualización
    await waitForNextUpdate();

    expect(result.current.users).toEqual(mockData.data);
    expect(result.current.loadingUsers).toBe(false);
    expect(result.current.errorUsers).toBe(null);
  });

  it('should handle API error', async () => {
    const errorMessage = 'Error fetching users';

    // Simula un error de axios
    axios.get.mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    // Espera a que el hook haga la actualización
    await waitForNextUpdate();

    expect(result.current.users).toEqual([]);
    expect(result.current.loadingUsers).toBe(false);
    expect(result.current.errorUsers.message).toBe(errorMessage);
  });
});
