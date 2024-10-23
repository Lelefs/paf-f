import { Box, Text, Stack, Icon, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

import { useInfos } from '../hooks/infos';

import { Loader } from './Loader';

export function Current({ user }) {
  const { data, isLoading, isFetching } = useInfos(user._id);
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
      setCurrentInfo({
        date: data.infos[0].formattedDate,
        height: data.infos[0].height,
        weight: data.infos[0].weight.toFixed(2),
      });

      if (data.infos.length > 1) {
        setLastInfo({
          height: data.infos[1].height,
          weight: data.infos[1].weight,
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
        {!isLoading && isFetching && (
          <Spinner size="sm" color="gray.500" ml="4" />
        )}
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
                  <Text
                    className="text-center"
                    fontSize="sm"
                    as="i"
                    color="gray.400"
                  >
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
                  <Text
                    className="text-center"
                    fontSize="sm"
                    as="i"
                    color="gray.400"
                  >
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
          {currentInfo.height < 1 ? (
            <Text>
              <b>Altura:</b> {currentInfo.height * 100} cm
            </Text>
          ) : (
            <Text>
              <b>Altura:</b> {currentInfo.height} m
            </Text>
          )}
          {lastInfo.height !== '-' &&
            currentInfo.height - lastInfo.height !== 0 && (
              <>
                {lastInfo.height < currentInfo.height ? (
                  <Text
                    className="text-center"
                    fontSize="sm"
                    as="i"
                    color="gray.400"
                  >
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
                  <Text
                    className="text-center"
                    fontSize="sm"
                    as="i"
                    color="gray.400"
                  >
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
