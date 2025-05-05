import { useQuery } from 'react-query';

import { differenceInDays } from 'date-fns';
import api from '../services/api';

export async function getActivities(userId) {
  let activities = [];

  const response = await api.get(`/activities/${userId}/all`);

  response.data.forEach(activity => {
    const date = new Date(activity.date).toLocaleTimeString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    const differenceDays = differenceInDays(
      new Date(),
      new Date(activity.date),
    );
    activity.formattedDate = date.split(', ')[0];
    activity.differenceDays = differenceDays;
    activity.time = date.split(', ')[1];
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
