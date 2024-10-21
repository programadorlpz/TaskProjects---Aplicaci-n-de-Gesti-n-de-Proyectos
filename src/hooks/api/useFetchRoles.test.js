import { renderHook } from '@testing-library/react-hooks';
import useFetchRoles from './useFetchRoles';
import axios from 'axios';

// Mock de axios
jest.mock('axios');

describe('useFetchRoles Hook', () => {
  test('fetches and returns roles successfully', async () => {
    const roles = [
      { id: 1, role: 'administrador' },
      { id: 2, role: 'jefe' },
      { id: 3, role: 'implementador' },
    ];

    axios.get.mockResolvedValueOnce({ data: roles });

    const { result, waitForNextUpdate } = renderHook(() => useFetchRoles());

    expect(result.current.loadingRoles).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loadingRoles).toBe(false);
    expect(result.current.roles).toEqual(roles);
    expect(result.current.errorRoles).toBeNull();
  });

  test('handles error when fetching roles fails', async () => {
    const errorMessage = 'Failed to fetch roles';

    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchRoles());

    expect(result.current.loadingRoles).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loadingRoles).toBe(false);
    expect(result.current.roles).toEqual([]);
    expect(result.current.errorRoles).toEqual(new Error(errorMessage));
  });
});
