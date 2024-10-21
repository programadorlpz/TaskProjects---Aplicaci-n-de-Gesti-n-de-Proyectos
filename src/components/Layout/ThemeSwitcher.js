import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeSwitcher = ({ toggleTheme, currentTheme }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Activar Modo Claro" arrow>
        <span>
          <IconButton
            aria-label="Activar Modo Claro"
            color={currentTheme === 'light' ? 'primary' : 'default'}
            onClick={() => toggleTheme('light')}
            disabled={currentTheme === 'light'}
          >
            <Brightness7 />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Activar Modo Oscuro" arrow>
        <span>
          <IconButton
            aria-label="Activar Modo Oscuro"
            color={currentTheme === 'dark' ? 'primary' : 'default'}
            onClick={() => toggleTheme('dark')}
            disabled={currentTheme === 'dark'}
          >
            <Brightness4 />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default ThemeSwitcher;
