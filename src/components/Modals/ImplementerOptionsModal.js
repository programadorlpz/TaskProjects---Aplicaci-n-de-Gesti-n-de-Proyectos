import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControlLabel, Checkbox, Typography } from '@mui/material';

const ImplementerOptionsModal = ({ open, onClose, onConfirm, actionType }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Razones para cuando se marca como Completa o Pendiente
  const completeOptions = [
    "La tarea cumple con los objetivos establecidos.",
    "No se detectaron problemas durante la revisión.",
    "Se ha entregado toda la documentación necesaria.",
    "La tarea fue aprobada por los responsables del proyecto.",
    "El trabajo se finalizó dentro del plazo estipulado."
  ];

  const pendingOptions = [
    "Faltan especificaciones claras para finalizar.",
    "Se detectaron errores que requieren corrección.",
    "Falta documentación por completar.",
    "El equipo aún no ha revisado el trabajo.",
    "La tarea no se completó dentro del plazo estipulado."
  ];

  // Definir las opciones según el tipo de acción (completar o pendiente)
  const options = actionType === 'complete' ? completeOptions : pendingOptions;

  // Manejar la selección de opciones
  const handleToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Confirmar las selecciones
  const handleConfirm = () => {
    onConfirm(selectedOptions);  // Confirmar las opciones seleccionadas
    setSelectedOptions([]);  // Limpiar las opciones seleccionadas
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="implementer-dialog-title">
      <DialogTitle id="implementer-dialog-title">
        {actionType === 'complete' ? 'Razones para Completar la Tarea' : 'Razones para Marcar como Pendiente'}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Seleccione una o más razones por las cuales la tarea será {actionType === 'complete' ? 'completada' : 'marcada como pendiente'}:
        </Typography>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selectedOptions.includes(option)}
                onChange={() => handleToggle(option)}
              />
            }
            label={option}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleConfirm} color="primary">Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImplementerOptionsModal;
