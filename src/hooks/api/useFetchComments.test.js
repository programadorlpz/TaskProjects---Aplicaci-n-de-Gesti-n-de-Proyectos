import { renderHook } from '@testing-library/react-hooks';
import useFetchComments from './useFetchComments';
import axios from 'axios';

// Mock de axios
jest.mock('axios');

describe('useFetchComments Hook', () => {
  test('fetches and returns comments successfully', async () => {
    const comments = [
      { id: 1, name: 'Comment 1', body: 'Body 1' },
      { id: 2, name: 'Comment 2', body: 'Body 2' },
    ];

    axios.get.mockResolvedValueOnce({ data: comments });

    const { result, waitForNextUpdate } = renderHook(() => useFetchComments(2));

    expect(result.current.loadingComments).toBe(true);
    expect(result.current.comments).toEqual([]);
    expect(result.current.errorComments).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loadingComments).toBe(false);
    expect(result.current.comments).toEqual(comments);
    expect(result.current.errorComments).toBeNull();
  });

  test('handles error when fetching comments fails', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchComments());

    expect(result.current.loadingComments).toBe(true);
    expect(result.current.comments).toEqual([]);
    expect(result.current.errorComments).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loadingComments).toBe(false);
    expect(result.current.comments).toEqual([]);
    expect(result.current.errorComments).toEqual(new Error(errorMessage));
  });
});
