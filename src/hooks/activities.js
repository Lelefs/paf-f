import { useQuery } from 'react-query';

import { differenceInDays } from 'date-fns';
import api from '../services/api';

export async function getActivities(userId) {
  let activities = [];

  const response = await api.get(`/activities/${userId}/all`);

  response.data.forEach(activity => {
    const date = activity.date.split('T')[0];
    const differenceDays = differenceInDays(
      new Date(),
      new Date(activity.date),
    );
    activity.formattedDate = date.split('-').reverse().join('/');
    activity.differenceDays = differenceDays;
    activity.time = new Date(activity.date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  activities = response.data;

  return { activities };
}

export function useActivities(stringSearch) {
  return useQuery(
    ['activities', stringSearch],
    () => getActivities(stringSearch),
    {
      staleTime: 1800000, // 30 minutos
    },
  );
}
