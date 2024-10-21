import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        {user && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body1">
              Rol: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Typography>
            <Typography variant="body1">
              Nombre: {user.name ? user.name : 'No disponible'}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
