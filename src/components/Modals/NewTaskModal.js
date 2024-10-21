import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import useFetchUsers from '../../hooks/api/useFetchUsers';
import useFetchRoles from '../../hooks/api/useFetchRoles';

const NewTaskModal = ({ open, onClose, onCreate }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    userId: '',
  });

  // Usar los hooks personalizados
  const { users: implementers, loadingUsers, errorUsers } = useFetchUsers();
  const { roles, loadingRoles, errorRoles } = useFetchRoles();

  // Filtrar implementadores basados en roles
  const implementerRoles = roles.filter((role) => role.role === 'implementador');
  const implementerUsers = implementers.filter((user) =>
    implementerRoles.some((role) => role.id === user.id)
  );

  // Manejar el cambio de valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (!taskData.title.trim()) {
      alert('El título es obligatorio.');
      return;
    }

    if (!taskData.userId) {
      alert('Por favor, selecciona un implementador.');
      return;
    }

    onCreate(taskData);
    setTaskData({ title: '', description: '', userId: '' });
    onClose(); // Cerramos el modal
  };

  if (loadingUsers || loadingRoles) {
    return <div>Cargando...</div>;
  }

  if (errorUsers || errorRoles) {
    return <div>Error al cargar datos.</div>;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Nueva Tarea</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="implementer-select-label">Asignado a</InputLabel>
          <Select
            labelId="implementer-select-label"
            name="userId"
            value={taskData.userId}
            onChange={handleChange}
            label="Asignado a"
          >
            {implementerUsers.map((imp) => (
              <MenuItem key={imp.id} value={imp.id}>
                {imp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskModal;
