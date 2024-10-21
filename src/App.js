import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import PrivateRoute from './components/Auth/PrivateRoute';
import TaskStatsModal from './components/Modals/TaskStatsModal';

function App() {
  // Inicializar el tema desde localStorage o usar 'light' por defecto
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Estado para manejar la visibilidad del modal de estadísticas de tareas
  const [taskStatsModalOpen, setTaskStatsModalOpen] = useState(false);

  // Crear el tema de MUI basado en el estado actual
  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });

  // Función para cambiar el tema y actualizar localStorage
  const toggleTheme = (themeMode) => {
    setCurrentTheme(themeMode);
    localStorage.setItem('theme', themeMode);
  };

  // Función para cerrar el modal de estadísticas de tareas
  const handleCloseTaskStats = () => {
    setTaskStatsModalOpen(false);
  };

  // Sincronizar el tema entre múltiples pestañas del navegador
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        setCurrentTheme(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar toggleTheme={toggleTheme} currentTheme={currentTheme} />
        <div style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/edit/:id"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
            {/* Agrega otras rutas según sea necesario */}
          </Routes>
        </div>
        <Footer />
        {/* Modal de Estadísticas de Tareas */}
        <TaskStatsModal open={taskStatsModalOpen} onClose={handleCloseTaskStats} />
      </div>
    </ThemeProvider>
  );
}

export default App;
