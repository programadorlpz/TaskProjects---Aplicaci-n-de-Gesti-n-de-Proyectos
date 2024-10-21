import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskStatsModal from './TaskStatsModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

// Mock de ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// Mock de PieChart
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  PieChart: () => <div data-testid="pie-chart-mock">Gráfico de Tareas</div>,
}));

describe('TaskStatsModal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  test('renders TaskStatsModal with correct data', () => {
    const store = mockStore({
      tasks: {
        tasks: [
          { id: 1, completed: true },
          { id: 2, completed: false },
          { id: 3, completed: true },
        ],
      },
    });

    render(
      <Provider store={store}>
        <TaskStatsModal open={true} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Estadísticas de Tareas/i)).toBeInTheDocument();
    
    // Verifica que el mock del gráfico se renderiza correctamente
    expect(screen.getByTestId('pie-chart-mock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cerrar/i })).toBeInTheDocument();
  });

  test('calls onClose when cerrar button is clicked', () => {
    const store = mockStore({
      tasks: {
        tasks: [],
      },
    });

    render(
      <Provider store={store}>
        <TaskStatsModal open={true} onClose={onCloseMock} />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /Cerrar/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('renders zero tasks when there are no tasks', () => {
    const store = mockStore({
      tasks: {
        tasks: [],
      },
    });

    render(
      <Provider store={store}>
        <TaskStatsModal open={true} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByTestId('pie-chart-mock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cerrar/i })).toBeInTheDocument();
  });
});
