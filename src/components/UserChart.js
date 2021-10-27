import { Box, Text, theme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { format, parseISO } from 'date-fns';

import { useInfos } from '../hooks/infos';

import sortArray from '../utils/sortArray';
import { Loader } from './Loader';

const initialOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'category',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[500],
    },
    categories: [],
    datetimeUTC: false,
  },
  yaxis: {
    tickAmount: 10,
  },
  tooltip: {
    theme: 'dark',
  },
};

const initialSeries = [{ name: 'Peso', data: [] }];

export function UserChart({ user }) {
  const [options, setOptions] = useState(initialOptions);
  const [series, setSeries] = useState(initialSeries);
  const { data, isLoading } = useInfos(user._id);

  useEffect(() => {
    const newSeries = initialSeries;
    const newOption = initialOptions;
    let newData = [];

    if (data && data.infos.length) {
      newData = sortArray(data.infos, 'createdAt', 'asc');

      newData.forEach(info => {
        const newDate = format(parseISO(info.date), 'dd/MM/yy');
        newSeries[0].data.push(info.weight);
        newOption.xaxis.categories.push(newDate);
      });

      setSeries(newSeries);
      setOptions(newOption);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box p="6" bg="gray.800" borderRadius={8} pb="2">
      <Text fontSize="lg" mb="4">
        {user.name} - Peso
      </Text>
      {data.infos.length ? (
        <Chart options={options} series={series} type="line" height={230} />
      ) : (
        <Text>Nenhuma informação encontrada</Text>
      )}
    </Box>
  );
}
