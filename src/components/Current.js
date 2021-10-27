import { Box, Text, Stack, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

import { useInfos } from '../hooks/infos';

import { Loader } from './Loader';
import sortArray from '../utils/sortArray';

export function Current({ user }) {
  const { data, isLoading } = useInfos(user._id);
  const [currentInfo, setCurrentInfo] = useState({
    date: '-',
    height: '-',
    weight: '-',
  });
  const [lastInfo, setLastInfo] = useState({
    height: '-',
    weight: '-',
  });

  useEffect(() => {
    if (data && data.infos.length) {
      const newArray = sortArray(data.infos, 'date', 'asc');
      setCurrentInfo({
        date: format(parseISO(newArray[0].date), 'dd/MM/yyyy'),
        height: newArray[0].height,
        weight: newArray[0].weight,
      });

      if (newArray.length > 1) {
        setLastInfo({
          height: newArray[1].height,
          weight: newArray[1].weight,
        });
      }
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box p="6" bg="gray.800" borderRadius={8} pb="2">
      <Text fontSize="lg" mb="4">
        {user.name}
      </Text>
      <Stack spacing={4}>
        <Text>
          <b>Data:</b> {currentInfo.date}
        </Text>
        <Stack>
          <Text>
            <b>Peso:</b> {currentInfo.weight} kg
          </Text>
          {lastInfo.weight !== '-' &&
            currentInfo.weight - lastInfo.weight !== 0 && (
              <>
                {lastInfo.weight < currentInfo.weight ? (
                  <Text fontSize="sm" as="i" color="gray.400">
                    <Icon
                      as={IoMdArrowDropup}
                      fontSize="20"
                      color="green.600"
                      mr="1"
                    />
                    Ganhou{' '}
                    {parseFloat(currentInfo.weight - lastInfo.weight).toFixed(
                      2,
                    )}{' '}
                    kg
                  </Text>
                ) : (
                  <Text fontSize="sm" as="i" color="gray.400">
                    <Icon
                      as={IoMdArrowDropdown}
                      fontSize="20"
                      color="red.600"
                      mr="1"
                    />
                    Perdeu{' '}
                    {parseFloat(lastInfo.weight - currentInfo.weight).toFixed(
                      2,
                    )}{' '}
                    kg
                  </Text>
                )}
              </>
            )}
        </Stack>
        <Stack>
          <Text>
            <b>Altura:</b> {currentInfo.height} m
          </Text>
          {lastInfo.height !== '-' &&
            currentInfo.height - lastInfo.height !== 0 && (
              <>
                {lastInfo.height < currentInfo.height ? (
                  <Text fontSize="sm" as="i" color="gray.400">
                    <Icon
                      as={IoMdArrowDropup}
                      fontSize="20"
                      color="green.600"
                      mr="1"
                    />
                    Ganhou{' '}
                    {parseFloat(currentInfo.height - lastInfo.height).toFixed(
                      2,
                    )}{' '}
                    cm
                  </Text>
                ) : (
                  <Text fontSize="sm" as="i" color="gray.400">
                    <Icon
                      as={IoMdArrowDropdown}
                      fontSize="20"
                      color="red.600"
                      mr="1"
                    />
                    Perdeu{' '}
                    {parseFloat(lastInfo.height - currentInfo.height).toFixed(
                      2,
                    )}{' '}
                    cm
                  </Text>
                )}
              </>
            )}
        </Stack>
      </Stack>
    </Box>
  );
}
