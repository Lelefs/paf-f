import { useQuery } from 'react-query';
import api from '../services/api';

export async function getInfos(userId) {
  let infos = [];

  const response = await api.get(`/infos/${userId}/all`);

  infos = response.data;

  return { infos };
}

export function useInfos(stringSearch) {
  return useQuery(['infos', stringSearch], () => getInfos(stringSearch));
}
