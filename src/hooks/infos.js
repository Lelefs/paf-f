import { useQuery } from 'react-query';

import api from '../services/api';

export async function getInfos(userId) {
  let infos = [];

  const response = await api.get(`/infos/${userId}/all`);

  response.data.forEach(info => {
    const date = new Date(info.date).toLocaleTimeString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    info.formattedDate = date.split(', ')[0];
  });

  infos = response.data;

  return { infos };
}

export function useInfos(stringSearch) {
  return useQuery(['infos', stringSearch], () => getInfos(stringSearch), {
    staleTime: 1800000, // 30 minutos
  });
}
