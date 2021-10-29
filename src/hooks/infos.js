import { useQuery } from 'react-query';

import api from '../services/api';

export async function getInfos(userId) {
  let infos = [];

  const response = await api.get(`/infos/${userId}/all`);

  response.data.forEach(info => {
    const date = info.date.split('T')[0];
    info.formattedDate = date.split('-').reverse().join('/');
  });

  infos = response.data;

  return { infos };
}

export function useInfos(stringSearch) {
  return useQuery(['infos', stringSearch], () => getInfos(stringSearch), {
    staleTime: 1800000, // 30 minutos
  });
}
