import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Importación nombrada
import rootReducer from './reducers';

// Función para cargar el estado persistido desde localStorage
const loadState = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return undefined; // No hay estado previo
    }
    const user = JSON.parse(serializedUser);
    return {
      auth: {
        isAuthenticated: true,
        user: user,
      },
    };
  } catch (err) {
    console.error('Error al cargar el estado desde localStorage:', err);
    return undefined;
  }
};

const preloadedState = loadState();

const store = createStore(
  rootReducer,
  preloadedState, // Estado inicial cargado
  applyMiddleware(thunk)
);

export default store;
