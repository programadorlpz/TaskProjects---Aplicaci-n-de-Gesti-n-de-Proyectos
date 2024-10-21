import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  useEffect(() => {
    const rootElement = document.getElementById('root'); // El contenedor principal de tu aplicación

    if (rootElement) {
      if (open) {
        // Añadir el atributo 'inert' para deshabilitar la interacción con el contenido principal
        rootElement.setAttribute('inert', 'true');
      } else {
        // Eliminar el atributo 'inert' cuando el modal se cierre
        rootElement.removeAttribute('inert');
      }
    }

    return () => {
      if (rootElement) {
        rootElement.removeAttribute('inert'); // Asegurarse de que el atributo se elimine al desmontar
      }
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEnforceFocus
    >
      <DialogTitle id="alert-dialog-title">
        {"Advertencia"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Recuerde que antes de eliminar una tarea debe estar autorizado por un funcionario de "Rol: Jefe".
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          color="primary" 
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
