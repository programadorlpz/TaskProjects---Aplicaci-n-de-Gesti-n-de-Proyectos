import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImplementerOptionsModal from './ImplementerOptionsModal';

describe('ImplementerOptionsModal Component', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    onConfirmMock.mockClear();
  });

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

  test('renders ImplementerOptionsModal with complete options', () => {
    render(
      <ImplementerOptionsModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        actionType="complete"
      />
    );

    expect(screen.getByText(/Razones para Completar la Tarea/i)).toBeInTheDocument();
    completeOptions.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
  });

  test('renders ImplementerOptionsModal with pending options', () => {
    render(
      <ImplementerOptionsModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        actionType="pending"
      />
    );

    expect(screen.getByText(/Razones para Marcar como Pendiente/i)).toBeInTheDocument();
    pendingOptions.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
  });

  test('calls onConfirm with selected options', () => {
    render(
      <ImplementerOptionsModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        actionType="complete"
      />
    );

    const firstOption = screen.getByLabelText(completeOptions[0]);
    const secondOption = screen.getByLabelText(completeOptions[1]);

    fireEvent.click(firstOption);
    fireEvent.click(secondOption);

    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledWith([completeOptions[0], completeOptions[1]]);
  });

  test('calls onClose when Cancelar is clicked', () => {
    render(
      <ImplementerOptionsModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        actionType="complete"
      />
    );

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
