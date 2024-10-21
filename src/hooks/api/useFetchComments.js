import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchComments = (limit = 20) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?_limit=${limit}`);
        setComments(response.data);
      } catch (error) {
        setErrorComments(error);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [limit]);

  return { comments, loadingComments, errorComments };
};

export default useFetchComments;
