import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';
import { toast } from 'react-toastify';
import axios from 'axios';

// Función para cargar los roles desde role.json
const loadRoles = async () => {
  try {
    const response = await axios.get('/assets/role.json');
    return response.data;
  } catch (error) {
    console.error('Error al cargar los roles desde role.json:', error);
    return [];
  }
};

// Acción de inicio de sesión basada solo en email
export const login = (email) => async (dispatch) => {
  try {
    // Cargamos los usuarios desde la API de jsonplaceholder
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    // Verificamos si el email existe en la lista de usuarios
    const user = users.find((user) => user.email === email);

    if (user) {
      // Cargamos los roles desde el archivo JSON
      const roles = await loadRoles();
      const userRole = roles.find((role) => role.id === user.id);

      if (userRole) {
        // Si el usuario es encontrado y tiene rol, despachamos la acción de LOGIN_SUCCESS
        const userData = {
          id: user.id, // Incluimos el ID del usuario
          email: user.email,
          role: userRole.role,
          name: user.name, // Incluimos el nombre del usuario
        };
        dispatch({ type: LOGIN_SUCCESS, payload: userData });
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Inicio de sesión exitoso');
      } else {
        throw new Error('No se ha encontrado un rol asignado para este usuario.');
      }
    } else {
      throw new Error('Email no encontrado. Verifica tu dirección de correo electrónico.');
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
    toast.error(error.message);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('user');
  toast.info('Sesión cerrada');
};
