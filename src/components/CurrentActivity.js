import { Box, Text, Stack, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useActivities } from '../hooks/activities';

import { Loader } from './Loader';

export function CurrentActivity({ user }) {
  const { data, isLoading, isFetching } = useActivities(user._id);
  const [currentActivity, setCurrentActivity] = useState({
    date: '-',
    differenceDays: 0,
    time: '-',
  });

  useEffect(() => {
    if (data && data.activities.length) {
      setCurrentActivity({
        date: data.activities[0].formattedDate,
        differenceDays: data.activities[0].differenceDays,
        time: data.activities[0].time,
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box p="6" bg="gray.800" borderRadius={8} pb="2">
      <Text fontSize="lg" mb="4">
        {user.name} - Último cocô
        {!isLoading && isFetching && (
          <Spinner size="sm" color="gray.500" ml="4" />
        )}
      </Text>

      <Stack spacing={4}>
        <Text>
          <b>Última vez:</b> {currentActivity.date} às {currentActivity.time}
        </Text>

        <Text fontSize="sm" as="i" color="gray.400">
          Não faz cocô há {currentActivity.differenceDays} dia
          {currentActivity.differenceDays > 1 && 's'}
        </Text>
      </Stack>
    </Box>
  );
}
