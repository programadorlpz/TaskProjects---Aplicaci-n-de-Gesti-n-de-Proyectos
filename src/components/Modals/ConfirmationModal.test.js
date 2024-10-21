import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal Component', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
    onConfirmMock.mockClear();
  });

  test('renders ConfirmationModal when open', () => {
    render(
      <ConfirmationModal open={true} onClose={onCloseMock} onConfirm={onConfirmMock} />
    );

    expect(screen.getByText(/Advertencia/i)).toBeInTheDocument();
    expect(screen.getByText(/Recuerde que antes de eliminar una tarea debe estar autorizado por un funcionario de "Rol: Jefe"./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument();
  });

  test('does not render ConfirmationModal when closed', () => {
    render(
      <ConfirmationModal open={false} onClose={onCloseMock} onConfirm={onConfirmMock} />
    );

    expect(screen.queryByText(/Advertencia/i)).not.toBeInTheDocument();
  });

  test('calls onClose when Cancelar is clicked', () => {
    render(
      <ConfirmationModal open={true} onClose={onCloseMock} onConfirm={onConfirmMock} />
    );

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when Eliminar is clicked', () => {
    render(
      <ConfirmationModal open={true} onClose={onCloseMock} onConfirm={onConfirmMock} />
    );

    const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
