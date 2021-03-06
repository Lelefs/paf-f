import { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';

const UsersContext = createContext({
  isLoading: false,
  users: [],
});

export const UsersProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const localUsers = localStorage.getItem('@paf:users');

    if (!localUsers) {
      api.get('/users/all').then(res => {
        localStorage.setItem('@paf:users', JSON.stringify(res.data));
        setUsers(res.data);
        setIsLoading(false);
      });
    } else {
      setUsers(JSON.parse(localUsers));
      setIsLoading(false);
    }
  }, []);

  return (
    <UsersContext.Provider value={{ isLoading, users }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
