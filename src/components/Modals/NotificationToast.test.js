import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationToast from './NotificationToast';
import { ToastContainer } from 'react-toastify';

describe('NotificationToast Component', () => {
  const onCloseMock = jest.fn();

  test('renders and displays the message', () => {
    render(
      <>
        <NotificationToast
          message="Operación exitosa"
          type="success"
          open={true}
          onClose={onCloseMock}
        />
        <ToastContainer />
      </>
    );

    expect(screen.getByText(/Operación exitosa/i)).toBeInTheDocument();
  });

  test('renders with correct severity type', () => {
    const { rerender } = render(
      <>
        <NotificationToast
          message="Operación exitosa"
          type="success"
          open={true}
          onClose={onCloseMock}
        />
        <ToastContainer />
      </>
    );

    const alertSuccess = screen.getByRole('alert');
    expect(alertSuccess).toHaveClass('MuiAlert-standardSuccess');

    rerender(
      <>
        <NotificationToast
          message="Error al realizar la operación"
          type="error"
          open={true}
          onClose={onCloseMock}
        />
        <ToastContainer />
      </>
    );

    const alertError = screen.getByRole('alert');
    expect(alertError).toHaveClass('MuiAlert-standardError');
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <>
        <NotificationToast
          message="Operación exitosa"
          type="success"
          open={true}
          onClose={onCloseMock}
        />
        <ToastContainer />
      </>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render when open is false', () => {
    render(
      <>
        <NotificationToast
          message="Operación exitosa"
          type="success"
          open={false}
          onClose={onCloseMock}
        />
        <ToastContainer />
      </>
    );

    expect(screen.queryByText(/Operación exitosa/i)).not.toBeInTheDocument();
  });
});
