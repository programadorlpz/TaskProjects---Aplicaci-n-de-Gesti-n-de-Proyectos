import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';

describe('ThemeSwitcher Component', () => {
  const toggleThemeMock = jest.fn();

  test('renders ThemeSwitcher with Brightness7 and Brightness4 icons', () => {
    render(<ThemeSwitcher toggleTheme={toggleThemeMock} currentTheme="light" />);

    // Usar getByRole para buscar los botones
    expect(screen.getByRole('button', { name: /Activar Modo Claro/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Activar Modo Oscuro/i })).toBeInTheDocument();
  });

  test('calls toggleTheme with "dark" when Dark mode button is clicked', () => {
    render(<ThemeSwitcher toggleTheme={toggleThemeMock} currentTheme="light" />);

    const darkModeButton = screen.getByRole('button', { name: /Activar Modo Oscuro/i });
    fireEvent.click(darkModeButton);

    expect(toggleThemeMock).toHaveBeenCalledWith('dark');
  });

  test('calls toggleTheme with "light" when Light mode button is clicked', () => {
    render(<ThemeSwitcher toggleTheme={toggleThemeMock} currentTheme="dark" />);

    const lightModeButton = screen.getByRole('button', { name: /Activar Modo Claro/i });
    fireEvent.click(lightModeButton);

    expect(toggleThemeMock).toHaveBeenCalledWith('light');
  });

  test('disables the current theme button', () => {
    render(<ThemeSwitcher toggleTheme={toggleThemeMock} currentTheme="light" />);

    const lightModeButton = screen.getByRole('button', { name: /Activar Modo Claro/i });
    const darkModeButton = screen.getByRole('button', { name: /Activar Modo Oscuro/i });

    expect(lightModeButton).toBeDisabled();
    expect(darkModeButton).not.toBeDisabled();
  });
});
