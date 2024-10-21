import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, fetchTasks } from '../../redux/actions/taskActions';
import { useNavigate, useParams } from 'react-router-dom';
import NotificationToast from '../Modals/NotificationToast';

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { tasks, error } = useSelector((state) => state.tasks);
  const { role } = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const [toast, setToast] = useState({ open: false, message: '', type: '' });

  useEffect(() => {
    if (isEdit) {
      if (tasks.length === 0) {
        dispatch(fetchTasks());
      } else {
        const task = tasks.find((t) => t.id === parseInt(id));
        if (task) {
          setFormData({
            title: task.title,
            description: task.description,
            completed: task.completed,
          });
        }
      }
    }
  }, [dispatch, id, isEdit, tasks]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateTask(id, formData));
      setToast({ open: true, message: 'Tarea actualizada exitosamente', type: 'success' });
    } else {
      dispatch(addTask(formData));
      setToast({ open: true, message: 'Tarea creada exitosamente', type: 'success' });
    }
    navigate('/tasks');
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  // Evitar que roles distintos al jefe accedan al formulario de creación de tareas
  if (role !== 'jefe') {
    return <Typography variant="h6" color="error">No tienes permiso para acceder a esta página</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.completed}
              onChange={handleChange}
              name="completed"
              color="primary"
            />
          }
          label="Completada"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {isEdit ? 'Actualizar Tarea' : 'Crear Tarea'}
        </Button>
      </form>

      {/* Aquí se renderiza el Toast */}
      <NotificationToast
        message={toast.message}
        type={toast.type}
        open={toast.open}
        onClose={handleToastClose}
      />
    </Paper>
  );
};

export default TaskForm;
