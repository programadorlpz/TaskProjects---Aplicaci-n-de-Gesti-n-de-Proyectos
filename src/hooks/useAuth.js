import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/authActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const performLogin = (credentials) => {
    dispatch(login(credentials));
  };

  const performLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    performLogin,
    performLogout,
  };
};

export default useAuth;
