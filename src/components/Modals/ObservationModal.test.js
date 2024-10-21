import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ObservationModal from './ObservationModal';

describe('ObservationModal Component', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    onConfirmMock.mockClear();
  });

  const observations = [
    "La tarea no cumple con todos los requisitos especificados.",
    "Se detectaron errores en el resultado final.",
    "Falta documentación adicional para completar la tarea.",
    "Los plazos acordados no se han cumplido adecuadamente.",
    "Se requiere una revisión más exhaustiva del trabajo realizado."
  ];

  test('renders ObservationModal when open', () => {
    render(
      <ObservationModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );

    expect(screen.getByText(/Observaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Seleccione una o más razones por las cuales la tarea será marcada como "Pendiente":/i)).toBeInTheDocument();

    observations.forEach(obs => {
      expect(screen.getByLabelText(obs)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar/i })).toBeInTheDocument();
  });

  test('calls onConfirm with selected observations', () => {
    render(
      <ObservationModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );

    const firstObservation = screen.getByLabelText(observations[0]);
    const thirdObservation = screen.getByLabelText(observations[2]);

    fireEvent.click(firstObservation);
    fireEvent.click(thirdObservation);

    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledWith([observations[0], observations[2]]);
  });

  test('calls onClose when Cancelar is clicked', () => {
    render(
      <ObservationModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
