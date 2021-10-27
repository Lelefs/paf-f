import { useQuery } from 'react-query';
import api from '../services/api';

export async function getUsers(stringSearch) {
  let users = [];

  if (stringSearch === '' || !stringSearch) {
    const response = await api.get('/users/all');

    users = response.data;
  } else {
    const response = await api.get('/users', {
      params: {
        string: stringSearch,
      },
    });

    users = response.data;
  }

  const totalCount = users.length;

  return { users, totalCount };
}

export function useUsers(stringSearch) {
  return useQuery(['users', stringSearch], () => getUsers(stringSearch));
}
