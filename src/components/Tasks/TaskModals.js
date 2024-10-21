import React from 'react';
import ConfirmationModal from '../Modals/ConfirmationModal';
import ObservationModal from '../Modals/ObservationModal';
import ImplementerOptionsModal from '../Modals/ImplementerOptionsModal';
import NewTaskModal from '../Modals/NewTaskModal';
import TaskStatsModal from '../Modals/TaskStatsModal';

const TaskModals = ({
  modalOpen,
  observationModalOpen,
  implementerModalOpen,
  newTaskModalOpen,
  taskStatsModalOpen,
  selectedTask,
  actionType,
  confirmDelete,
  confirmObservations,
  confirmImplementerOptions,
  handleCloseModals,
  handleCreateTask,
}) => {
  return (
    <>
      {/* Modal de confirmación de eliminación para Administrador */}
      <ConfirmationModal
        open={modalOpen}
        onClose={() => handleCloseModals('modalOpen')}
        onConfirm={confirmDelete}
      />

      {/* Modal de observaciones para Rol: Jefe */}
      <ObservationModal
        open={observationModalOpen}
        onClose={() => handleCloseModals('observationModalOpen')}
        onConfirm={confirmObservations}
      />

      {/* Modal exclusivo para el Rol: Implementador */}
      <ImplementerOptionsModal
        open={implementerModalOpen}
        onClose={() => handleCloseModals('implementerModalOpen')}
        onConfirm={confirmImplementerOptions}
        actionType={actionType}
      />

      {/* Modal para crear nueva tarea */}
      <NewTaskModal
        open={newTaskModalOpen}
        onClose={() => handleCloseModals('newTaskModalOpen')}
        onCreate={handleCreateTask}
      />

      {/* Modal para Estadísticas de Tareas */}
      <TaskStatsModal
        open={taskStatsModalOpen}
        onClose={() => handleCloseModals('taskStatsModalOpen')}
      />
    </>
  );
};

export default TaskModals;
