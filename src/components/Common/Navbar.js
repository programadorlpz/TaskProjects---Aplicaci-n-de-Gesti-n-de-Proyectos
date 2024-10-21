import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../Layout/ThemeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';

const AuthButtons = ({ isAuthenticated, onLogout }) => {
  return isAuthenticated ? (
    <Button color="inherit" onClick={onLogout}>
      Cerrar Sesión
    </Button>
  ) : (
    <Button color="inherit" component={Link} to="/login">
      Iniciar Sesión
    </Button>
  );
};

AuthButtons.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const Navbar = ({ toggleTheme, currentTheme }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskProjects
        </Typography>

        <ThemeSwitcher toggleTheme={toggleTheme} currentTheme={currentTheme} />

        <AuthButtons isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.string.isRequired,
};

export default Navbar;
