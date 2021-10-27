import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';

import api from '../services/api';

export async function getInfos(userId) {
  let infos = [];

  const response = await api.get(`/infos/${userId}/all`);

  response.data.forEach(info => {
    info.formattedDate = format(parseISO(info.date), 'dd/MM/yyyy');
  });

  infos = response.data;

  return { infos };
}

export function useInfos(stringSearch) {
  return useQuery(['infos', stringSearch], () => getInfos(stringSearch), {
    staleTime: 1800000, // 30 minutos
  });
}
