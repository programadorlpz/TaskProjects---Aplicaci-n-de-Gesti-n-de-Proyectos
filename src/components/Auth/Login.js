import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/api/useLogin';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { performLogin } = useLogin();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Este efecto maneja la redirección cuando el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await performLogin(email);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Por favor, ingresa tu correo electrónico');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: '150px', maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Iniciar Sesión
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
