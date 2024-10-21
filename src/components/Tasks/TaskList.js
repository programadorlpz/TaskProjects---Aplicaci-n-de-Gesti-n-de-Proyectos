import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, CircularProgress, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, toggleTaskCompletion, deleteTask, addTask } from '../../redux/actions/taskActions';
import NotificationToast from '../Modals/NotificationToast';
import TaskModals from './TaskModals';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { role, id } = useSelector((state) => state.auth.user);

  const [selectedTask, setSelectedTask] = useState(null);
  const [modalState, setModalState] = useState({
    modalOpen: false,
    observationModalOpen: false,
    implementerModalOpen: false,
    newTaskModalOpen: false,
    taskStatsModalOpen: false,
  });
  const [actionType, setActionType] = useState('complete');
  const [taskObservations, setTaskObservations] = useState({});

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggle = (task, type) => {
    if (role === 'jefe' && task.completed) {
      setSelectedTask(task);
      setModalState((prevState) => ({ ...prevState, observationModalOpen: true }));
    } else if (role === 'implementador') {
      setSelectedTask(task);
      setActionType(type);
      setModalState((prevState) => ({ ...prevState, implementerModalOpen: true }));
    } else {
      dispatch(toggleTaskCompletion(task));
    }
  };

  const confirmObservations = (observations) => {
    setTaskObservations({
      ...taskObservations,
      [selectedTask.id]: observations,
    });
    dispatch(toggleTaskCompletion(selectedTask));
    setModalState((prevState) => ({ ...prevState, observationModalOpen: false }));
  };

  const confirmImplementerOptions = (options) => {
    setTaskObservations({
      ...taskObservations,
      [selectedTask.id]: options,
    });
    dispatch(toggleTaskCompletion(selectedTask));
    setModalState((prevState) => ({ ...prevState, implementerModalOpen: false }));
  };

  const handleDelete = (id) => {
    setSelectedTask(id);
    setModalState((prevState) => ({ ...prevState, modalOpen: true }));
  };

  const confirmDelete = () => {
    dispatch(deleteTask(selectedTask));
    setModalState((prevState) => ({ ...prevState, modalOpen: false }));
  };

  const handleCreateTask = (newTask) => {
    dispatch(addTask(newTask));
    setModalState((prevState) => ({ ...prevState, newTaskModalOpen: false }));
  };

  const handleCloseModals = (modalName) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }));
  };

  const handleOpenTaskStats = () => {
    setModalState((prevState) => ({ ...prevState, taskStatsModalOpen: true }));
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2, paddingBottom: '200px' }}>
        {error && <NotificationToast message={error} type="error" />}

        {role === 'jefe' && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalState((prevState) => ({ ...prevState, newTaskModalOpen: true }))}
              sx={{ marginRight: '10px' }}
            >
              Crear Nueva Tarea (Modal)
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenTaskStats}
            >
              Ver Estadísticas
            </Button>
          </Grid>
        )}

        {tasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </Typography>
              <Typography variant="body2">Asignada a: {task.userName}</Typography>
              <Typography variant="body2">Estado: {task.completed ? 'Completada' : 'Pendiente'}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Descripción:</strong> {task.description || 'Sin descripción'}
              </Typography>

              {taskObservations[task.id] && (
                <div style={{ marginTop: '1rem' }}>
                  <Typography variant="body2">
                    <strong>Observaciones:</strong>
                  </Typography>
                  <ul>
                    {taskObservations[task.id].map((obs, index) => (
                      <li key={index}>{obs}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Implementador puede marcar como completa o pendiente */}
              {role === 'implementador' && task.userId === id && (
                <Button
                  variant="outlined"
                  color={task.completed ? 'warning' : 'success'}
                  onClick={() => handleToggle(task, task.completed ? 'pending' : 'complete')}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completa'}
                </Button>
              )}

              {/* Jefe puede marcar como pendiente y agregar observaciones */}
              {role === 'jefe' && task.completed && (
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => handleToggle(task)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Marcar como Pendiente
                </Button>
              )}

              {/* Administrador puede eliminar solo tareas pendientes */}
              {role === 'administrador' && !task.completed && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(task.id)}
                  sx={{ mt: 1 }}
                >
                  Eliminar
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Importamos las modales en este componente */}
      <TaskModals
        modalOpen={modalState.modalOpen}
        observationModalOpen={modalState.observationModalOpen}
        implementerModalOpen={modalState.implementerModalOpen}
        newTaskModalOpen={modalState.newTaskModalOpen}
        taskStatsModalOpen={modalState.taskStatsModalOpen}
        selectedTask={selectedTask}
        actionType={actionType}
        confirmDelete={confirmDelete}
        confirmObservations={confirmObservations}
        confirmImplementerOptions={confirmImplementerOptions}
        handleCloseModals={handleCloseModals}
        handleCreateTask={handleCreateTask}
      />
    </>
  );
};

export default TaskList;
