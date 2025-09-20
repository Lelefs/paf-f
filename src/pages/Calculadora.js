import {
  Flex,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  NumberInput,
  NumberInputField,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';

export default function Calculadora() {
  const [itens, setItens] = useState(() => {
    return JSON.parse(localStorage.getItem('@paf:itens')) || [];
  });

  const initialValues = {
    nome: '',
    peso: 0,
    valor: 0,
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialValues,
  });

  function handleCreate(values) {
    const valorPorKg = formatMoney((values.valor * 1000) / values.peso);
    const currentItens = JSON.parse(localStorage.getItem('@paf:itens')) || [];
    const valorFormatado = formatMoney(values.valor);
    const newItens = [
      { ...values, valorPorKg, valor: valorFormatado },
      ...currentItens,
    ];

    localStorage.setItem('@paf:itens', JSON.stringify(newItens));
    setItens(newItens);
    setValue('nome', '');
    setValue('peso', 0);
    setValue('valor', 0);
  }

  function formatMoney(value) {
    console.log('111111111');
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex direction="column">
          <Box as="form" onSubmit={handleSubmit(handleCreate)}>
            <VStack spacing="6">
              <FormControl id="nome">
                <FormLabel>Nome do produto</FormLabel>
                <Input
                  placeholder="Informe o nome"
                  {...register('nome')}
                  name="nome"
                />
              </FormControl>

              <Flex style={{ gap: '16px', width: '100%' }}>
                <FormControl id="peso" mr={2}>
                  <FormLabel>Peso</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      placeholder="Informe o peso"
                      {...register('peso', { valueAsNumber: true })}
                      name="peso"
                    />
                  </NumberInput>
                </FormControl>

                <FormControl id="valor" ml={2}>
                  <FormLabel>Valor</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      placeholder="Informe o valor"
                      {...register('valor', { valueAsNumber: true })}
                      name="valor"
                    />
                  </NumberInput>
                </FormControl>
              </Flex>
            </VStack>

            <Button
              bg="green.600"
              _hover={{ bg: 'green.500' }}
              type="submit"
              mt="4"
            >
              Calcular e salvar
            </Button>
          </Box>

          <Table variant="simple" w="fit-content" mt="4">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Peso</Th>
                <Th>Valor</Th>
                <Th>Valor por Kg</Th>
              </Tr>
            </Thead>

            <Tbody>
              {itens?.map((item, index) => (
                <Tr className="font-small-mobile" key={`0${index}-itens`}>
                  <Td>{item.nome}</Td>

                  <Td>{item.peso}</Td>

                  <Td>{item.valor}</Td>

                  <Td>{item.valorPorKg}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
}
