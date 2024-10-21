import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        setErrorUsers(error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loadingUsers, errorUsers };
};

export default useFetchUsers;
