import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [errorRoles, setErrorRoles] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://programadorlpz.github.io/Aplicaci-n-de-Gesti-n-de-Proyectos/assets/role.json');
        setRoles(response.data);
      } catch (error) {
        setErrorRoles(error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loadingRoles, errorRoles };
};

export default useFetchRoles;
