import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';

const useLogin = () => {
  const dispatch = useDispatch();

  const performLogin = async (email) => {
    try {
      await dispatch(login(email));
      // El manejo de errores se realiza dentro de la acción
    } catch (error) {
      // Puedes manejar errores adicionales aquí si es necesario
      console.error('Error en useLogin:', error);
    }
  };

  return { performLogin };
};

export default useLogin;
