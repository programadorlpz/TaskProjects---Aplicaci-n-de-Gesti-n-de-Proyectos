import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskModals from './TaskModals';

describe('TaskModals Component', () => {
  const handleCloseModalsMock = jest.fn();
  const confirmDeleteMock = jest.fn();
  const confirmObservationsMock = jest.fn();
  const confirmImplementerOptionsMock = jest.fn();
  const handleCreateTaskMock = jest.fn();

  beforeEach(() => {
    handleCloseModalsMock.mockClear();
    confirmDeleteMock.mockClear();
    confirmObservationsMock.mockClear();
    confirmImplementerOptionsMock.mockClear();
    handleCreateTaskMock.mockClear();
  });

  test('renders all modals when their respective props are true', () => {
    render(
      <TaskModals
        modalOpen={true}
        observationModalOpen={true}
        implementerModalOpen={true}
        newTaskModalOpen={true}
        taskStatsModalOpen={true}
        selectedTask={1}
        actionType="complete"
        confirmDelete={confirmDeleteMock}
        confirmObservations={confirmObservationsMock}
        confirmImplementerOptions={confirmImplementerOptionsMock}
        handleCloseModals={handleCloseModalsMock}
        handleCreateTask={handleCreateTaskMock}
      />
    );

    expect(screen.getByText(/Advertencia/i)).toBeInTheDocument();
    expect(screen.getByText(/Observaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Razones para Completar la Tarea/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear Nueva Tarea/i)).toBeInTheDocument();
    expect(screen.getByText(/Estadísticas de Tareas/i)).toBeInTheDocument();
  });

  test('calls confirmDelete when ConfirmationModal confirms deletion', () => {
    render(
      <TaskModals
        modalOpen={true}
        observationModalOpen={false}
        implementerModalOpen={false}
        newTaskModalOpen={false}
        taskStatsModalOpen={false}
        selectedTask={1}
        actionType="complete"
        confirmDelete={confirmDeleteMock}
        confirmObservations={confirmObservationsMock}
        confirmImplementerOptions={confirmImplementerOptionsMock}
        handleCloseModals={handleCloseModalsMock}
        handleCreateTask={handleCreateTaskMock}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButton);

    expect(confirmDeleteMock).toHaveBeenCalledTimes(1);
  });

  test('calls confirmObservations when ObservationModal confirms', () => {
    render(
      <TaskModals
        modalOpen={false}
        observationModalOpen={true}
        implementerModalOpen={false}
        newTaskModalOpen={false}
        taskStatsModalOpen={false}
        selectedTask={1}
        actionType="complete"
        confirmDelete={confirmDeleteMock}
        confirmObservations={confirmObservationsMock}
        confirmImplementerOptions={confirmImplementerOptionsMock}
        handleCloseModals={handleCloseModalsMock}
        handleCreateTask={handleCreateTaskMock}
      />
    );

    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirmButton);

    expect(confirmObservationsMock).toHaveBeenCalledTimes(1);
  });

  test('calls confirmImplementerOptions when ImplementerOptionsModal confirms', () => {
    render(
      <TaskModals
        modalOpen={false}
        observationModalOpen={false}
        implementerModalOpen={true}
        newTaskModalOpen={false}
        taskStatsModalOpen={false}
        selectedTask={1}
        actionType="complete"
        confirmDelete={confirmDeleteMock}
        confirmObservations={confirmObservationsMock}
        confirmImplementerOptions={confirmImplementerOptionsMock}
        handleCloseModals={handleCloseModalsMock}
        handleCreateTask={handleCreateTaskMock}
      />
    );

    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirmButton);

    expect(confirmImplementerOptionsMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleCreateTask when NewTaskModal creates a task', () => {
    render(
      <TaskModals
        modalOpen={false}
        observationModalOpen={false}
        implementerModalOpen={false}
        newTaskModalOpen={true}
        taskStatsModalOpen={false}
        selectedTask={1}
        actionType="complete"
        confirmDelete={confirmDeleteMock}
        confirmObservations={confirmObservationsMock}
        confirmImplementerOptions={confirmImplementerOptionsMock}
        handleCloseModals={handleCloseModalsMock}
        handleCreateTask={handleCreateTaskMock}
      />
    );

    const createButton = screen.getByRole('button', { name: /Crear/i });
    fireEvent.click(createButton);

    expect(handleCreateTaskMock).toHaveBeenCalledTimes(1);
  });

  test('calls handleCloseModals when TaskStatsModal is closed', () => {
    render(
      <TaskModals
        modalOpen={false}
        observationModalOpen={false}
        implementerModalOpen={false}
        newTaskModalOpen={false}
        taskStatsModalOpen={true}
        selectedTask={1}
        actionType="complete"
        confirmDelete={confirmDeleteMock}
        confirmObservations={confirmObservationsMock}
        confirmImplementerOptions={confirmImplementerOptionsMock}
        handleCloseModals={handleCloseModalsMock}
        handleCreateTask={handleCreateTaskMock}
      />
    );

    const closeButton = screen.getByRole('button', { name: /Cerrar/i });
    fireEvent.click(closeButton);

    expect(handleCloseModalsMock).toHaveBeenCalledWith('taskStatsModalOpen');
  });
});
