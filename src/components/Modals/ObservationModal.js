import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControlLabel, Checkbox, Typography } from '@mui/material';

const ObservationModal = ({ open, onClose, onConfirm }) => {
  // Estado local para almacenar las observaciones seleccionadas
  const [selectedObservations, setSelectedObservations] = useState([]);

  // Lista de observaciones posibles
  const observations = [
    "La tarea no cumple con todos los requisitos especificados.",
    "Se detectaron errores en el resultado final.",
    "Falta documentación adicional para completar la tarea.",
    "Los plazos acordados no se han cumplido adecuadamente.",
    "Se requiere una revisión más exhaustiva del trabajo realizado."
  ];

  // Manejar la selección de observaciones
  const handleToggle = (observation) => {
    if (selectedObservations.includes(observation)) {
      setSelectedObservations(selectedObservations.filter((obs) => obs !== observation));
    } else {
      setSelectedObservations([...selectedObservations, observation]);
    }
  };

  // Confirmar y pasar las observaciones seleccionadas
  const handleConfirm = () => {
    onConfirm(selectedObservations);  // Pasar las observaciones al componente padre
    setSelectedObservations([]);  // Limpiar las observaciones seleccionadas
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="observations-dialog-title">
      <DialogTitle id="observations-dialog-title">Observaciones</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Seleccione una o más razones por las cuales la tarea será marcada como "Pendiente":
        </Typography>
        {observations.map((observation) => (
          <FormControlLabel
            key={observation}
            control={
              <Checkbox
                checked={selectedObservations.includes(observation)}
                onChange={() => handleToggle(observation)}
              />
            }
            label={observation}
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

export default ObservationModal;
