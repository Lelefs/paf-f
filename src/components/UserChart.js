import { Box, Text, theme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

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
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[500],
    },
    categories: [],
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

  useEffect(() => {
    const newOption = initialOptions;
    const newSeries = initialSeries;

    newOption.xaxis.categories = [
      '2021-06-08T00:00:00.000Z',
      '2021-06-09T00:00:00.000Z',
      '2021-06-10T00:00:00.000Z',
      '2021-06-11T00:00:00.000Z',
      '2021-06-12T00:00:00.000Z',
      '2021-06-13T00:00:00.000Z',
      '2021-06-14T00:00:00.000Z',
      '2021-06-15T00:00:00.000Z',
      '2021-06-16T00:00:00.000Z',
      '2021-06-17T00:00:00.000Z',
      '2021-06-18T00:00:00.000Z',
    ];

    newSeries[0].data = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    setSeries(newSeries);
    setOptions(newOption);
  }, []);

  return (
    <Box p="6" bg="gray.800" borderRadius={8} pb="2">
      <Text fontSize="lg" mb="4">
        {user.name}
      </Text>
      {options.xaxis.categories.length && (
        <Chart options={options} series={series} type="line" height={230} />
      )}
    </Box>
  );
}
